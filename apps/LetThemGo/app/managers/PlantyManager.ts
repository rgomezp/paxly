import { ganon } from "@/services/ganon/ganon"
import { getLocalDateKey } from "@/utils/date"

export default class PlantyManager {
	private static readonly LAST_WATERED_KEY = "planty.lastWateredDateKey"
	private static readonly LAST_DRINK_PLAY_KEY = "planty.lastDrinkPlayedDateKey"

	static hasWateredToday(): boolean {
		const today = getLocalDateKey()
		const last = ganon.get(PlantyManager.LAST_WATERED_KEY) as string | undefined
		return last === today
	}

	static markWateredToday(): void {
		const today = getLocalDateKey()
		ganon.set(PlantyManager.LAST_WATERED_KEY, today)
	}

	static hasPlayedDrinkAnimationToday(): boolean {
		const today = getLocalDateKey()
		const last = ganon.get(PlantyManager.LAST_DRINK_PLAY_KEY) as string | undefined
		return last === today
	}

	static markDrinkAnimationPlayedToday(): void {
		const today = getLocalDateKey()
		ganon.set(PlantyManager.LAST_DRINK_PLAY_KEY, today)
	}
}
