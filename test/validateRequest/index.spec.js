const { expect } = require('chai');
const AdaptedDate = require('../../src/adaptedDate');
const DueDateCalculator = require('../../src/dueDateCalculator');

const calculateTestCases = [
  { dateString: 'May 28, 2020 13:39:00', turnaround: 1, expected: (new Date('May 28, 2020 14:39:00')).getTime() },
  { dateString: 'May 28, 2020 13:39:00', turnaround: 4, expected: (new Date('May 29, 2020 9:39:00')).getTime() },
  { dateString: 'May 28, 2020 13:00:00', turnaround: 12, expected: (new Date('June 1, 2020 9:00:00')).getTime() },
  { dateString: 'May 25, 2020 13:39:00', turnaround: 16, expected: (new Date('May 27, 2020 13:39:00')).getTime() },
  { dateString: 'May 28, 2020 13:39:00', turnaround: 24, expected: (new Date('June 2, 2020 13:39:00')).getTime() },
  { dateString: 'May 28, 2020 9:00:00', turnaround: 8, expected: (new Date('May 29, 2020 9:00:00')).getTime() },
  { dateString: 'May 28, 2020 9:00:00', turnaround: 0, expected: (new Date('May 28, 2020 9:00:00')).getTime() },
];

const validateDateTestCases = [
  { dateString: 'May 30, 2020 11:39:00', turnaround: 1, expected: false },
  { dateString: 'May 31, 2020 16:39:00', turnaround: 1, expected: false },
  { dateString: 'May 28, 2020 17:00:00', turnaround: 1, expected: false },
  { dateString: 'May 28, 2020 16:59:59', turnaround: 1, expected: true },
  { dateString: 'May 27, 2020 9:00:00', turnaround: 1, expected: true },
];

describe('Due day calculator', () => {
  it('should calculate valid data properly', () => {
    calculateTestCases.forEach(({ dateString, turnaround, expected }) => {
      const dueDateCalculator = new DueDateCalculator(new AdaptedDate(dateString), turnaround);
      const dueDate = dueDateCalculator.calculateDueDate();
      expect(dueDate.getTime()).to.be.equal(expected);
    });
  });

  it('should validate incorrect date', () => {
    validateDateTestCases.forEach(({ dateString, turnaround, expected }) => {
      const dueDateCalculator = new DueDateCalculator(new AdaptedDate(dateString), turnaround);
      expect(dueDateCalculator.isValidSubmitDate()).to.be.equal(expected);
    });
  });
});
