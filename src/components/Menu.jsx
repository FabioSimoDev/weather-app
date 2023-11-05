import { Card, Row, Col } from "react-bootstrap";
import addDays from "date-fns/addDays";
import LightRain from "../svg/light rain.png";
import BrokenClouds from "../svg/Broken Clouds.png";
import BrokenCloudsNight from "../svg/Broken Clouds Night.png";
import Thunderstorm from "../svg/Thunderstorm.png";
import FewClouds from "../svg/Few Clouds.png";
import ClearSky from "../svg/Clear Sky.png";
import ClearSkyNight from "../svg/Clear Sky Night.png";
import Snow from "../svg/Snow.png";
import GenericRain from "../svg/Generic Rain.png";
import House from "../svg/House.png";

const Menu = function ({
  weatherData,
  forecast,
  city,
  currentDate,
  savedLocations,
  setCurrentCity,
  setAppSection
}) {
  const forecastOfNextDays = { ...forecast }; //ho dovuto creare una copia dell'oggetto, altrimenti eliminando una proprietà la eliminava anche dall'hook.
  delete forecastOfNextDays[currentDate.toDateString()];
  delete forecastOfNextDays[addDays(currentDate, 5).toDateString()]; //rimuovo l'ultimo giorno, per mostrare solo i primi 4.

  const chooseIcon = function (weather) {
    const main = weather.weather.main;
    const description = weather.weather.description;
    const timeOfDay = weather.sys.pod;
    switch (description.toLowerCase()) {
      case "broken clouds":
        return timeOfDay === "d" ? BrokenClouds : BrokenCloudsNight;
      case "light rain":
        return LightRain;
      case "shower rain":
        return LightRain;
      case "rain":
        return LightRain;
      case "overcast clouds":
        return FewClouds;
      case "clear sky":
        return timeOfDay === "d" ? ClearSky : ClearSkyNight;
      case "thunderstorm":
        return Thunderstorm;
      default:
        switch (main.toLowerCase()) {
          case "rain":
            return GenericRain;
          case "clouds":
            return BrokenClouds;
          case "snow":
            return Snow;
          case "mist":
            return ClearSky;
          case "thunderstorm":
            return Thunderstorm;
          default:
            break;
        }
        break;
    }
  };

  return (
    <div className="slide-left h-100 w-100 d-flex flex-column align-items-center py-5">
      <span>{city}</span>
      <span className="d-flex gap-3">
        <span>{"Max: " + Math.round(weatherData.main.temp_max) + "°"}</span>
        <span>{"Min: " + Math.round(weatherData.main.temp_min) + "°"}</span>
      </span>
      <div className="forecast-carousel-container w-100 pt-5">
        <h3 className="ps-2 pb-3">4-Days Forecast</h3>
        <div className="forecast-carousel d-flex gap-2 justify-content-center">
          {Object.keys(forecastOfNextDays).map((key, index) => {
            return (
              <div
                className="d-flex flex-column align-items-center justify-content-center gap-3"
                style={{
                  width: "5.125rem",
                  height: "10.75rem",
                  flexShrink: "0",
                  borderRadius: "3.125rem",
                  background:
                    "linear-gradient(180deg, #3E2D8F 0%, #9D52AC 100%)"
                }}
                key={index}
              >
                <span>
                  {Math.round(forecastOfNextDays[key][0].temperature) + "°C"}
                </span>
                <img
                  src={chooseIcon(forecastOfNextDays[key][0])}
                  alt=""
                  width={"55%"}
                  draggable={false}
                />
                <span>{key.split(" ")[0]}</span>
              </div>
            );
          })}
        </div>
        <div className="d-flex flex-column align-items-center pt-5">
          {Object.keys(savedLocations).length !== 0 && (
            <>
              <h4 className="ps-2">Luoghi che hai salvato:</h4>
              <div
                className="overflow-y-scroll d-flex flex-column align-items-center"
                style={{
                  width: "22rem",
                  maxHeight: "10.875rem",
                  borderRadius: "1.25rem",
                  background:
                    "linear-gradient(232deg, #3E2D8F 28.26%, #9D52AC 93.25%)",
                  boxShadow: "2px 2px 2px 2px rgba(80, 78, 78, 0.25)"
                }}
              >
                {Object.keys(savedLocations).map((locationName, index) => (
                  <span
                    role="button"
                    onClick={(e) => {
                      setCurrentCity(e.target.textContent);
                      setAppSection("Main");
                    }}
                  >
                    {locationName}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
