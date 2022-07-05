import "./CurrencyForm.css";
import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { useEffectOnce } from "../utils/useEffectOnce";
import useLocalStorage from "../utils/useLocalStorage";

export default function CurrencyForm() {
  const [exchangeRate, setExchangeRate] = useLocalStorage("exchangeRate");

  const [firstCurrency, setFirstCurrency] = useState("PLN");
  const [secondCurrency, setSecondCurrency] = useState("USD");

  const findExchangeRateByCode = (code) => {
    return exchangeRate.rates.find((r) => r.code === code).mid;
  };

  const [firstInputValue, setFirstInputValue] = useState(1);
  const [secondInputValue, setSecondInputValue] = useState(() =>
    findExchangeRateByCode("USD")
  );

  useEffectOnce(() => {
    console.log(exchangeRate);
  });

  const handleFirstChange = (e) => {
    console.log(e.value);
  };

  const handleSecondChange = (e) => {
    console.log(e.value);
  };

  return (
    <div className="currency-form">
      <InputNumber
        value={firstInputValue}
        mode="currency"
        currency={firstCurrency}
        onChange={handleFirstChange.bind(this)}
      />
      <InputNumber
        value={secondInputValue}
        mode="currency"
        currency={secondCurrency}
        onChange={handleSecondChange.bind(this)}
      />
      <Dropdown />
    </div>
  );
}
