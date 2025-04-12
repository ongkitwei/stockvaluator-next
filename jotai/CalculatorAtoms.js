import { atom } from "jotai";

const calculatorObjectAtom = atom({
  nameOfStock: "",
  tickerSymbol: "",
  freeCashFlow: "",
  cashAndCashEquiv: "",
  totalDebt: "",
  rate1to5: "",
  rate6to10: "",
  rate11to20: "",
  oustandingShares: "",
  discountRate: "",
  currentYear: "",
  intrinsicValue: "",
});
const watchlistObjectAtom = atom([
  {
    nameOfStock: "",
    tickerSymbol: "",
    intrinsicValue: "",
  },
]);

const discountedValueAtom = atom([]);
const arrayFcfAtom = atom([]);
const handleCalculateButtonStateAtom = atom(false);
const favouritesButtonAtom = atom(false);

export {
  calculatorObjectAtom,
  watchlistObjectAtom,
  discountedValueAtom,
  arrayFcfAtom,
  handleCalculateButtonStateAtom,
  favouritesButtonAtom,
};
