// NPM
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

// Data
import img2 from "src/assets/images/champsElysees.svg";

// Styles
import "./styles.scss";

// Main

function PropertyCard({ adress, title, type, purchasePrice, picture, slug }) {
  return (
    <article className="card">
      <img className="card-img" src={picture} alt={title} />
      <div className="card-content">
        <h1 className="card-title">{title}</h1>
        <p className="card-desc">acquis pour <span>{purchasePrice}</span> €</p>
        <p className="card-address">{adress}</p>
        <p>{type}</p>
        <Link to={`/mes-biens/${slug}`} className="card-link">
          Voir les détails du bien
        </Link>
      </div>
    </article>
  );
}

PropertyCard.propTypes = {
  title: PropTypes.string.isRequired,
  adress: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  purchasePrice: PropTypes.number.isRequired,
};

export default PropertyCard;
