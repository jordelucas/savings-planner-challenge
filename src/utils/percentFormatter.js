import { convertPercentToDecimalForm } from "./convertPercentToDecimalForm";

export function percentFormatter(value) {
  const decimalForm = convertPercentToDecimalForm(value);

  return new Intl.NumberFormat("pt-br", {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(decimalForm);
};