/**
 * @param {string} str
 * @param {object?} options
 */
function isValidFloat(str, options = {}) {
  const numeric = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(str);
  if (!numeric) return false;
  if (options) {
    const num = Number.parseFloat(str);
    if (typeof options.min === 'number' && num < options.min) return false;
    if (typeof options.max === 'number' && num > options.max) return false;
  }

  return true;
}

export default isValidFloat;
