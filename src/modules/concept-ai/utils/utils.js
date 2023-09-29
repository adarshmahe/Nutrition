export function debounce (callback, delay) {
  let lastTime;
  return function () {
    clearTimeout(lastTime);
    const [that, args] = [this, arguments];
    lastTime = setTimeout(() => {
      callback.apply(that, args);
    }, delay);
  };
}