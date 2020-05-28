class DueDateCalculator {
  date;
  turnaround;
  workingHours = { start: 9, end: 17 };
  nonworkingDays = ['Sunday', 'Saturday'];

  constructor(date, turnaround) {
    this.date = date;
    this.turnaround = turnaround;
  }

  calculateDueDate() {
    const { start, end } = this.workingHours;
    let dueDate = new Date(this.date.getTime());
    const hours = dueDate.getHours();
    const hoursInDay = end - start;
    let hoursFromTheStartOfTheDay = hours - start + this.turnaround;
    while (hoursFromTheStartOfTheDay >= hoursInDay) {
      dueDate = this._setNextWorkingDay(dueDate);
      hoursFromTheStartOfTheDay -= hoursInDay
    }

    dueDate.setHours(start + hoursFromTheStartOfTheDay);
    return dueDate;
  }

  isValidSubmitDate() {
    const dayName = this.date.getDayName(this.date);
    const hours = this.date.getHours();
    const { start, end } = this.workingHours;
    return !this.nonworkingDays.includes(dayName)
      && hours < end && hours >=start;
  }

  _setNextWorkingDay(date) {
    const newDate = new Date(date.getTime());
    let newDateDayName;
    do {
      newDate.setDate(newDate.getDate() + 1);
      newDateDayName = this.date.getDayName(newDate);
    } while(this.nonworkingDays.includes(newDateDayName))

    return newDate;
  }
}

module.exports = DueDateCalculator;
