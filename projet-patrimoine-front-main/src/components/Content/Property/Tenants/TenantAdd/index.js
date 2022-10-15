// NPM
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

// Style
import "./styles.scss";

// Main
function AddTenantForm() {
  const token = useSelector((state) => state.user.token);
  const { slug } = useParams();
  const navigate = useNavigate();

  const inititalValues = {
    firstName: "",
    lastName: "",
    email: "",
    rent: "",
    phoneNumber: "",
    entry_date: "",
    exit_date: "",
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
    if (!values.firstName) {
      errors.firstName = "le prénom est obligatoire";
    } else if (values.firstName.length < 2) {
      errors.firstName = "Le prénom doit contenir 2 caractères minimum";
    }

    if (!values.lastName) {
      errors.lastName = "Le nom de famille est obligatoire";
    } else if (values.lastName.length < 2) {
      errors.lastName = "Le nom de famille doit contenir 2 caractères minimum";
    }

    if (!values.email) {
      errors.email = "L'email est obligatoire";
    } else if (values.email.length < 2) {
      errors.email = "L'email doit contenir 2 caractères minimum";
    } else if (values.email.length > 50) {
      errors.email = "L'email doit contenir 50 caractères maximum";
    }

    if (!values.rent) {
      errors.rent = "Le loyer est obligatoire";
    } else if (values.rent > 100000) {
      errors.rent = "Le loyer ne peut dépasser 100.000 euros";
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = "Le numéro de téléphone est obligatoire";
    } else if (values.phoneNumber.length !== 10) {
      errors.phoneNumber = "Veuillez saisir un numéro de téléphone valide";
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

    if (validate(formValues) === true) {
      const data = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        rent: parseInt(formValues.rent, 10),
        phoneNumber: formValues.phoneNumber,
        // entry_date: formValues.entry_date,
        // exit_date: formValues.exit_date,
      };

      axios
        .post(
          `https://mypatrimonio-back.herokuapp.com/api/v1_0/tenants/${slug}`,
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
        })
        .catch((err) => {});
    }
  };

  return (
    <div>
      <h2 className="content-title">ajout d'un locataire</h2>

      <form onSubmit={handleSubmit} className="form">
        <p className="form-inputTitle">Prénom</p>
        <input
          className="form-input"
          type="text"
          placeholder="Prénom"
          name="firstName"
          onChange={handleChange}
          value={formValues.firstName}
        />
        <p className="form-error">{formErrors.firstName}</p>
        <p className="form-inputTitle">Nom de famille</p>
        <input
          className="form-input"
          type="text"
          placeholder="Nom"
          name="lastName"
          onChange={handleChange}
          value={formValues.lastName}
        />
        <p className="form-error">{formErrors.lastName}</p>
        <p className="form-inputTitle">Adresse mail</p>
        <input
          className="form-input"
          type="text"
          placeholder="Exemple@mypatrmonio.fr"
          name="email"
          onChange={handleChange}
          value={formValues.email}
        />
        <p className="form-error">{formErrors.email}</p>
        <p className="form-inputTitle">Numéro de téléphone</p>
        <input
          className="form-input"
          type="text"
          placeholder="ex: 00 00 00 00 00"
          name="phoneNumber"
          onChange={handleChange}
          value={formValues.phoneNumber}
        />
        <p className="form-error">{formErrors.phoneNumber}</p>
        <p className="form-inputTitle">Loyer payé</p>
        <input
          className="form-input"
          type="number"
          placeholder="Loyer payé"
          name="rent"
          onChange={handleChange}
          value={formValues.rent}
        />
        <p className="form-error">{formErrors.rent}</p>
        <p className="form-inputTitle">Date de debut</p>
        <input
          className="form-input"
          type="date"
          placeholder="date d'entrée"
          name="entry_date"
          onChange={handleChange}
          value={formValues.entry_date}
        />
        <p className="form-error">{formErrors.entry_date}</p>
        <p className="form-inputTitle">Date de fin</p>
        <input
          className="form-input"
          type="date"
          placeholder="date de sortie"
          name="exit_date"
          onChange={handleChange}
          value={formValues.exit_date}
        />
        <p className="form-error">{formErrors.exit_date}</p>

        <input type="submit" className="button-34" />
      </form>
    </div>
  );
}
export default AddTenantForm;
