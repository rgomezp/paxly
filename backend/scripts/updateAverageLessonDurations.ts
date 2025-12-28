import { ensureFirebaseInitialized } from '../firestore';
import { ICompletion } from '../../shared/types/ICompletion';

interface LessonDurationStats {
  lessonId: string;
  averageDurationSec: number;
  validCompletions: number;
  totalCompletions: number;
  discardedCompletions: number;
}

export async function updateAverageLessonDurations() {
  try {
    const db = ensureFirebaseInitialized();

    console.log('Fetching lesson completions from Firestore...');

    // Get all lesson completions
    const completionsSnapshot = await db.collection('lesson_completions').get();

    console.log(`Found ${completionsSnapshot.size} total completions`);

    // Process completions to calculate average durations by lesson
    const lessonStats = new Map<string, { durations: number[]; total: number }>();

    completionsSnapshot.forEach((doc) => {
      const completion = doc.data() as ICompletion;

      if (!lessonStats.has(completion.lessonId)) {
        lessonStats.set(completion.lessonId, { durations: [], total: 0 });
      }

      const stats = lessonStats.get(completion.lessonId)!;
      stats.total++;

      // Only include durations >= 10 seconds
      if (completion.durationSec !== undefined && completion.durationSec !== null) {
        if (completion.durationSec >= 10) {
          stats.durations.push(completion.durationSec);
        }
      }
    });

    // Convert to array and calculate averages
    const results: LessonDurationStats[] = Array.from(lessonStats.entries())
      .map(([lessonId, stats]) => {
        const validCompletions = stats.durations.length;
        const discardedCompletions = stats.total - validCompletions;
        const averageDurationSec =
          validCompletions > 0
            ? Math.round(stats.durations.reduce((sum, d) => sum + d, 0) / validCompletions)
            : 0;

        return {
          lessonId,
          averageDurationSec,
          validCompletions,
          totalCompletions: stats.total,
          discardedCompletions,
        };
      })
      // Sort by lesson ID for consistent output
      .sort((a, b) => a.lessonId.localeCompare(b.lessonId));

    // Filter out lessons with no valid completions
    const lessonsWithValidData = results.filter((r) => r.validCompletions > 0);

    console.log('\n=== Average Lesson Durations ===\n');
    console.log(`Found ${lessonsWithValidData.length} lessons with valid duration data (>= 10 seconds)`);
    console.log(`Total lessons processed: ${results.length}\n`);

    if (lessonsWithValidData.length === 0) {
      console.log('No lessons with valid duration data found.');
      return;
    }

    // Display results
    console.log(
      'Lesson ID'.padEnd(30),
      'Avg Duration (sec)'.padEnd(18),
      'Valid'.padEnd(8),
      'Discarded'.padEnd(10),
      'Total'
    );
    console.log('-'.repeat(80));

    lessonsWithValidData.forEach((result) => {
      console.log(
        result.lessonId.padEnd(30),
        result.averageDurationSec.toString().padEnd(18),
        result.validCompletions.toString().padEnd(8),
        result.discardedCompletions.toString().padEnd(10),
        result.totalCompletions.toString()
      );
    });

    // Summary statistics
    const totalValidCompletions = lessonsWithValidData.reduce((sum, r) => sum + r.validCompletions, 0);
    const totalDiscardedCompletions = lessonsWithValidData.reduce((sum, r) => sum + r.discardedCompletions, 0);
    const totalCompletions = lessonsWithValidData.reduce((sum, r) => sum + r.totalCompletions, 0);

    console.log('\n=== Summary ===');
    console.log(`Total lessons with valid data: ${lessonsWithValidData.length}`);
    console.log(`Total valid completions: ${totalValidCompletions}`);
    console.log(`Total discarded completions (< 10 seconds): ${totalDiscardedCompletions}`);
    console.log(`Total completions processed: ${totalCompletions}`);

    // Filter lessons with at least 10 valid completions for writing
    const MIN_VALID_COMPLETIONS = 10;
    const lessonsToWrite = lessonsWithValidData.filter((r) => r.validCompletions >= MIN_VALID_COMPLETIONS);

    console.log(`\n=== Lessons Eligible for Writing (>= ${MIN_VALID_COMPLETIONS} valid completions) ===`);
    console.log(`Found ${lessonsToWrite.length} lessons with at least ${MIN_VALID_COMPLETIONS} valid completions`);

    if (lessonsToWrite.length > 0) {
      console.log('\nLesson ID'.padEnd(30), 'Avg Duration (sec)'.padEnd(18), 'Valid Completions');
      console.log('-'.repeat(60));
      lessonsToWrite.forEach((result) => {
        console.log(
          result.lessonId.padEnd(30),
          result.averageDurationSec.toString().padEnd(18),
          result.validCompletions.toString()
        );
      });
    }

    // Write operation - only writes lessons with >= 20 valid completions
    if (lessonsToWrite.length > 0) {
      console.log('\n=== Writing to Firestore ===');
      console.log(`Writing average durations for ${lessonsToWrite.length} lessons with >= ${MIN_VALID_COMPLETIONS} valid completions...`);

      const batch = db.batch();
      let writeCount = 0;

      for (const result of lessonsToWrite) {
        const docRef = db.collection('average_lesson_durations').doc(result.lessonId);
        batch.set(docRef, {
          lessonId: result.lessonId,
          averageDurationSec: result.averageDurationSec,
          validCompletions: result.validCompletions,
          lastUpdated: Date.now(),
        });
        writeCount++;
      }

      await batch.commit();
      console.log(`Successfully updated ${writeCount} lesson duration documents in Firestore.`);
    } else {
      console.log('\n=== Write Operation Skipped ===');
      console.log(`No lessons meet the minimum threshold of ${MIN_VALID_COMPLETIONS} valid completions.`);
    }

  } catch (error) {
    console.error('Failed to update average lesson durations:', error);
    throw error;
  }
}

updateAverageLessonDurations();

