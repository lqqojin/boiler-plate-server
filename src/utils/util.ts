/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description 값 유효성 체크
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (
    value !== null &&
    typeof value === 'object' &&
    !Object.keys(value).length
  ) {
    return true;
  } else {
    return false;
  }
};
