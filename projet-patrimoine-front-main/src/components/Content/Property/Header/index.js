// == Import : npm
import PropTypes from "prop-types";

// == Import : local
import "./styles.scss";

// == Composant
const Header = ({ title, picture }) => (
  <header className="presentation">
    <img src={picture} alt={title} className="presentation-image" />
    <div className="presentation-content">
      <h1 className="presentation-title">{title}</h1>
    </div>
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  picture: PropTypes.string,
};

// == Export
export default Header;
