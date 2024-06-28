/***
 * Value that represents the caret position in the code editor.
 *
 * @typedef {object} CaretPosition
 * @property {number} x value representation on x-axis
 * @property {number} y value representation on y-axis
 */

/***
 * Representation of caret position in two forms.
 * First form is based on split position on two axis base.
 * Second is based on single number representing the position in the code editor string value.
 *
 * @typedef {object} CaretData
 * @property {CaretPosition} position represent the position of the caret in code editor split to two axis
 * @property {number} index represent the position of the caret in the code editor value in form of single dimensional number
 */
