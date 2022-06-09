import { currencyFormatter } from "../../utils/currencyFormatter";
import { percentFormatter } from "../../utils/percentFormatter";

function isTheStringEmpty(value) {
  return typeof value === "string" && !value.length;
}

function hasOnlyOneChar(value) {
  return typeof value === "string" && value.length === 1;
}

export function numberParser(value) {
  try {
    if (isTheStringEmpty(value)) {
      value = "0.0";
    }

    if(hasOnlyOneChar(value)) {
      value = `0,0${value}`;
    }

    let group = new Intl.NumberFormat("pt-br").format(1111).replace(/1/g, "");
    let decimal = new Intl.NumberFormat("pt-br").format(1.1).replace(/1/g, "");
    let reversedVal = value.replace(new RegExp("\\" + group, "g"), "");
    reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");

    reversedVal = reversedVal.replace(/[^0-9.]/g, "");

    const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length;
    const needsDigitsAppended = digitsAfterDecimalCount > 2;

    if (needsDigitsAppended) {
      reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2);
    }

    return Number.isNaN(reversedVal) ? 0 : reversedVal;
  } catch (error) {
    console.error(error);
  }
};

export const Formatter = (formatterType) => {
  const MyFormatters = {
    "currency": currencyFormatter,
    "percentage": percentFormatter,
    "default": (value) => value,
  }

  return MyFormatters[formatterType] ?? MyFormatters['default'];
}