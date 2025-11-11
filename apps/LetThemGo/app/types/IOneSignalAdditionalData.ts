export default interface IOneSignalAdditionalData {
  route?: string
  rc_offering_id?: string
}

// predicate
export function isOneSignalAdditionalData(obj: any): obj is IOneSignalAdditionalData {
  return obj && typeof obj === "object" && ("route" in obj || "rc_offering_id" in obj)
}
