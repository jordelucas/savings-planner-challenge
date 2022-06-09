export function annualToMonthlyInterestRate(annualInterest) {
  return Math.pow(1 + annualInterest, 1/12) - 1;
}