export const tap = fn => data => {
  fn(data);
  return data;
};

export const merge = fn => data => [data, Promise.resolve(fn(data))];

export const timeoutPromise = timeout =>
  new Promise((_, reject) => {
    setTimeout(reject, timeout, 'timed out');
  });

export const withTimeout = (timeout, other) => Promise.race([timeoutPromise(timeout), other]);
