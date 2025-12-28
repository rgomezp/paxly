import { ensureFirebaseInitialized } from '../firestore';
import { ICompletion } from '../../shared/types/ICompletion';

interface LessonRatingStats {
  lessonId: string;
  unhelpfulCount: number;
  totalRatings: number;
  helpfulCount: number;
  unhelpfulPercentage: number;
}

export async function compileLessonRatings() {
  try {
    const db = ensureFirebaseInitialized();

    console.log('Fetching lesson completions from Firestore...');

    // Get all lesson completions
    const completionsSnapshot = await db.collection('lesson_completions').get();

    console.log(`Found ${completionsSnapshot.size} total completions`);

    // Process completions to count ratings by lesson
    const lessonStats = new Map<string, { unhelpful: number; helpful: number; total: number }>();

    completionsSnapshot.forEach((doc) => {
      const completion = doc.data() as ICompletion;

      // Only count entries that have a rating (helpful is not undefined/null)
      if (completion.helpful !== undefined && completion.helpful !== null) {
        if (!lessonStats.has(completion.lessonId)) {
          lessonStats.set(completion.lessonId, { unhelpful: 0, helpful: 0, total: 0 });
        }

        const stats = lessonStats.get(completion.lessonId)!;
        stats.total++;

        if (completion.helpful === false) {
          stats.unhelpful++;
        } else if (completion.helpful === true) {
          stats.helpful++;
        }
      }
    });

    // Convert to array and calculate percentages
    const results: LessonRatingStats[] = Array.from(lessonStats.entries())
      .map(([lessonId, stats]) => ({
        lessonId,
        unhelpfulCount: stats.unhelpful,
        totalRatings: stats.total,
        helpfulCount: stats.helpful,
        unhelpfulPercentage: stats.total > 0 ? (stats.unhelpful / stats.total) * 100 : 0,
      }))
      // Sort by unhelpful count (descending), then by unhelpful percentage
      .sort((a, b) => {
        if (b.unhelpfulCount !== a.unhelpfulCount) {
          return b.unhelpfulCount - a.unhelpfulCount;
        }
        return b.unhelpfulPercentage - a.unhelpfulPercentage;
      });

    console.log('\n=== Lessons with Most Unhelpful Ratings ===\n');
    console.log('Sorted by number of unhelpful ratings (then by percentage):\n');

    if (results.length === 0) {
      console.log('No lessons with ratings found.');
      return;
    }

    // Display top results
    const topResults = results.slice(0, 20);

    console.log('Lesson ID'.padEnd(30), 'Unhelpful'.padEnd(12), 'Helpful'.padEnd(12), 'Total'.padEnd(10), 'Unhelpful %');
    console.log('-'.repeat(80));

    topResults.forEach((result) => {
      console.log(
        result.lessonId.padEnd(30),
        result.unhelpfulCount.toString().padEnd(12),
        result.helpfulCount.toString().padEnd(12),
        result.totalRatings.toString().padEnd(10),
        result.unhelpfulPercentage.toFixed(1) + '%'
      );
    });

    if (results.length > 20) {
      console.log(`\n... and ${results.length - 20} more lessons with ratings`);
    }

    // Summary statistics
    const totalUnhelpful = results.reduce((sum, r) => sum + r.unhelpfulCount, 0);
    const totalHelpful = results.reduce((sum, r) => sum + r.helpfulCount, 0);
    const totalRatings = totalUnhelpful + totalHelpful;

    console.log('\n=== Summary ===');
    console.log(`Total lessons with ratings: ${results.length}`);
    console.log(`Total unhelpful ratings: ${totalUnhelpful}`);
    console.log(`Total helpful ratings: ${totalHelpful}`);
    console.log(`Total ratings: ${totalRatings}`);
    if (totalRatings > 0) {
      console.log(`Overall unhelpful percentage: ${((totalUnhelpful / totalRatings) * 100).toFixed(1)}%`);
    }

  } catch (error) {
    console.error('Failed to compile lesson ratings:', error);
    throw error;
  }
}

compileLessonRatings();
