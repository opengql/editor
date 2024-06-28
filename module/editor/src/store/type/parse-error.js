/***
 * Object that provides information about the error received from parsing process.
 * This information is based on three properties that indicates the position of error in the input code and short description of the issue.
 *
 * @typedef {ParseError}
 * @property {number} lineIndex value that indicates in which input line the error is placed
 * @property {number} charPosition value that indicates in what position the error is placed in line
 * @property {string} message string message that describes the actual error related to given position
 */
