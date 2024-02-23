import { createContext, useContext, useState } from "react";

const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [city, setCity] = useState([]);
  const [select, setSelect] = useState({ name: "Adana" });
  const [weather, setWeather] = useState([]);
  const values = {
    city,
    setCity,
    select,
    setSelect,
    weather,
    setWeather,
  };
  return <CityContext.Provider value={values}>{children}</CityContext.Provider>;
};

export const useCity = () => useContext(CityContext);
