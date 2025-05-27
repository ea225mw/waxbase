/**
 * Validates the seconds field input.
 *
 * @param {number | string} passedValue - The passed value.
 * @returns {boolean} - True/false.
 */
export function validateSeconds (passedValue) {
  const value = passedValue.trim()

  if (value === '') {
    return true
  }

  if (!/^\d+$/.test(value)) {
    return false
  } else {
    const number = parseInt(value, 10)
    if (number < 0 || number > 59) {
      return false
    }
  }
  return true
}

/**
 * Validates the minutes field input.
 *
 * @param {number | string} passedValue - The passed value.
 * @returns {boolean} - True/false.
 */
export function validateMinutes (passedValue) {
  const value = passedValue.trim()

  if (value === '') {
    return true
  }

  if (!/^\d+$/.test(value)) {
    return false
  } else {
    const number = parseInt(value, 10)
    if (number < 0) {
      return false
    }
  }
  return true
}
