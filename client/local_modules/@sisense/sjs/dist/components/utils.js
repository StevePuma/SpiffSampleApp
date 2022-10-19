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

export { debounce as d, wait as w };
