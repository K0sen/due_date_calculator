const isInteger = require('./isInteger');

module.exports = timestamp => {
  const newTimestamp = new Date(timestamp).getTime();
  return isInteger(newTimestamp);
};
