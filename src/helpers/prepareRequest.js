module.exports = requestQueries => ({
  ...requestQueries,
  ...(requestQueries.date && { date:  Number(requestQueries.date) }),
  ...(requestQueries.turnaround && { turnaround: Number(requestQueries.turnaround) }),
});
