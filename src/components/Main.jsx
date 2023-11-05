import { Container, Form } from "react-bootstrap";
import icon from "../svg/Rain.svg";
import { useEffect, useState, useRef } from "react";
import getHours from "date-fns/getHours";
import WeatherCard from "./WeatherCard";
import add from "date-fns/add";
import NavBar from "./NavBar";
import Menu from "./Menu";
import LoadingOverlay from "./LoadingOverlay";

const Main = function ({
  appSection,
  setAppSection,
  savedLocations,
  setSavedLocations
}) {
  const [city, setCurrentCity] = useState("Roma, IT");
  const [didMount, setDidMount] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [coordinates, setCoordinates] = useState({});
  const [foreCast, setForeCastData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hasChangedPage, setHasChangedPage] = useState(false);
  const [isSavingLocation, setIsSavingLocation] = useState(false);
  const prevSectionRef = useRef(appSection);
  console.warn(currentDate);

  const API_KEY = "00186a38383ee2f78e5c0dc10414874b";
  const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`;
  const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${API_KEY}`;

  const getWeatherData = async function () {
    try {
      const response = await fetch(WEATHER_URL);
      if (response.ok) {
        const data = await response.json();
        setCoordinates({ lat: data.coord.lat, lon: data.coord.lon });
        setWeatherData(data);
      } else {
        throw new Error("Errore nella fetch.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getForeCastData = async function () {
    const forecastsByDay = {};
    try {
      const response = await fetch(FORECAST_URL);
      if (response.ok) {
        const data = await response.json();
        console.warn("DATA", data);
        data.list.forEach((dayForecast) => {
          const date = new Date(dayForecast.dt_txt);
          // console.log("DATA dt: ", new Date(1699140566 * 1000));
          const dayKey = date.toDateString();

          if (!forecastsByDay[dayKey]) {
            forecastsByDay[dayKey] = [];
          }

          forecastsByDay[dayKey].push({
            hour: getHours(date),
            temperature: dayForecast.main.temp,
            weather: dayForecast.weather[0],
            sys: dayForecast.sys
          });
        });
        console.log("forecastByDay:", forecastsByDay);
        setForeCastData(forecastsByDay);
        console.log("FORECAST, DI NUOVO:", foreCast);
        if (!forecastsByDay[currentDate.toDateString()]) {
          //vuol dire che, dato che l'API fornisce le previsioni ad intervalli di 3 ore,
          //sono passate le 21 di sera, quindi nell'oggetto partiranno le previsioni del giorno successivo

          // in questo caso, la data da controllare sarà il giorno successivo.
          setCurrentDate(add(new Date(), { days: 1 }));
          // console.log(
          //   "non ci sono previsioni per oggi, passo a domani: ",
          //   currentDate.toDateString()
          // );
          // console.log("i forecast per domani sono: ", foreCast);
          // console.log(
          //   "forecastByDay di domani:",
          //   forecastsByDay[currentDate.toDateString()]
          // );
        }
        // setIsLoading(true);
      } else {
        throw new Error("Errore nella fetch delle previsioni meteo.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    getWeatherData();
    getForeCastData();
    console.log("forecast nello useEffect:", foreCast);
  }, [city]);

  useEffect(() => {
    if (didMount) {
      setIsLoading(false);
      // console.log("forecast dopo il didmount: ", foreCast);
      // console.log("weatherDATA: ", weatherData);
    }
  }, [foreCast]);

  const handlePageChanging = function () {
    //se è stato cliccato il pulsante che scatena il cambio di pagina ma non è ancora passato il tempo necessario per l'animazione, ritorna fade-out, altrimenti d-none
    if (hasChangedPage) {
      return "d-none";
    } else if (appSection === "Menu") {
      return "fade-out";
    } else if (appSection === "Main") {
      return "fade-in";
    } else {
      return "";
    }
  };

  const handleSearch = function (e) {
    if (e.key === "Enter") {
      if (isSavingLocation) {
        const newCity = e.target.value;
        setSavedLocations((prevSavedLocations) => ({
          ...prevSavedLocations,
          [newCity]: newCity
        }));
      } else {
        setCurrentCity(e.target.value);
      }
    }
  };
  useEffect(() => {
    if (didMount) {
      localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
    }
  }, [savedLocations]);

  useEffect(() => {
    console.log("prevSectionRef", prevSectionRef.current);
    console.log("appSection", appSection);
    if (appSection === "Main" && prevSectionRef.current !== "Main") {
      setHasChangedPage(false);

      console.log("ho settato hasChangedPage su true");
    } else if (appSection !== "Main" && prevSectionRef.current === "Main") {
      setTimeout(() => {
        setHasChangedPage(true);
      }, 500);
      console.log("ho settato hasChangedPage su false");
    }
    prevSectionRef.current = appSection;
  }, [appSection]);

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <Container
        fluid
        className="d-flex flex-column align-items-center body-bg h-100 text-white px-0 overflow-y-auto overflow-x-hidden"
        id="main-container"
        onClick={(e) => {
          if (e.currentTarget.id === "main-container") {
            console.log(e.currentTarget);
            setIsSearching(false);
          }
        }}
      >
        <div className={"" + handlePageChanging()}>
          {weatherData.main && (
            <div className="text-center">
              {isSearching && (
                <Form.Control
                  type="text"
                  className="search-input position-fixed top-0 mt-4"
                  placeholder="Roma, IT"
                  onKeyDown={(e) => {
                    handleSearch(e);
                  }}
                  onClick={(e) => e.stopPropagation()}
                ></Form.Control>
              )}
              <img
                src={icon}
                alt="currentWeatherIcon"
                width={"250px"}
                height={"250px"}
                draggable={false}
              ></img>
              <p className="fw-semibold temperature-text display-1">
                {Math.round(weatherData.main.temp) + "°"}
              </p>
              <p className="weather-summary m-0">Precipitations</p>
              <div className="d-flex mb-5">
                <span className="mx-auto d-flex gap-3">
                  <span className="max-temperature m-0">
                    {"Max: " + Math.round(weatherData.main.temp_max) + "°"}
                  </span>
                  <span className="min-temperature m-0">
                    {"Min: " + Math.round(weatherData.main.temp_min) + "°"}
                  </span>
                </span>
              </div>
            </div>
          )}
          {!isLoading ? (
            <WeatherCard
              forecast={foreCast}
              currentDate={currentDate}
              appSection={appSection}
              setAppSection={setAppSection}
              hasChangedPage={hasChangedPage}
              setHasChangedPage={setHasChangedPage}
            />
          ) : null}
        </div>
        {hasChangedPage && appSection === "Menu" && !isLoading && (
          <Menu
            city={city}
            forecast={foreCast}
            weatherData={weatherData}
            currentDate={currentDate}
            savedLocations={savedLocations}
            setCurrentCity={setCurrentCity}
            setAppSection={setAppSection}
          />
        )}
        <NavBar
          isSearching={setIsSearching}
          appSection={appSection}
          setAppSection={setAppSection}
          setSavedLocations={setSavedLocations}
          setIsSearching={setIsSearching}
          savedLocations={savedLocations}
          isSavingLocation={isSavingLocation}
          setIsSavingLocation={setIsSavingLocation}
          city={city}
        />
      </Container>
    </>
  );
};

export default Main;
