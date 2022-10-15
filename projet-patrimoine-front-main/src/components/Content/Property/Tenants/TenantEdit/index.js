// NPM
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

// Style
import "./styles.scss";

// Main
function AddTenantForm() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);

  const tenantsData = useSelector((state) => state.tenants.tenantsData);
  const tenant = findtenant(tenantsData, slug);
  console.log(tenantsData);
  const [firstName, setFirstName] = useState(tenant.firstName);
  const [lastName, setLastName] = useState(tenant.lastName);
  const [email, setEmail] = useState(tenant.email);
  const [phoneNumber, setPhoneNumber] = useState(tenant.phoneNumber);
  const [rent, setRent] = useState(tenant.rent);

  // using "react-hook-form" to create a form with validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (e) => {
    // e.preventDefault();
    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      rent: parseInt(rent),
    };

    // Axios Request for add tenant
    axios
      .patch(
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
        navigate(`/mes-biens`);
      })
      .catch((err) => {});
  };

  return (
    <div>
      <h2 className="content-title">Modifier les données du locataire</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <p className="form-inputTitle">Prénom</p>
        <input
          className="form-input"
          type="text"
          placeholder="Prénom"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <p className="form-inputTitle">Nom</p>
        <input
          className="form-input"
          type="text"
          placeholder="Nom"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <p className="form-inputTitle">Adresse mail</p>
        <input
          className="form-input"
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <p className="form-inputTitle">Numéro de téléphone</p>
        <input
          className="form-input"
          type="text"
          placeholder="Numéro de téléphone"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
        />
        <p className="form-inputTitle">Loyer payé</p>
        <input
          className="form-input"
          type="number"
          placeholder="Loyer payé"
          {...register("rent", {
            valueAsNumber: 100,
          })}
          onChange={(e) => setRent(e.target.value)}
          value={rent}
        />
        <p className="form-inputTitle">Date de debut</p>
        <input
          className="form-input"
          type="date"
          placeholder="date d'entrée"
          {...register("entry_date", {
            valueAsNumber: 100,
          })}
        />
        <p className="form-inputTitle">Date de fin</p>
        <input
          className="form-input"
          type="date"
          placeholder="date de sortie"
          {...register("exit_date", {
            valueAsNumber: 100,
          })}
        />

        <input type="submit" className="button-34" />
      </form>
    </div>
  );
}
export default AddTenantForm;

function findtenant(tenants, searchedSlug) {
  const tenant = tenants.find((testedTenant) => {
    return testedTenant.slug === searchedSlug;
  });
  return tenant;
}
