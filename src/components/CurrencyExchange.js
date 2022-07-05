import axios from "axios";
import React from "react";
import { useEffectOnce } from "../utils/useEffectOnce";
import useLocalStorage from "../utils/useLocalStorage";
import CurrencyForm from "./CurrencyForm";

export default function CurrencyExchange() {
  const [exchangeRate, setExchangeRate] = useLocalStorage("exchangeRate", "");

  const getStringDate = () => {
    let d = new Date();
    return d.toISOString().substr(0, d.toISOString().search("T"));
  };

  useEffectOnce(async () => {
    if (exchangeRate && exchangeRate.effectiveDate === getStringDate()) return;

    const API_URL = "http://api.nbp.pl/api/exchangerates/tables/A/?format=json";
    let res = await axios.get(API_URL);
    setExchangeRate(res.data[0]);
  });

  return (
    <>
      <span>Currency Exchange</span>
      {exchangeRate && <CurrencyForm exchangeRate={exchangeRate} />}
    </>
  );
}
