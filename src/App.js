import React, { useEffect, useState } from "react";
import "./App.css";
import cloudy from "./assets/videos/cloudy.mp4";
import Loading from "./components/Loading";

const API_KEY = "959e7353426a5493d523123e72c43fa6";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=riyadh&appid=${API_KEY}`;
    setLoading(true);
    const getData = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setData(data);
      setLoading(false);
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
    setLoading(true);

    const res = await fetch(url);
    const data = await res.json();
    if (data.cod === "404" || location === "") {
      setError(true);
      setLoading(false);
    } else {
      setError(false);
      setData(data);
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <video src={cloudy} autoPlay loop muted />
      {data && (
        <div className="app__container">
          <form
            className={
              error
                ? `app__container-input input-error`
                : `app__container-input`
            }
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search for a city.."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={error ? `input-error` : `none-error`}
            />
            <button>go</button>
          </form>
          {error && <span>wrong city/country name..!</span>}
          {!loading ? (
            <>
              <div className="app__container-info">
                <div className="app__container-info-city">
                  <p>
                    {data.name}, <span>{data.sys?.country}</span>
                  </p>
                </div>
                <div className="app__container-info-temp">
                  <h1 className="temp">{data.main?.temp.toFixed(1)}°F</h1>
                </div>
                <div className="app__container-info-weather">
                  <p>{data.weather[0].main}</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                    alt="weather-icon"
                  />
                </div>
              </div>
              <div className="app__container-bot">
                <div className="app__container-bot-item">
                  <p className="bold">{data.main?.humidity} %</p>
                  <p>humidity</p>
                </div>
                <div className="app__container-bot-item">
                  <p className="bold">{data.wind.speed} MPH</p>
                  <p>wind speed</p>
                </div>
                <div className="app__container-bot-item">
                  <p className="bold">{data.main?.feels_like}°F</p>
                  <p>feels like</p>
                </div>
              </div>
            </>
          ) : (
            <Loading />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
