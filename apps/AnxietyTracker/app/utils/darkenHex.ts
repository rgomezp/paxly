const darkenHex = (hex: string, percentage: number) => {
  // Remove '#' if it exists
  const sanitizedHex = hex.replace("#", "")

  // Parse into RGB components
  const r = parseInt(sanitizedHex.substring(0, 2), 16)
  const g = parseInt(sanitizedHex.substring(2, 4), 16)
  const b = parseInt(sanitizedHex.substring(4, 6), 16)

  // Calculate the darkened RGB values
  const darken = (value: number) =>
    Math.max(0, Math.min(255, Math.floor(value * (1 - percentage / 100))))

  const darkerR = darken(r)
  const darkerG = darken(g)
  const darkerB = darken(b)

  // Convert back to HEX and return
  return `#${darkerR.toString(16).padStart(2, "0")}${darkerG
    .toString(16)
    .padStart(2, "0")}${darkerB.toString(16).padStart(2, "0")}`
}

export default darkenHex
