import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { navbarVisibility } from "src/actions";
import { MdMiscellaneousServices } from "react-icons/md";
import { ImStatsBars } from "react-icons/im";
import { BsCardList } from "react-icons/bs";
import { HiOutlinePlus } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
import { GiReceiveMoney } from "react-icons/gi";

import "./Navbar.scss";

function Navbar() {
  const dispatch = useDispatch();
  const isNavbarVisible = useSelector((state) => state.main.navbarVisibility);
  const isLogged = useSelector((state) => state.user.islogged);

  return (
    <div className="Sidebar">
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <AiOutlineMenu onClick={() => dispatch(navbarVisibility())} />
        </Link>
      </div>

      <nav className={isNavbarVisible ? "nav-menu active" : "nav-menu"}>
        <ul
          className="nav-menu-items"
          onClick={() => dispatch(navbarVisibility())}
        >
          <li className="navbar-toggle">
            <NavLink to="#" className="menu-bars">
              <AiOutlineClose />
            </NavLink>
          </li>

          <li key="Accueil" className="nav-text">
            <NavLink to="/">
              <AiFillHome />
              <span>Accueil</span>
            </NavLink>
          </li>

          {isLogged && (
            <>
              <li key="Paramètres" className="nav-text">
                <NavLink to="/parametres">
                  <MdMiscellaneousServices />
                  <span>Paramètres</span>
                </NavLink>
              </li>
              <li key="Statistiques de vos biens" className="nav-text">
                <NavLink to="/statistiques">
                  <ImStatsBars />
                  <span>Statistiques</span>
                </NavLink>
              </li>

              <li key="Liste des biens" className="nav-text">
                <NavLink to="/mes-biens">
                  <BsCardList />
                  <span>Liste des biens</span>
                </NavLink>
              </li>

              <li key="Ajout d'un bien" className="nav-text">
                <NavLink to="/ajout-de-bien">
                  <HiOutlinePlus />
                  <span>Ajout d'un bien</span>
                </NavLink>
              </li>
            </>
          )}

          <li key="Simulation de rentabilité" className="nav-text">
            <NavLink to="/simulation-rentabilite">
              <GiReceiveMoney />
              <span>Simulation de rentabilité</span>
            </NavLink>
          </li>

          <li key="Simulation de credit" className="nav-text">
            <NavLink to="/simulation-credit">
              <GiReceiveMoney />
              <span>Simulation de crédit</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
