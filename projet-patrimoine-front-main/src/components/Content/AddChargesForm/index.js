/* eslint-disable quotes */
// NPM
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";

// Styles
import "./styles.scss";

function chargesForm() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  // using "react-hook-form" to create a form with validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    axios
      .post(`http://localhost:8000/api/v1_0/properties/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {});

    alert(JSON.stringify(data));
  };

  return (
    <div>
      <h2 className="content-title">Renseigner les charges d'une propriété</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <p className="form-inputTitle">Taxe foncière</p>
        <input
          className="form-input"
          type="number"
          placeholder="Taxe foncière"
          {...register("property tax", {
            value: 100,
            required: true,
            max: 10000,
            min: 0,
          })}
        />
        <p className="form-inputTitle">Assurances</p>
        <input
          className="form-input"
          type="number"
          placeholder="Assurances"
          {...register("insurance", {
            value: 100,
            required: true,
            max: 10000,
            min: 0,
          })}
        />
        <p className="form-inputTitle">Frais Comptable</p>
        <input
          className="form-input"
          type="number"
          placeholder="Frais Comptable"
          {...register("accounting fees", {
            value: 100,
            required: true,
            max: 10000,
            min: 0,
          })}
        />
        <p className="form-inputTitle">Charges de copropriété</p>
        <input
          className="form-input"
          type="number"
          placeholder="Charges copro"
          {...register("condominium fees", {
            value: 100,
            required: true,
            max: 10000,
            min: 0,
          })}
        />

        <input type="submit" className="button-34" />
      </form>
    </div>
  );
}
export default chargesForm;
