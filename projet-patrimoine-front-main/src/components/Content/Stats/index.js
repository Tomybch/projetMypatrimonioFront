// NPM
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Components
import Loading from "../Loading";

// Styles
import "./styles.scss";

// MAIN
function Stats() {
  const token = useSelector((state) => state.user.token);

  const [statistiques, setStatistiques] = useState([]);
  const [contentReady, setContentReady] = useState(false);
  useEffect(() => {
    // axios.defaults.headers.common.Authorization = `bearer ${token}`;
    axios
      .get(
        "https://mypatrimonio-back.herokuapp.com/api/v1_0/users/statistiques",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setStatistiques(res.data.properties);
        setContentReady(true);
      })
      .catch((error) => {});
  }, []);

  if (!contentReady) {
    return <Loading />;
  }

  let totalPurchasePrice = 0;
  let totalCredit = 0;
  let totalRent = 0;

  for (let i = 0; i < statistiques.length; i++) {
    totalPurchasePrice += statistiques[i].purchasePrice;
    {
      statistiques[i].credit &&
        (totalCredit += statistiques[i].credit.totalCost);
    }
    for (let j = 0; j < statistiques[i].tenant.length; j++) {
      totalRent += statistiques[i].tenant[j].rent;
    }
  }

  return (
    <div className="stats-content">
      <h2 className="content-title">Statistiques</h2>
      <div className="stats">
        <h3 className="stats-title">Montant total du patrimoine</h3>
        <p className="stats-data">{totalPurchasePrice}€</p>
        <h3 className="stats-title">Crédit total</h3>
        <p className="stats-data">{totalCredit}</p>
        <h3 className="stats-title">Rentabilité Brut</h3>
        <p className="stats-data"></p>
        <h3 className="stats-title">Rentabilité Net</h3>
        <p className="stats-data"></p>
        <h3 className="stats-title">Mensualités perçues</h3>
        <p className="stats-data">{totalRent}</p>
      </div>
    </div>
  );
}

export default Stats;
