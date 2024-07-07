/***
 * Object that contains all possible states of parsing,
 * There are four properties that represents four states of parsing.
 *
 * @readonly
 * @property {string} IDLE represent state when application is listening for code changes.
 * @property {string} FETCHING represent state when application is initially fetching all supported grammars from worker.
 * @property {string} INITIALIZING represent state when application is initializing currently selected grammar with request to the worker.
 * @property {string} PARSING represent state when application is sending the current changes in code to worker which will parse and validate this code.
 * @enum {string}
 */
export const ParseState = {
  IDLE: 'IDLE',
  FETCHING: 'FETCHING',
  INITIALIZING: 'INITIALIZING',
  PARSING: 'PARSING',
};
