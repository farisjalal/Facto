import { listenerCount } from "events";
import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import "./facts.css";
import Navbar from "./Navbar";

function App() {
  const [date, setDate] = React.useState(new Date());
  const [data, setData] = React.useState(null);

  const dateIncr = () => {
    setData(null);
    let myDate = new Date(date.getTime() + 1 * 86400000);
    setDate(myDate);
  };

  const dateDecr = () => {
    setData(null);
    let myDate = new Date(date.getTime() - 1 * 86400000);
    setDate(myDate);
  };

  React.useEffect(() => {
    fetch(`/api?date=${encodeURIComponent(date)}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [date]);

  return (
    <div className="App">
      <Navbar displayDate={date} dateDecr={dateDecr} dateIncr={dateIncr} />
      <header className="App-header">
        {!data
          ? "Loading..."
          : data.info.map((fact) => (
              <div className="fact">
                <div class="fact">
                  <span>{fact.factText.substring(0, 4)}</span>
                </div>
                <div class="container">
                  <div class="text">
                    <span>{fact.factText.substring(4)}</span>
                  </div>
                  <div class="image">
                    <img src={fact.imageUrl} />
                  </div>
                </div>
              </div>
            ))}
      </header>
    </div>
  );
}

export default App;
