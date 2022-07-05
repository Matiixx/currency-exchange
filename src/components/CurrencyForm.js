import "./CurrencyForm.css";
import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import useLocalStorage from "../utils/useLocalStorage";

export default function CurrencyForm() {
  const [exchangeRate] = useLocalStorage("exchangeRate");

  const findCurrencyByCode = (code) => {
    return (
      exchangeRate.rates.find((r) => r.code === code) || {
        currency: "zloty polski",
        code: "PLN",
        mid: 1.0,
      }
    );
  };

  const [firstCurrency, setFirstCurrency] = useState(findCurrencyByCode("PLN"));
  const [secondCurrency, setSecondCurrency] = useState(
    findCurrencyByCode("USD")
  );

  const [firstInputValue, setFirstInputValue] = useState(1);
  const [secondInputValue, setSecondInputValue] = useState(
    firstInputValue * findCurrencyByCode(secondCurrency.code).mid
  );

  // useEffectOnce(() => {
  //   console.log(exchangeRate);
  // });

  const handleFirstChange = (e) => {
    if (!e.value) return;

    setFirstInputValue(e.value);
    setSecondInputValue(e.value * secondCurrency.mid);
  };

  const handleSecondChange = (e) => {
    if (!e.value) return;

    setSecondInputValue(e.value);
    setFirstInputValue(e.value / secondCurrency.mid);
  };

  const handleDropdownChange = (e) => {
    setSecondCurrency(e.value);
  };

  const currencyOptionTemplate = (option) => {
    return (
      <div className="currency-item">
        <span>
          <b>{option.code}</b> {option.currency}
        </span>
      </div>
    );
  };

  const selectedCurrencyTemplate = (option, props) => {
    if (option)
      return (
        <div className="currency-item currency-item-value">
          <span>
            <b>{option.code}</b>
          </span>
        </div>
      );

    return <span>{props.placeholder}</span>;
  };

  return (
    <div className="currency-form">
      <div className="currency-form-center-horizontal">
        <InputNumber
          value={firstInputValue}
          mode="currency"
          currency={firstCurrency.code}
          onChange={handleFirstChange.bind(this)}
        />
        <div>
          <InputNumber
            value={secondInputValue}
            mode="currency"
            currency={secondCurrency.code}
            onChange={handleSecondChange.bind(this)}
          />
          <Dropdown
            value={secondCurrency}
            options={exchangeRate.rates}
            optionLabel="code"
            placeholder="Select a currency"
            onChange={handleDropdownChange.bind(this)}
            itemTemplate={currencyOptionTemplate}
            valueTemplate={selectedCurrencyTemplate}
          />
        </div>
      </div>
    </div>
  );
}
