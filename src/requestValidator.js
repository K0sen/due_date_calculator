const isNumeric = require('./helpers/isInteger');
const isValidTimestamp = require('./helpers/isValidTimestamp');

class RequestValidator {
  requestQueries;
  _errors;

  constructor(requestQueries) {
    this.requestQueries = requestQueries;
    this._errors = [];
  }

  validate() {
    const { date, turnaround } = this.requestQueries;
    if (date === undefined) {
      this._errors.push('The "date" parameter is missing');
    }

    if (turnaround === undefined) {
      this._errors.push('The "turnaround" parameter is missing');
    }

    if (!isNumeric(turnaround) || turnaround < 0) {
      this._errors.push('The "turnaround" parameter should be numeric and bigger or equal than 0');
    }

    if (!isValidTimestamp(date)) {
      this._errors.push('The "date" parameter should be valid timestamp value');
    }
  }

  isValid() {
    return this._errors.length === 0;
  }

  getErrors() {
    return this._errors;
  }
}

module.exports = RequestValidator;
