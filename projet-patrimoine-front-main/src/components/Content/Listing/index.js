// NPM
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Components
// import { setPropertiesList } from "src/actions/properties";
import PropertyCard from "./PropertyCard";
import Loading from "../Loading";
import { Link } from "react-router-dom";

// Styles
import "./styles.scss";

// Main

function Listing() {
  // const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const [properties, setPropertiesList] = useState([]);
  const [contentReady, setContentReady] = useState(false);
  useEffect(() => {
    // axios.defaults.headers.common.Authorization = `bearer ${token}`;
    axios
      .get(
        "https://mypatrimonio-back.herokuapp.com/api/v1_0/users/properties",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      // .post(`http://localhost:8000/api/login_check`, data, {
      //   headers: {},
      // })
      .then((res) => {
        setPropertiesList(res.data.properties);
        setContentReady(true);
      })
      .catch((error) => {});
  }, [contentReady]);

  // const properties = useSelector((state) => state.properties.list);
  // const loading = useSelector((state) => state.properties.loading);
  if (!contentReady) {
    return <Loading />;
  }

  return (
    <div className="listing-content">
      <h2 className="content-title">Mes biens</h2>
      {properties && (
        <div className="listing">
          {properties.length === 0 && (
            <Link to={`/ajout-de-bien`}>
              <button className="button-34" type="button">
                <p>ajouter votre premier bien</p>
              </button>
            </Link>
          )}
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Listing;
