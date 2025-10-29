/**
 * Determines the appropriate text color (light or dark) for a given background color
 * by calculating the relative luminance using WCAG standards.
 * 
 * @param backgroundColor - The background color in hex format (e.g., "#FFBB50" or "FFBB50")
 * @returns "#000000" (black) for light backgrounds, "#FFFFFF" (white) for dark backgrounds
 */
const getTextColorForBackground = (backgroundColor: string): string => {
  // Remove '#' if it exists and handle RGB/RGBA
  let hex = backgroundColor.trim().replace("#", "")
  
  // Handle RGB/RGBA format - extract just the RGB values
  if (backgroundColor.startsWith("rgb")) {
    const rgbMatch = backgroundColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
    const rgbaMatch = backgroundColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/)
    
    if (rgbMatch || rgbaMatch) {
      const match = rgbMatch || rgbaMatch
      const r = parseInt(match![1], 10)
      const g = parseInt(match![2], 10)
      const b = parseInt(match![3], 10)
      
      // Calculate relative luminance using WCAG formula
      const luminance = calculateLuminance(r, g, b)
      
      // If luminance is greater than 0.5, it's a light color, use dark text
      return luminance > 0.5 ? "#000000" : "#FFFFFF"
    }
  }
  
  // Handle hex format
  if (hex.length !== 6) {
    // Invalid hex, default to dark text
    return "#000000"
  }
  
  // Parse RGB components
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  
  // Calculate relative luminance using WCAG formula
  const luminance = calculateLuminance(r, g, b)
  
  // If luminance is greater than 0.5, it's a light color, use dark text
  return luminance > 0.5 ? "#000000" : "#FFFFFF"
}

/**
 * Calculates the relative luminance of a color using the WCAG formula.
 * This considers how the human eye perceives brightness.
 * 
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns Luminance value between 0 and 1
 */
const calculateLuminance = (r: number, g: number, b: number): number => {
  // Convert RGB to normalized values (0-1)
  const normalize = (value: number) => {
    const normalized = value / 255
    // Apply gamma correction
    return normalized <= 0.03928 
      ? normalized / 12.92 
      : Math.pow((normalized + 0.055) / 1.055, 2.4)
  }
  
  const normR = normalize(r)
  const normG = normalize(g)
  const normB = normalize(b)
  
  // WCAG relative luminance formula
  // L = 0.2126 × R + 0.7152 × G + 0.0722 × B
  return 0.2126 * normR + 0.7152 * normG + 0.0722 * normB
}

export default getTextColorForBackground

