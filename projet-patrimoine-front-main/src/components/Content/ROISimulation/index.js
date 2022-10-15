import React, { useState } from "react";

// ROI return On Invest
function ROISimulation() {
  const [prix, setPrix] = useState(130000);
  const [loyer, setLoyer] = useState(700);
  const [charges, setCharges] = useState(0);
  const [foncier, setFoncier] = useState(0);
  const [ROI, setROI] = useState(calcROI);
  const [ROInet, setROInet] = useState(calcROInet);
  function calcROI() {
    return ((loyer * 12) / prix) * 100;
  }
  function calcROInet() {
    const loyerAnnuel = parseInt(loyer * 12, 10);
    const chargestotales = parseInt(charges, 10) + parseInt(foncier, 10);
    const calc = parseInt(loyerAnnuel, 10) - chargestotales;
    const result = calc / prix;
    return parseInt(result * 100, 10);
  }
  function handleChange() {
    setROI(calcROI().toFixed(2));
    setROInet(calcROInet().toFixed(2));
  }

  return (
    <div className="profitability-content">
      <h2 className="content-title">simulation de rentabilité</h2>
      <div className="simulation">
        <h3 className="simulation-type">Rentabilité Brut</h3>
        <p className="simulation-title">prix d'achat</p>
        <input
          className="simulation-input"
          type="range"
          min="1"
          max="1000000"
          value={prix}
          onChange={(e) => {
            setPrix(e.target.value);
            handleChange(e);
          }}
          step="5000"
        />
        <input
          className="simulation-input"
          type="text"
          value={prix}
          onChange={(e) => {
            setPrix(e.target.value);
            // handleChange(e);
          }}
        />
        <p className="simulation-title">Montant Loyer</p>
        <input
          className="simulation-input"
          type="range"
          min="1"
          max="5000"
          value={loyer}
          onChange={(e) => {
            setLoyer(e.target.value);
            handleChange(e);
          }}
          step="50"
        />
        <input
          className="simulation-input"
          type="text"
          value={loyer}
          onChange={(e) => {
            setLoyer(e.target.value);
            // handleChange(e);
          }}
        />
        <p className="simulation-result">rentabilité brut : <span>{ROI} %</span></p>
      </div>

      
      <div className="simulation">
        <h3 className="simulation-type">Rentabilité Net</h3>
        <p className="simulation-title">Montant des charges annuelles estimées</p>
        <input
          className="simulation-input"
          type="range"
          min="1"
          max="5000"
          value={charges}
          onChange={(e) => {
            setCharges(e.target.value);
            handleChange(e);
          }}
          step="50"
        />
        <input
          className="simulation-input"
          type="text"
          value={charges}
          onChange={(e) => {
            setCharges(e.target.value);
            // handleChange(e);
          }}
        />
        <p className="simulation-title">Montant des impots fonciers</p>
        <input
          className="simulation-input"
          type="range"
          min="1"
          max="5000"
          value={foncier}
          onChange={(e) => {
            setFoncier(e.target.value);
            handleChange(e);
          }}
          step="50"
        />

        <input
          className="simulation-input"
          type="text"
          value={foncier}
          onChange={(e) => {
            setFoncier(e.target.value);
            // handleChange(e);
          }}
        />
        <p className="simulation-result">rentabilité net : <span>{ROInet} %</span></p>
      </div>
    </div>
  );
}

export default ROISimulation;
