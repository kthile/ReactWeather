import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

const Weather = props => {
  return (
    <div className="weather-container">
      <div
        className={props.weather.showCard === true ? "weather-card" : "none"}
      >
        <div className="weather-icon">
          <ReactAnimatedWeather
            color="white"
            icon={props.weather.skyconDesc}
            animate={true}
            size={300}
          />
          <div className="__highlow">
            <p>
              H: {props.weather.tempHigh}
              &deg;{" "}
            </p>
            <p>
              L: {props.weather.tempLow}
              &deg;
            </p>
          </div>
        </div>

        {props.weather.city &&
          props.weather.country && (
            <span className="text-center">
              {props.weather.city}
            </span>
          )}
        {props.weather.temp && (
          <span className="text-center">
            {" "}
            {props.weather.temp}
            &deg;F
          </span>
        )}
        {props.weather.humidity && (
          <span>
            <span>Humidity:</span> {props.weather.humidity}%
          </span>
        )}
        {props.weather.description && (
          <span className="capitalize">
            <span>Condition:</span> {props.weather.description}
          </span>
        )}
        {props.weather.windSpeed && (
          <span>
            <span>Wind Speed:</span>
            {props.weather.windSpeed}
            mph
          </span>
        )}
        {props.weather.windDirection && (
          <span>
            <span>Wind Direction:</span> {props.weather.windDirection}
            &deg;
          </span>
        )}
      </div>
    </div>
  );
};

export default Weather;

/* OPENWEATHERMAP ICONS - unused due to extreme ugliness
 <img
          className="weather-icon"
          src={
            props.weather.iconCode
              ? `http://openweathermap.org/img/w/${props.weather.iconCode}.png`
              : null
          }
        />
*/
