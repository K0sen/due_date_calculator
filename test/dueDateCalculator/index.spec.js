const { expect } = require('chai');
const RequestValidator = require('../../src/requestValidator');

const testCases = [
  { date: (new Date('May 28, 2020 14:39:00')).getTime(), turnaround: 1, expected: true },
  { date: (new Date('May 28, 2020 14:39:00')).getTime(), turnaround: 1, expected: true },
  { date: undefined, turnaround: undefined, expected: false },
  { date: -2554, turnaround: 2, expected: true },
  { date: 'string', turnaround: 2, expected: false },
  { date: 123, turnaround: -2, expected: false },
  { date: 123, turnaround: 0, expected: true },
]

describe('Request validator', () => {
  it('should validate incorrect requests', () => {
    testCases.forEach(({ date, turnaround, expected }) => {
      const requestValidator = new RequestValidator({ date, turnaround });
      requestValidator.validate();
      expect(requestValidator.isValid()).to.be.equal(expected);
    });
  });
});
