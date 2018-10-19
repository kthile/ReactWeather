import React from "react";

const Form = props => {
  return (
    <div className="weather-form-container">
      <div className="__error">
        {props.form.errorForm ? <p>{props.form.errorForm}</p> : null}
        {props.form.errorData ? <p>{props.form.errorData}</p> : null}
      </div>

      <form onSubmit={props.getWeather}>
        <input
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          defaultValue=""
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          defaultValue="US"
        />
        <button className="fas fa-angle-double-right" />{" "}
      </form>
    </div>
  );
};
export default Form;
/*
 <input
          type="text"
          name="city"
          placeholder="City"
          defaultValue="Orlando"
        />

    */
