import { ADD_TENANT, SET_CREDIT_DATA } from "../actions/credit";

export const initialState = {
  creditData: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CREDIT_DATA:
      return {
        ...state,
        creditData: action.payload.credit,
      };

    default:
      return state;
  }
};

export default reducer;
