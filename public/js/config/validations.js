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

/**
 * Sets red borders to the input fields that doesn't pass validation.
 *
 * @param {boolean} valid - True/false.
 * @param {HTMLInputElement} field - The validated input field.
 */
export function setRedBorders (valid, field) {
  if (!valid) {
    field.style.border = '2px solid red'
    field.style.color = 'red'
    field.dataset.valid = false
  } else {
    field.style.border = 'solid black 1px'
    field.style.color = 'black'
    field.dataset.valid = true
  }
}
