/* eslint-disable jsx-a11y/label-has-associated-control */
// YARN
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Components
import { submitRegisterForm } from "src/actions/users";

// Styles
import "./styles.scss";

// MAIN
function Subscribe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inititalValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;

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
    if (!values.password) {
      errors.password = "Le mot de passe est obligatoire";
    } else if (!regexPassword.test(values.password)) {
      errors.password =
        "Le mot de passe doit contenir 8 caractères, une minuscule, une majuscule et un chiffre";
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
        password: formValues.password,
      };

      dispatch(submitRegisterForm(data));

      axios
        .post("https://mypatrimonio-back.herokuapp.com/api/v1_0/users/", data, {
          headers: { "Content-Type": "application/json" },
        })
        .catch((error) => {})
        .then((res) => {
          navigate("/");
        });
    }
  };

  return (
    <div>
      <h2 className="content-title">Inscription</h2>

      <form onSubmit={handleSubmit} className="form">
        <p className="form-inputTitle">Prénom</p>
        <input
          className="form-input"
          type="text"
          name="firstName"
          onChange={handleChange}
          value={formValues.firstName}
        />
        <p className="form-error">{formErrors.firstName}</p>

        <p className="form-inputTitle">Nom de famille</p>
        <input
          className="form-input"
          type="text"
          name="lastName"
          onChange={handleChange}
          value={formValues.lastName}
        />
        <p className="form-error">{formErrors.lastName}</p>

        <p className="form-inputTitle">Adresse mail</p>
        <input
          className="form-input"
          type="text"
          name="email"
          onChange={handleChange}
          value={formValues.email}
        />
        <p className="form-error">{formErrors.email}</p>

        <p className="form-inputTitle">Mot de passe</p>
        <input
          className="form-input"
          type="text"
          name="password"
          onChange={handleChange}
          value={formValues.password}
        />
        <p className="form-error">{formErrors.password}</p>
        <input type="submit" className="form-submitButton" />
      </form>
    </div>
  );
}

export default Subscribe;
