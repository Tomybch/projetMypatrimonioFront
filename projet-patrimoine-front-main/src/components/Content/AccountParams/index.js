// YARN
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// MAIN
function AccountParams() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  useEffect(() => {
    // axios.defaults.headers.common.Authorization = `bearer ${token}`;
    axios
      .get("https://mypatrimonio-back.herokuapp.com/api/v1_0/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEmail(res.data.email);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
      })
      .catch((error) => {});
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    let data = {};
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;

    if (
      newPassword === passwordConfirmation &&
      newPassword &&
      regexPassword.test(newPassword)
    ) {
      data = {
        firstName: firstName,
        lastName: lastName,
        password: newPassword,
      };
      alert("prénom, nom, et mot de passe modifiés");
    } else if (firstName && lastName && newPassword !== passwordConfirmation) {
      data = {};
      alert("votre mot de passe ne correspond pas a sa confirmation");
    } else if (
      firstName &&
      lastName &&
      newPassword === "" &&
      passwordConfirmation === ""
    ) {
      data = {
        firstName: firstName,
        lastName: lastName,
      };
      alert("nom, prénom modifiés");
    } else {
      alert("aucune modif");
    }
    if (data.firstName) {
      axios
        .patch(
          `https://mypatrimonio-back.herokuapp.com/api/v1_0/users/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .catch((error) => {})
        .then((res) => {
          navigate("/");
        });
    }
  };

  return (
    <div className="subscribe">
      <h2 className="content-title">Parametres</h2>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
        className="form"
      >
        <p>
          Email du compte utilisateur : <em>{email}</em>
        </p>
        <p className="form-inputTitle">Prénom</p>
        <input
          className="form-input"
          type="text"
          name="firsName"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <p className="form-inputTitle">Nom</p>
        <input
          className="form-input"
          type="text"
          name="lastName"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <p className="form-inputTitle">Mot de passe</p>
        <input
          className="form-input"
          type="text"
          name="newPassword"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
        />
        <p className="form-inputTitle">Confirmation du mot de passe</p>
        <input
          className="form-input"
          type="text"
          name="passwordConfirmation"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          value={passwordConfirmation}
        />
        <input type="submit" className="button-34" />
      </form>
    </div>
  );
}

export default AccountParams;
