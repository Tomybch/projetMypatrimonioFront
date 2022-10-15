// YARN
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Components
import { loginVisibility } from "src/actions";
import { submitLoginForm, logout } from "src/actions/users";
import { setToken } from "src/actions/users";
import { setFirstName } from "src/actions/users";

// Style
import "./styles.scss";

// MAIN
function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const firstName = useSelector((state) => state.user.firstName);
  const token = useSelector((state) => state.user.token);
  const isLogged = useSelector((state) => state.user.islogged);

  const [contentReady, setContentReady] = useState(false);
  const isLoginVisible = useSelector((state) => state.main.loginVisibility);
  const clearLocalStorage = () => localStorage.clear();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    dispatch(submitLoginForm(data));

    axios
      .post(`https://mypatrimonio-back.herokuapp.com/api/login_check`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("user", JSON.stringify(token));
        dispatch(setToken(res.data.token));
        dispatch(loginVisibility());
        navigate("/mes-biens");
      })
      .then();
    e.target.reset();
  };

  const handleLogout = () => {
    dispatch(logout(), clearLocalStorage());
    navigate("/");
  };

  useEffect(() => {
    if (isLogged) {
      axios
        .get("https://mypatrimonio-back.herokuapp.com/api/v1_0/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(setFirstName(res.data.firstName));
          setContentReady(true);
        })

        .catch((error) => {});
    }
  }, [isLogged]);

  return (
    <>
      {isLogged && (
        <div className="login-form-logged">
          <p>{`Bonjour, ${firstName} !`}</p>
          <button className="button-34" type="button" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      )}

      {!isLogged && (
        <>
          <div className="login">
            <Link to="#" className="login-button">
              <button
                onClick={() => dispatch(loginVisibility())}
                className="button-34"
                type="button"
              >
                se connecter
              </button>
            </Link>
          </div>

          <div
            className={isLoginVisible ? "login-popUp active" : "login-popUp"}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="login-input"
                name="username"
                {...register("username")}
                placeholder="Email"
              />
              <input
                className="login-input"
                name="password"
                {...register("password")}
                placeholder="Mot de passe"
              />
              <input className="login-submitButton" type="submit" />
            </form>
          </div>
          <div className="register">
            <Link to="/inscription" className="register-button">
              <button className="button-34" type="button">
                s'inscrire
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default Account;
