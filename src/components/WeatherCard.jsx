import { Card, Button, Row, Col } from "react-bootstrap";
import getMonth from "date-fns/getMonth";
import getDaysInMonth from "date-fns/getDaysInMonth";
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
import { useEffect, useState } from "react";

const WeatherCard = function ({
  forecast,
  currentDate,
  appSection,
  setAppSection,
  setHasChangedPage,
  hasChangedPage
}) {
  const forecastOfToday = forecast[currentDate.toDateString()];
  console.log("i forecast per il giorno sono:", forecastOfToday);
  console.log("la data è:", currentDate);
  const foreCastToShow = forecastOfToday.slice(0, 4);
  console.log("forecastToSHow", foreCastToShow);

  const month = currentDate.toLocaleString("en-US", {
    month: "long"
  });

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

  // useEffect(() => {
  //   if (appSection === "Menu") {
  //     setTimeout(() => {
  //       setHasChangedPage(true);
  //     }, 1000);
  //   } else {
  //     setHasChangedPage(false);
  //   }
  // }, [appSection]);

  // const handlePageChanging = function () {
  //   //se è stato cliccato il pulsante che scatena il cambio di pagina ma non è ancora passato il tempo necessario per l'animazione, ritorna fade-out, altrimenti d-none
  //   if (hasChangedPage && appSection !== "Main") {
  //     return "d-none";
  //   } else if (appSection === "Menu") {
  //     return "fade-out";
  //   } else {
  //     return "";
  //   }
  // };

  // const handleCardExpand = function () {
  //   if (appSection === "Menu") {
  //     return "expand";
  //   } else {
  //     return "";
  //   }
  // };

  const day = currentDate.getDate();
  return (
    <div className={"text-center "}>
      <img
        src={House}
        alt=""
        draggable={false}
        // className={handlePageChanging()}
      />
      <Card
        style={{ width: "100%" }}
        className="forecast-card text-white rounded-4 border-top-0 "
      >
        <Card.Header
          className="d-flex justify-content-between border-1 py-3 px-4"
          style={{ borderColor: "#8e78c8" }}
        >
          <span>Today</span>
          <span>{`${month}, ${day}`}</span>
        </Card.Header>
        <Card.Body>
          <Row xs={foreCastToShow.length}>
            {foreCastToShow.map((hourForecast, index) => (
              <Col
                key={index}
                className="text-center d-flex flex-column justify-content-between gap-2 align-items-center px-0"
              >
                <p className="m-0">
                  {Math.round(hourForecast.temperature) + "°C"}
                </p>
                <img
                  src={chooseIcon(hourForecast)}
                  alt=""
                  width={"55%"}
                  draggable={false}
                />
                <p className="m-0">{hourForecast.hour + ":00"}</p>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

// width 2522
// height 1679

export default WeatherCard;
