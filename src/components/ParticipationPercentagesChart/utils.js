import { currencyFormatter } from "../../utils/currencyFormatter";

export function renderDetails(accumulatedValue, savedValue) {
  return (`
    <div class='w-44 h-44 flex flex-col items-center justify-center text-center leading-6 shadow-3xl rounded-full my-auto'>
      <div>
        <h3 class='font-normal text-xs text-gray-700'>Valor Acumulado</h3>
        <h4 class='font-semibold text-black-900'>${currencyFormatter(accumulatedValue)}</h4>
      </div>
      <div class='mt-2'>
        <h3 class='font-normal text-xs text-gray-700'>Você terá poupado</h3>
        <h4 class='font-normal text-xs text-black-900'>${currencyFormatter(savedValue)}</h4>
      </div>
    </div>
  `)
}