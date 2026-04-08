const SAFE_TEXT_REGEX = /[^a-zA-Z0-9 .,!?@#%&()_+\-:/']/g

export function sanitizeText(value: string): string {
  return value.replace(SAFE_TEXT_REGEX, '').trim()
}

export function validateRequiredText(value: string, min: number, max: number): string | null {
  const cleaned = sanitizeText(value)
  if (cleaned.length < min) return `Must be at least ${min} characters.`
  if (cleaned.length > max) return `Must be less than ${max} characters.`
  return null
}

export function validatePrice(value: number): string | null {
  if (!Number.isFinite(value) || value <= 0) return 'Price must be a positive number.'
  if (value > 100000000) return 'Price is too high.'
  return null
}

export function limitArray<T>(values: T[], max: number): T[] {
  return values.slice(0, max)
}

export function safeDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return new Date().toISOString()
  return date.toISOString()
}
