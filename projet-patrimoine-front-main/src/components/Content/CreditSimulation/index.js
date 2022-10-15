/* eslint-disable quotes */
import React, { useState } from "react";

// ROI return On Invest
function CreditSimulation() {
  const [montantPret, setMontantduPret] = useState(100000);
  const [duree, setDuree] = useState(20);
  const [taux, setTaux] = useState(2);
  const [mensualité, setMensualité] = useState(505);
  const [coutTotal, setCoutTotal] = useState(21412);

  const handleChange = () => {
    const c0 = parseInt(montantPret, 10);
    const n = parseInt(duree * 12, 10);
    const t = taux / 1200;
    const coef = Math.pow(1 + t, n);
    const m = (c0 * t * coef) / (coef - 1);
    setMensualité(Math.floor(m));
    setCoutTotal(Math.floor(m * n - c0));
  };

  return (
    <div>
      <h2 className="content-title">simulation de Credit</h2>
      <div className="simulation">
        <p className="simulation-title">Montant du pret</p>

        <input
          className="simulation-input"
          type="number"
          value={montantPret}
          onChange={(e) => {
            setMontantduPret(e.target.value);
          }}
        />

        <p className="simulation-title">Durée du pret</p>

        <input
          className="simulation-input"
          type="number"
          value={duree}
          onChange={(e) => {
            setDuree(e.target.value);
          }}
        />

        <p className="simulation-title">Taux du pret</p>

        <input
          className="simulation-input"
          type="number"
          value={taux}
          onChange={(e) => {
            setTaux(e.target.value);
          }}
        />
        <button type="button" onClick={handleChange} className="button-34">
          valider
        </button>
        <p className="simulation-result">
          votre mensualité sera de <span>{mensualité} €</span>
        </p>
        <p className="simulation-result">
          dont <span>{coutTotal} €</span> d'interets{" "}
        </p>
      </div>
    </div>
  );
}

export default CreditSimulation;
