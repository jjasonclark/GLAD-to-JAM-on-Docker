export const preventDefault = (f, ...args) => event => {
  event.preventDefault();
  return f(...args);
};
