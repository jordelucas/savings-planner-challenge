export function convertPercentToDecimalForm(value) {
  const BASE = 10;
  const EXPONENT = -2;

  return value * Math.pow(BASE, EXPONENT)
}