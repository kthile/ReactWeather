import React, { Component } from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";



class App extends Component {
  //default state
  state = {};

  getWeather = async e => {
    //prevent full page refresh
    e.preventDefault();

    //grab data from form input fields
    const zipCode = e.target.elements.zipCode.value;
    //const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    //call to the api
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${zipCode},${country}&appid=${API_KEY}&units=imperial`
    );

    //5d FORECAST API_CALL: api.openweathermap.org/data/2.5/forecast?q={city},{country}

    //convert data to json format
    const api_data = await api_call.json();

    //set state to api_data values if condition met, otherwise fail and render approrpiate error
    if (zipCode && country && !api_data.message && !api_data.cod !== 404) {
      this.setState(() => ({
        temp: api_data.main.temp,
        tempHigh: api_data.main.temp_max,
        tempLow: api_data.main.temp_min,
        city: api_data.name,
        country: api_data.sys.country,
        humidity: api_data.main.humidity,
        description: api_data.weather[0].description,
        errorCode: api_data.cod,
        errorForm: undefined,
        errorData: undefined,
        showCard: true,
        weatherCode: api_data.weather[0].id,
        iconCode: undefined,
        skyconDesc: "CLEAR_NIGHT", //Set the default value to avoid console error
        windDirection: api_data.wind.deg,
        windSpeed: api_data.wind.speed
      }));
      /*SKYCON IDS
        'CLEAR_DAY',
        'CLEAR_NIGHT',
        'PARTLY_CLOUDY_DAY',
        'PARTLY_CLOUDY_NIGHT',
        'CLOUDY',
        'RAIN',
        'SLEET',
        'SNOW',
        'WIND',
        'FOG'
      */
      // See https://openweathermap.org/weather-conditions for weatherCode - iconCode relationship
      if (this.state.weatherCode >= 200 && this.state.weatherCode <= 232) {
        this.setState(() => ({
          iconCode: "11d", //Thunderstorms
          skyconDesc: "RAIN"
        }));
      } else if (
        this.state.weatherCode >= 300 &&
        this.state.weatherCode <= 321
      ) {
        this.setState(() => ({
          iconCode: "09d", //Drizzle
          skyconDesc: "RAIN"
        }));
      } else if (
        this.state.weatherCode >= 500 &&
        this.state.weatherCode <= 504
      ) {
        this.setState(() => ({
          iconCode: "10d", //Light - Heavy normal rain
          skyconDesc: "RAIN"
        }));
      } else if (this.state.weatherCode === 511) {
        this.setState(() => ({
          iconCode: "13d", //Snow or Freezing rain
          skyconDesc: "SLEET"
        }));
      } else if (
        this.state.weatherCode >= 520 &&
        this.state.weatherCode <= 531
      ) {
        this.setState(() => ({
          iconCode: "09d", //Light - Heavy shower Rain
          skyconDesc: "RAIN"
        }));
      } else if (
        this.state.weatherCode >= 600 &&
        this.state.weatherCode <= 622
      ) {
        this.setState(() => ({
          iconCode: "13d", //Snow or Freezing Rain
          skyconDesc: "SLEET"
        }));
      } else if (
        this.state.weatherCode >= 701 &&
        this.state.weatherCode <= 781
      ) {
        this.setState(() => ({
          iconCode: "50d", //Atmosphere, windy
          skyconDesc: "FOG"
        }));
      } else if (this.state.weatherCode === 800) {
        this.setState(() => ({
          iconCode: "01d", //Clear Sky
          skyconDesc: "CLEAR_DAY"
        }));
      } else if (this.state.weatherCode === 801) {
        this.setState(() => ({
          iconCode: "02d", //Few Clouds
          skyconDesc: "PARTLY_CLOUDY_DAY"
        }));
      } else if (this.state.weatherCode === 802) {
        this.setState(() => ({
          iconCode: "03d", //Scattered Clouds
          skyconDesc: "PARTLY_CLOUDY_DAY"
        }));
      } else if (
        this.state.weatherCode >= 803 &&
        this.state.weatherCode <= 804
      ) {
        this.setState(() => ({
          iconCode: "04d", //Broken Clouds & Overcast Clouds
          skyconDesc: "PARTLY_CLOUDY_DAY"
        }));
      }
    } else {
      // Failed form input or form data check
      if (!zipCode || !country) {
        this.setState(() => ({
          errorForm: "Fill out both fields"
        }));
      } else {
        this.setState(() => ({
          errorData: "No data for this location"
        }));
      }
    }
    console.log(api_data);
    console.log(this.state.iconCode);
  };

  render() {
    return (
      <div>
        <div className="main-container">
          <Titles titles={this.state} />
          <Form getWeather={this.getWeather} form={this.state} />
          <Weather weather={this.state} />
        </div>
      </div>
    );
  }
}

export default App;
