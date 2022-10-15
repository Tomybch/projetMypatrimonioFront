import {
  SUBMIT_REGISTER_FORM,
  SUBMIT_LOGIN_FORM,
  SET_TOKEN,
  SET_FIRSTNAME,
  LOGOUT,
} from "/src/actions/users";

const initialState = {
  token: "",
  islogged: false,
  loginForm: {
    username: "",
    password: "",
  },
  firstName: "",
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SUBMIT_REGISTER_FORM:
      return {
        ...state,
        registerForm: {
          firstName: action.payload.firstname,
          lastName: action.payload.lastname,
          email: action.payload.mail,
          password: action.payload.password,
        },
      };

    case SUBMIT_LOGIN_FORM:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          username: action.payload.username,
          password: action.payload.password,
        },
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        islogged: true,
      };

    case SET_FIRSTNAME:
      return {
        ...state,
        firstName: action.payload.firstName,
      };

    // case SET_USER:
    //   return {
    //     ...state,
    //     islogged: true,
    //     pseudo: action.payload.pseudo,
    //     token: action.payload.token,
    //   };

    case LOGOUT:
      return {
        ...state,

        islogged: false,
        pseudo: "",
        token: "",

        loginForm: {
          email: "",
          password: "",
        },
      };

    default:
      return state;
  }
}
export default reducer;
