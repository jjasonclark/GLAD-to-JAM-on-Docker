'use strict';

module.exports.tap = fn => data => {
  fn(data);
  return data;
};

module.exports.promisify = (f, context = null) => (...args) =>
  new Promise((resolve, reject) => {
    args.push((err, result) => {
      if (err == null) {
        resolve(result);
      } else {
        reject(err);
      }
    });
    f.apply(context, args);
  });
