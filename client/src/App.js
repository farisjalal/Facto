
import { listenerCount } from "events";
import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import "./facts.css";
import Navbar from "./Navbar";

function App() {
  const [date, setDate] = React.useState(new Date());
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch(`/api?date=${encodeURIComponent(date)}`)
      .then((res) => res.json())
      .then((data) => setData(data));

      // await new Promise(resolve => setTimeout(resolve, 10000));
      // newDate = new Date(Date.now() + 5 * 86400000);
      // console.log(newDate);

  }, [date]);

  return (
    <div className="App">
      <Navbar/>
      <header className="App-header">
        {!data ? "Loading..." : data.info.map((fact)=>(
          <div className="fact">            
            <div class="fact"><span>{fact.factText.substring(0,4)}</span></div>
              <div class="container">              
                <div class="text"><span>{fact.factText.substring(4)}</span></div>
                <div class="image"><img src={fact.imageUrl}/></div>
              </div>            
          </div>          
        ))}
      </header>
    </div>
  );
}

export default App;