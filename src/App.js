import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import CurrencyExchange from "./components/CurrencyExchange";

function App() {
  return (
    <div className="App">
      <CurrencyExchange />
    </div>
  );
}

export default App;
