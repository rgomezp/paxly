## State architecture (MobX-State-Tree + Ganon)

This app uses MobX-State-Tree (MST) for reactive in-memory state, with Ganon as the persistence layer. The typical flow is:

1) UI triggers a manager action (e.g., log a mood via `MoodManager.create`).
2) Manager persists to Ganon (local/remote per config).
3) Manager also updates the MST store (e.g., `rootStoreSingleton.moodStore.add`).
4) Observed components re-render automatically because MST mutated observable state.

### Key pieces

- `app/models/RootStore.ts`
  - Declares the MST root model. We added `moodStore`:
    - `moodStore: types.optional(MoodStoreModel, {})`

- `app/models/mood/MoodStore.ts`
  - Holds `history: IMoodHistoryItem[]` as MST `types.array(types.frozen<IMoodHistoryItem>())`.
  - Actions:
    - `loadFromGanon()` – one-shot load from persisted `moodHistory`.
    - `add(item)` – push to `history` and persist to Ganon.
    - `deleteByDate(timestamp)` – remove one item and persist.
    - `clear()` – reset and persist.
    - `afterCreate()` – auto-loads from Ganon on store creation.

- `app/models/helpers/useStores.ts`
  - Exposes `rootStoreSingleton` (singleton MST root).
  - Provides React hook `useStores()` so components can access stores.
  - `useInitialRootStore()` performs rehydration and sets up persistence of the root snapshot to Ganon (`rootState`).

- `app/services/ganon/ganon.ts` and `StorageMapping.ts`
  - Ganon instance for persistence.
  - `StorageMapping` defines the persisted keys, including `moodHistory` and `rootState`.

- Managers
  - Example: `app/managers/MoodManager.ts`
    - Builds `IMoodHistoryItem` and writes to Ganon.
    - Also updates the MST store (`rootStoreSingleton.moodStore.add(item)`) to keep UI reactive.

### Wiring in the App

- `app/app.tsx`
  - Uses `useInitialRootStore()` to initialize and rehydrate the MST root before rendering the app.

### Using state in components

- Make components observers:
  - `import { observer } from "mobx-react-lite"`
  - `export const SomeComponent = observer(function SomeComponent() { ... })`
- Access stores via hook:
  - `const { moodStore } = useStores()`
- Derive UI state from store data. Avoid expensive computations in `useMemo` keyed by array reference; MST mutates arrays in place, so compute from values each render or memoize using stable primitives as dependencies.

Example (excerpt from `MoodGraph`):

```tsx
const { moodStore } = useStores()
// Recompute from observable data each render so MST mutations trigger updates
const history = moodStore.history.slice()
// ... derive buckets from history and render
```

### Patterns and best practices

- Do
  - Funnel writes through managers and ensure they also update MST stores.
  - Read state from stores inside `observer` components.
  - Keep store data serializable; use `types.frozen<T>` for value-objects like snapshots.
  - Keep derived computations local to components or implement MST views if they’re shared.

- Avoid
  - Reading directly from Ganon in UI; prefer MST stores for reactivity.
  - Depending on array reference equality for `useMemo` keys; MST mutates arrays.
  - Using `any` in store types; prefer app types like `IMoodHistoryItem`.

### Troubleshooting reactivity

- UI doesn’t update after a write:
  - Confirm the manager also updates the MST store (not just Ganon).
  - Ensure component is wrapped in `observer` and reads from `useStores()`.
  - Avoid `useMemo` with `[store.array]` as a dependency; compute from values each render or depend on primitives.

### Testing the flow

1) Open Me screen (shows `MoodGraph`).
2) Log a mood via `MoodLogger`.
3) Upon returning, `MoodGraph` re-renders because `moodStore.history` was mutated via `MoodManager`.

### Extending with new stores

1) Create `app/models/<domain>/<Domain>Store.ts` with model, actions, and (optionally) `afterCreate` to load persisted state.
2) Add the store to `RootStoreModel` in `RootStore.ts`.
3) If managers exist, update them to write to both Ganon and the new store.
4) Use `observer` + `useStores()` in components.


