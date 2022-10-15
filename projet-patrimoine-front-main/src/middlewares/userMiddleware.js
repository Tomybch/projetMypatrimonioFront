import axios from "axios";
import { LOGIN, LOGOUT, setUser } from "../actions/users";

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      const { email, password } = store.getState().user.loginForm;

      axios
        .post(
          `https://mypatrimonio-back.herokuapp.com/api/login_check`,
          { email, password },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          const { pseudo, token } = res.data;

          localStorage.setItem(
            "user",
            JSON.stringify({
              pseudo,
              token,
            })
          );

          store.dispatch(setUser(pseudo, token));
        })
        .catch((err) => {});

      break;
    }

    case LOGOUT: {
      localStorage.removeItem("user");
      next(action);
      break;
    }

    default:
      next(action);
  }
};

export default userMiddleware;
