'use strict';

function debounce(wrappedFunction, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      wrappedFunction.apply(this, args);
    }, delay);
  };
}
function wait(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

exports.debounce = debounce;
exports.wait = wait;
