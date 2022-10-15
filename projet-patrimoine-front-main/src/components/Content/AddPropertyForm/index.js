/* eslint-disable quotes */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

function AddPropertyForm() {
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const inititalValues = {
    title: "",
    type: "",
    purchasePrice: "",
    adress: "",
    picture: "",
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
    if (!values.title) {
      errors.title = "le titre est obligatoire";
    } else if (values.title.length < 5) {
      errors.title = "Le titre doit contenir 5 caractères minimum";
    } else if (values.title.length > 25) {
      errors.title = "Le titre ne doit pas dépasser 25 caractères";
    }
    if (!values.type) {
      errors.type = "le type de bien est obligatoire";
    } else if (values.type.length < 2) {
      errors.type = "Le type doit contenir 2 caractères minimum";
    } else if (values.type.length > 25) {
      errors.type = "Le type de doit pas dépasser 25 carractères";
    }
    if (!values.purchasePrice) {
      errors.purchasePrice = "le prix est obligatoire";
    } else if (values.purchasePrice > 999999999) {
      errors.purchasePrice = "MyPatrimonio ne gère pas ce genre de propriétés";
    }
    if (!values.adress) {
      errors.adress = "l'adresse est obligatoire";
    } else if (values.adress.length < 5) {
      errors.adress = "L'adresse doit contenir 5 caractères minimum";
    } else if (values.adress.length > 255) {
      errors.adress = "L'adresse ne doit pas dépasser 255 caractères";
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
        title: formValues.title,
        type: formValues.type,
        purchasePrice: parseInt(formValues.purchasePrice, 10),
        adress: formValues.adress,
        picture: formValues.picture,
      };

      axios
        .post(
          `https://mypatrimonio-back.herokuapp.com/api/v1_0/properties/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          navigate("/mes-biens");
        });
    }
  };

  return (
    <div>
      <h2 className="content-title">ajouter une propriété</h2>

      <form onSubmit={handleSubmit} className="form">
        <p className="form-inputTitle">Nom de votre bien</p>
        <input
          className="form-input"
          placeholder="ma petite maison de campagne"
          type="text"
          name="title"
          onChange={handleChange}
          value={formValues.title}
        />
        <p className="form-error">{formErrors.title}</p>

        <p className="form-inputTitle">Type de bien</p>
        <input
          className="form-input"
          placeholder="maison, appartement, cabane"
          type="text"
          name="type"
          onChange={handleChange}
          value={formValues.type}
        />
        <p className="form-error">{formErrors.type}</p>

        <p className="form-inputTitle">Prix d'achat du bien</p>
        <input
          className="form-input"
          placeholder="1000"
          type="number"
          name="purchasePrice"
          onChange={handleChange}
          value={formValues.purchasePrice}
        />
        <p className="form-error">{formErrors.purchasePrice}</p>

        <p className="form-inputTitle">Adresse de votre bien</p>
        <input
          className="form-input"
          placeholder="14 rue des reves, 99999 Mon Lit"
          type="text"
          name="adress"
          onChange={handleChange}
          value={formValues.adress}
        />
        <p className="form-error">{formErrors.adress}</p>

        <p className="form-inputTitle">ajout d'une photo (adresse http)</p>
        <input
          className="form-input"
          placeholder="https://koreus.cdn.li/media/201904/maison-reve-maldives.jpg"
          type="file"
          name="picture"
          onChange={handleChange}
          value={formValues.picture}
        />
        <p className="form-error">{formErrors.picture}</p>

        <input type="submit" className="button-34" />
      </form>
    </div>
  );
}
export default AddPropertyForm;
