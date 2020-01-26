/**
 * @param {string} str
 * @param {object?} options
 */
function isValidInt(str, options = {}) {
  const numeric = /^\d+$/.test(str);
  if (!numeric) return false;
  const num = Number.parseFloat(str);
  if (!Number.isInteger(num)) return false;
  if (options) {
    if (typeof options.min === 'number' && num < options.min) return false;
    if (typeof options.max === 'number' && num > options.max) return false;
  }

  return true;
}

export default isValidInt;
