export default interface IOneSignalAdditionalData {
  route: string
}

// predicate
export function isOneSignalAdditionalData(obj: any): obj is IOneSignalAdditionalData {
  return obj && typeof obj === "object" && "route" in obj
}
