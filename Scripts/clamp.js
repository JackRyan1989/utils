export default (function () {
  function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
  }

  function help() {
    console.log(
      "clamp(int, min:int, max:int) => Returns min when num is less than min, and returns max when num is greater than max."
    );
  }

  return { clamp, help };
})();
