// NPM
import { Link, NavLink } from "react-router-dom";

// Styles
import "./styles.scss";
import logo from "src/assets/img/logo.jpg";

// MAIN
function Title() {
  return (
    <div className="Title">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
    </div>
  );
}

export default Title;
