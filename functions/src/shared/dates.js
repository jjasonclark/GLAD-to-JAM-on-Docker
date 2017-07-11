function daysFromNow(days) {
  const result = new Date();
  result.setDate(result.getDate() + days);
  return result;
}

function toUnixTime(what) {
  return Math.floor(what.getTime() / 1000);
}

module.exports.daysFromNow = daysFromNow;
module.exports.daysAgo = days => daysFromNow(days * -1);
module.exports.toUnixTime = toUnixTime;
