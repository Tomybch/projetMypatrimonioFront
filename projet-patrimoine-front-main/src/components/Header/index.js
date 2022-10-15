// Components
import Title from "./Title";
import Navbar from "./Navbar";
import Account from "./Account";

// Styles
import "./styles.scss";

// MAIN
function Header() {
  return (
    <div className="Header">
      <Navbar />

      <Title />

      <Account />
    </div>
  );
}

export default Header;
