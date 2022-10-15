import axios from "axios";
import { ADD_TENANT } from "../actions/tenants";

const tenantsMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_TENANT: {
      const { tenantData } = store.getState().tenants.tenantData;

      axios
        .post(
          `https://mypatrimonio-back.herokuapp.com/api/v1_0/tenants/appt-marseille`,
          { tenantData },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {})
        .catch((err) => {});

      break;
    }

    default:
      next(action);
  }
};

export default tenantsMiddleware;
