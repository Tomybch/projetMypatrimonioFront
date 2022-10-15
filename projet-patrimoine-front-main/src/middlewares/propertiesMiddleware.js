import axios from "axios";
import { useSelector } from "react-redux";
import { FETCH_PROPERTIES, setPropertiesList } from "../actions/properties";

const propertiesMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_PROPERTIES:
      const token = useSelector((state) => state.user.token);
      axios.defaults.headers.common.Authorization = `bearer ${token}`;
      axios
        .get("http://localhost:8000/api/v1_0/properties/")
        .then((res) => {
          store.dispatch(setPropertiesList(res.data));
        })
        .catch((error) => {});
      break;

    default:
      next(action);
  }
};

export default propertiesMiddleware;
