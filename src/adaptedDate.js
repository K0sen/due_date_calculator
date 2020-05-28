class AdaptedDate extends Date {
  days = ['Sunday', 'Monday', 'Tuesday','Wednesday' ,'Thursday', 'Friday', 'Saturday'];

  constructor(date) {
    super(date);
  }

  getDayName(date) {
    const dayNumber = date.getDay();
    return this.days[dayNumber];
  }
}

module.exports = AdaptedDate;
