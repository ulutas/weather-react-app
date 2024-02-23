import { useEffect, useState } from "react";
import axios from "axios";
import { useCity } from "../context/CityContext";

function Weather() {
  const { select } = useCity();
  const { weather, setWeather } = useCity();
  const [loading, setLoading] = useState(true);
  const api = process.env.REACT_APP_API_KEY;
  const options = {
    method: "GET",
    url: "https://api.collectapi.com/weather/getWeather",
    params: { "data.lang": "tr", "data.city": `${select.name}` },
    headers: {
      "content-type": "application/json",
      authorization: `apikey ${api}`,
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then((response) => {
        setWeather(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [select]);

  return (
    <>
      {loading && <div>Loading...</div>}
      {weather.length > 0 && (
        <div className="container text-center">
          <div className="row m-3">
            <div className="col"></div>
            <div className="col">
              <div id="card-1" className="card">
                <h5 className="card-title">Bugün</h5>
                <img src={weather[0].icon} className="card-img-top" />
                <div className="card-body">
                  <p className="card-text">
                    {weather[0].degree} °C
                    <br />
                    {weather[0].description.charAt(0).toUpperCase() +
                      weather[0].description.slice(1)}
                  </p>
                </div>
              </div>
            </div>
            <div className="col"></div>
          </div>
          <div className="row">
            {weather.slice(1).map((item, index) => {
              return (
                <div className="col" key={index}>
                  <div className="card">
                    <h5 className="card-title">{item.day}</h5>
                    <img src={item.icon} className="card-img-top" />
                    <div className="card-body">
                      <p className="card-text">
                        {item.degree} °C
                        <br />
                        {item.description.charAt(0).toUpperCase() +
                          item.description.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Weather;
