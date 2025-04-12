import { atom } from "jotai";

const lastCloseAtom = atom([]);
const watchlistObjectAtom = atom([
  {
    nameOfStock: "",
    tickerSymbol: "",
    intrinsicValue: "",
  },
]);

export { lastCloseAtom, watchlistObjectAtom };
