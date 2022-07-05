import { useEffect } from "react";
import "./App.css";
import { useEffectOnce } from "./utils/useEffectOnce";

function App() {
  const API_URL = "http://api.nbp.pl/api/exchangerates/tables/A/?format=json";

  const getDate = () => {
    let d = new Date();
    return d.toISOString().substr(d.toISOString().search("T"));
  };

  useEffectOnce(() => {
    let todayDate = getDate();
    console.log(todayDate);
  });

  return <div className="App">Learn React</div>;
}

export default App;
