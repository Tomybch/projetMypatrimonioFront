import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import axios from "axios";

const schema = yup.object().shape({
  title: yup.string().min(4).max(25),
  adress: yup.string().min(5).max(255),
  //picture: yup.string().min(1).max(255)
});

function EditProperty() {
  const { slug } = useParams();
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  const [userInfo, setuserInfo] = useState([]);
  const [contentReady, setContentReady] = useState(false);

  const [title, setTitle] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [adress, setAdress] = useState("");

  useEffect(() => {
    axios

      .get(`https://mypatrimonio-back.herokuapp.com/api/v1_0/users/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setuserInfo(res.data);
        setTitle(res.data.title);
        setPurchasePrice(res.data.purchasePrice);
        setAdress(res.data.adress);
        setContentReady(true);
      })
      .catch((error) => {});
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: title,
      purchasePrice: parseInt(purchasePrice),
      adress: adress,
    };
    axios
      .patch(
        `https://mypatrimonio-back.herokuapp.com/api/v1_0/properties/${slug}`,
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
      });
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="subscribe">
      <h2 className="content-title">Editer</h2>

      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
        className="form"
      >
        <p className="form-inputTitle">Titre</p>
        <input
          className="form-input"
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <p>{errors.title?.message}</p>
        <p className="form-inputTitle">Prix</p>
        <input
          className="form-input"
          type="number"
          name="purchasePrice"
          onChange={(e) => setPurchasePrice(e.target.value)}
          value={purchasePrice}
        />
        <p className="form-inputTitle">Adresse</p>
        <input
          className="form-input"
          type="text"
          name="adress"
          onChange={(e) => setAdress(e.target.value)}
          value={adress}
        />
        <p>{errors.adress?.message}</p>
        <input type="submit" className="button-34" />
      </form>
    </div>
  );
}

export default EditProperty;
