//Polyfill
window.requestAnimationFrame = function (callback) {
  setTimeout(callback, 0);
  return 0;
};
