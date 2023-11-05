import logo from "./logo.svg";
import "./App.css";
import Main from "./components/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { useEffect, useState } from "react";

// await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=${this.apiKey}

function App() {
  const [appSection, setAppSection] = useState("Main");
  const [savedLocations, setSavedLocations] = useState(
    JSON.parse(localStorage.getItem("savedLocations")) || {}
  );

  return (
    <>
      <Main
        appSection={appSection}
        setAppSection={setAppSection}
        savedLocations={savedLocations}
        setSavedLocations={setSavedLocations}
      />
    </>
  );
}

export default App;
