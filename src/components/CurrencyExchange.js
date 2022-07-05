import axios from "axios";
import React from "react";
import { useEffectOnce } from "../utils/useEffectOnce";
import useLocalStorage from "../utils/useLocalStorage";

export default function CurrencyExchange() {
  const [fetchDate, setFetchDate] = useLocalStorage("fetchDate", "");
  const [exchangeRate, setExchangeRate] = useLocalStorage("exchangeRate", "");

  const getStringDate = () => {
    let d = new Date();
    return d.toISOString().substr(0, d.toISOString().search("T"));
  };

  useEffectOnce(async () => {
    if (exchangeRate && fetchDate === getStringDate()) return;

    const API_URL = "http://api.nbp.pl/api/exchangerates/tables/A/?format=json";
    let res = await axios.get(API_URL);
    setFetchDate(getStringDate());
    setExchangeRate(res.data);
  });

  return <div>Currency Exchange</div>;
}
