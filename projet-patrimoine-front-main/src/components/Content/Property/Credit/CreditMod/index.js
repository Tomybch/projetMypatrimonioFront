import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

function CreditMod() {
  const { slug } = useParams();
  const token = useSelector((state) => state.user.token);
  const creditInfo = useSelector((state) => state.credit.creditData);
  const navigate = useNavigate();

  const inititalValues = {
    bankName: creditInfo.bankName,
    totalCost: creditInfo.totalCost,
    creditDuration: creditInfo.creditDuration,
    borrowingRate: creditInfo.borrowingRate,
    insuranceRate: creditInfo.insuranceRate,
    amountReimbursed: creditInfo.amountReimbursed,
  };

  const [formValues, setFormValues] = useState(inititalValues);
  const [formErrors, setFormErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.bankName) {
      errors.bankName = "Le nom de la banque est obligatoire";
    } else if (values.bankName.length > 128) {
      errors.bankName = "Le nom de la banque ne peut dépasser 128 caractères";
    }
    if (!values.totalCost) {
      errors.totalCost = "Le cout total est obligatoire";
    } else if (values.totalCost > 10000000) {
      errors.totalCost = "Le coup total ne peut dépasser 10.000.000 d'euros";
    }
    if (!values.creditDuration) {
      errors.creditDuration = "La durée du crédit est obligatoire";
    } else if (values.creditDuration > 500) {
      errors.creditDuration = "La durée du crédit ne peut dépasser 500 mois";
    }
    if (!values.borrowingRate) {
      errors.borrowingRate = "Le taux d'emprun est obligatoire";
    } else if (values.borrowingRate > 100) {
      errors.borrowingRate = "Le taux d'emprun ne peut dépasser 100%";
    }
    if (!values.insuranceRate) {
      errors.insuranceRate = "Le taux d'assurance est obligatoire";
    } else if (values.insuranceRate > 100) {
      errors.insuranceRate = "Le taux d'assurance ne peut dépasser 100%";
    }
    if (!values.amountReimbursed) {
      errors.amountReimbursed = "Le montant remboursé est obligatoire";
    } else if (values.amountReimbursed > 10000000) {
      errors.amountReimbursed =
        "Le montant remboursé ne peut dépasser 10.000.000 d'euros";
    }

    const isEmpty = Object.keys(errors).length === 0;

    if (isEmpty) {
      return true;
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    const data = {
      bankName: formValues.bankName,
      totalCost: parseInt(formValues.totalCost, 10),
      creditDuration: parseInt(formValues.creditDuration, 10),
      borrowingRate: parseInt(formValues.borrowingRate, 10),
      insuranceRate: parseInt(formValues.insuranceRate, 10),
      amountReimbursed: parseInt(formValues.amountReimbursed, 10),
    };

    if (
      data.bankName &&
      data.totalCost &&
      data.creditDuration &&
      data.borrowingRate &&
      data.insuranceRate &&
      data.amountReimbursed
    ) {
      axios
        .patch(
          `https://mypatrimonio-back.herokuapp.com/api/v1_0/credits/${slug}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          navigate(`/mes-biens/${slug}`);
        });
    }
  };

  return (
    <div>
      <h2 className="content-title">modification de credit</h2>

      <form onSubmit={handleSubmit} className="form">
        <p className="form-inputTitle">nom de la banque</p>
        <input
          className="form-input"
          type="text"
          name="bankName"
          onChange={handleChange}
          value={formValues.bankName}
          placeholder="cocobank"
        />
        <p className="form-error">{formErrors.bankName}</p>

        <p className="form-inputTitle">cout total</p>
        <input
          className="form-input"
          type="number"
          name="totalCost"
          onChange={handleChange}
          value={formValues.totalCost}
          placeholder="100000"
        />
        <p className="form-error">{formErrors.totalCost}</p>

        <p className="form-inputTitle">durée totale du credit</p>
        <input
          className="form-input"
          type="number"
          name="creditDuration"
          onChange={handleChange}
          value={formValues.creditDuration}
          placeholder="20"
        />
        <p className="form-error">{formErrors.creditDuration}</p>
        <p className="form-inputTitle">taux d'emprunt</p>
        <input
          className="form-input"
          type="number"
          name="borrowingRate"
          onChange={handleChange}
          value={formValues.borrowingRate}
          placeholder="1.7"
        />
        <p className="form-error">{formErrors.borrowingRate}</p>
        <p className="form-inputTitle">taux d'assurance</p>
        <input
          className="form-input"
          type="number"
          name="insuranceRate"
          onChange={handleChange}
          value={formValues.insuranceRate}
          placeholder="0.2"
        />
        <p className="form-error">{formErrors.insuranceRate}</p>
        <p className="form-inputTitle">montant remboursé</p>
        <input
          className="form-input"
          type="number"
          name="amountReimbursed"
          onChange={handleChange}
          value={formValues.amountReimbursed}
          placeholder="10000"
        />
        <p className="form-error">{formErrors.amountReimbursed}</p>
        <input type="submit" className="button-34" />
      </form>
    </div>
  );
}

export default CreditMod;
