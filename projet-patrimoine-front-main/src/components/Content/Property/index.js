import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

// Import composants
import Loading from "../Loading";
import Header from "./Header";
import TenantsList from "./TenantsList";

import { setTenantsData } from "src/actions/tenants";

// Style
import "./styles.scss";
import Credit from "./Credit";
import { setCreditData } from "src/actions/credit";

function Property() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { slug } = useParams();

  const token = useSelector((state) => state.user.token);

  const [property, setProperty] = useState([]);
  const [credit, setCredit] = useState();
  const [contentReady, setContentReady] = useState(false);
  useEffect(() => {
    axios
      .get(`https://mypatrimonio-back.herokuapp.com/api/v1_0/users/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        setProperty(res.data);
        setCredit(res.data.credit);
        setContentReady(true);
        dispatch(setTenantsData(res.data.tenant));
        dispatch(setCreditData(res.data.credit));
      })
      .catch((error) => {});
  }, [contentReady]);

  if (!contentReady) {
    return <Loading />;
  }

  if (!property) {
    return <Navigate to="/404" replace />;
  }

  const HandleDelete = () => {
    axios
      .delete(
        `https://mypatrimonio-back.herokuapp.com/api/v1_0/properties/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert("Propriété supprimée");
      });
    navigate("/mes-biens");
  };

  return (
    <div className="property-content">
      <div className="property">
        <img
          className="property-img"
          src={property.picture}
          alt={property.title}
        />
        <Header title={property.title} />
        <p className="property-data">Adresse :{property.adress}</p>
        <p className="property-data">
          Prix d'acquisition : {property.purchasePrice} €
        </p>
        <p className="property-data">Type :{property.type}</p>
        <div className="property-details">
          <p className="details-tenants">Locataires :</p>
          {property.tenant.map((tenant) => (
            <TenantsList key={tenant.id} {...tenant} propertyslug={slug} />
          ))}
          <Link to={`/${slug}/ajout-locataire`}>
            <button className="button-34" type="button">
              Ajout locataire
            </button>
          </Link>
        </div>

        {credit && <Credit key={credit.id} {...credit} />}
        {!credit && (
          <Link to={`/mes-biens/${slug}/ajout-credit`}>
            <button className="button-34" type="button">
              Ajouter un credit
            </button>
          </Link>
        )}

        <button
          type="button"
          onClick={HandleDelete}
          className="details-deleteButton"
        >
          Supprimer
        </button>
        <Link to={`/modifier-mon-bien/${slug}`}>
          <button type="button" className="details-editButton">
            Modifier
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Property;
