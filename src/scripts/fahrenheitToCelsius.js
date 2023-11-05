const convert = function (fahremheit) {
  const celsius = ((fahremheit - 32) * 5) / 9;
  return celsius;
};

export default convert;
