import axios from "axios";
import PropTypes from "prop-types";
import "./styles.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Credit() {
  const token = useSelector((state) => state.user.token);
  const creditInfo = useSelector((state) => state.credit.creditData);
  const navigate = useNavigate();
  const { slug } = useParams();

  const handleDelete = () => {
    axios
      .delete(
        `https://mypatrimonio-back.herokuapp.com/api/v1_0/credits/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert("credit supprimé");
        navigate(`/mes-biens/${slug}`);
      });
  };

  return (
    <div className="credit-content">
      <div className="credit">
        <h3 className="credit-title">credit en cours sur le bien</h3>
        <p className="credit-data">
          banque: <span>{creditInfo.bankName}</span>
        </p>
        <p className="credit-data">
          cout total: <span>{creditInfo.totalCost}</span> €
        </p>
        <p className="credit-data">
          durée du crédit restante: <span>{creditInfo.creditDuration}</span>{" "}
          mois
        </p>
        <p className="credit-data">
          taux d'emprunt: <span>{creditInfo.borrowingRate}</span> %
        </p>
        <p className="credit-data">
          taux d'assurance: <span>{creditInfo.insuranceRate}</span> %
        </p>
        <p className="credit-data">
          montant remboursé: <span>{creditInfo.amountReimbursed}</span> €
        </p>
      </div>
      <div>
        <Link to={`/mes-biens/${slug}/modifier-credit`}>
          <button className="button-34" type="button">
            modifier
          </button>
        </Link>
        <button className="button-34" type="button" onClick={handleDelete}>
          supprimer
        </button>
      </div>
    </div>
  );
}

export default Credit;
