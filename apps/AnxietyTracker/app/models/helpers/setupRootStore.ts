/**
 * This file is where we do "rehydration" of your RootStore from AsyncStorage.
 * This lets you persist your state between app launches.
 *
 * Navigation state persistence is handled in navigationUtilities.tsx.
 *
 * Note that Fast Refresh doesn't play well with this file, so if you edit this,
 * do a full refresh of your app instead.
 *
 * IMPORTANT – rootState vs cloud sync:
 * - rootState is NOT in cloudConfig (see services/ganon/cloudConfig.ts), so it
 *   is only stored locally and is never overwritten by ganon restore/hydrate.
 *   (Ganon source: restore/hydrate use _getAllConfiguredKeys() and only
 *   storage.set() those keys – see SyncController in the ganon repo.)
 * - When ganon rehydrates cloud-backed keys (on login/restore or background
 *   sync), only those keys are updated in storage; rootState is left as-is.
 * - After restore we call reloadAllStores() so the in-memory rootStore is
 *   refreshed from ganon (see LoginManager). After background hydrate we do
 *   not currently refresh; the rootStore can be stale until next app open or
 *   until something triggers reloadAllStores().
 *
 * @refresh reset
 */
import { applySnapshot, IDisposer, onSnapshot } from "mobx-state-tree"
import { RootStore, RootStoreSnapshot } from "../RootStore"
import { ganon } from "@/services/ganon/ganon"

/**
 * Setup the root state.
 */
let _disposer: IDisposer | undefined
export async function setupRootStore(rootStore: RootStore) {
  let restoredState: RootStoreSnapshot | undefined | null

  try {
    // Load the last known state from ganon (local only; not overwritten by cloud restore/hydrate).
    restoredState = ganon.get("rootState") as RootStoreSnapshot | null | undefined

    if (restoredState) {
      applySnapshot(rootStore, restoredState)
    }
  } catch (e) {
    // if there's any problems loading, then inform the dev what happened
    if (__DEV__) {
      if (e instanceof Error) console.error(e.message)
    }
  }

  // stop tracking state changes if we've already setup
  if (_disposer) _disposer()

  // track changes & save to AsyncStorage
  _disposer = onSnapshot(rootStore, (snapshot) => ganon.set("rootState", snapshot))

  const unsubscribe = () => {
    _disposer?.()
    _disposer = undefined
  }

  return { rootStore, restoredState, unsubscribe }
}
