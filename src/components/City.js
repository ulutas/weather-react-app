import { useEffect } from "react";
import axios from "axios";
import { useCity } from "../context/CityContext";

function City() {
  const { city, setCity } = useCity();
  const { select, setSelect } = useCity();

  useEffect(() => {
    axios("https://turkiyeapi.dev/api/v1/provinces?fields=name")
      .then((res) => setCity(res.data.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-sm-11">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {select.name}
            </button>
            <ul className="dropdown-menu dropdown-menu-dark">
              {city.map((c, i) => (
                <li
                  className="dropdown-item"
                  key={i}
                  value={c}
                  onClick={() => setSelect(c)}
                >
                  {c.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-sm-1"></div>
      </div>
    </div>
  );
}

export default City;
