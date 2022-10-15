// YARN
import { Link } from "react-router-dom";

// Styles
import "./styles.scss";

function Homepage() {
  return (
    <div className="homepage-content">
      <h2 className="homepage-title">
        Bienvenue sur <strong>MyPatrimonio</strong>
      </h2>
      <div className="homepage-feature">
        <p className="homepage-content homepage-introduction">
          Vous souhaitez pouvoir gérer votre patrimoine immobilier facilement
          depuis votre téléphone ou votre ordinateur n’importe quand ? Grâce à
          MyPatrimonio, réalisez des simulations pour vos futurs
          investissements, calculez vos rentabilités et joignez vos locataires !{" "}
          <br />
          L’immobilier est un marché en pleine expansion, et l’ère du numérique
          l’a rendu encore plus rapide et dynamique. C’est pourquoi nous
          répondons à ce besoin grâce à notre application de gestion de
          patrimoine destinée aux propriétaires avertis.
        </p>
      </div>
      <div className="homepage-feature">
        <p className="homepage-content homepage-feature-text">
          Vous pouvez aussi effectuer un calcul de rentabilité de votre bien
          gratuitement ci-dessous :
        </p>

        <Link to="/simulation-rentabilite">
          <button className="button-34" type="button">
            Je simule ma rentabilité
          </button>
        </Link>
      </div>
      <div className="homepage-feature">
        <p className="homepage-content homepage-feature-text">
          Par ailleurs, si besoin est vous pouvez aussi faire une simulation de
          cout d'un pret
        </p>

        <Link to="/simulation-pret">
          <button className="button-34" type="button">
            Je simule mon prêt
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
