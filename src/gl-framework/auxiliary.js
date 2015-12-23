/**
 * Created by mattguay on 12/23/15.
 */

/**
 * Constrain input x to fall between inputs min and max.
 * @param {number} x - value to constrain.
 * @param {number} min - minimum constraint value.
 * @param {number} max - maximum constraint value.
 * @returns {number}
 */
function constrain(x, min, max) {
    return Math.min(max, Math.max(min, x));
}

/**
 * Returns the sign of input x: -1 if x<0, 0 if x==0, 1 if x>0.
 * @param {number} x
 * @returns {number}
 */
function sign(x) {
    return (x > 0) - (x < 0);
}

/**
 * Returns log2 of the input.
 * @param {number} x
 * @returns {number}
 */
function log2(x) {
    return Math.log(x) / Math.log(2);
}

/**
 * Returns the smallest power of 2 larger than the input.
 * @param {number} x
 * @returns {number}
 */
function npot(x) {
    return Math.round(Math.pow(2, Math.ceil(log2(x))));
}