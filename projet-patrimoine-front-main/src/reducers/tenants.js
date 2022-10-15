import { ADD_TENANT, SET_TENANTS_DATA} from '../actions/tenants';

export const initialState = {
  tenantsData: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_TENANT:
      return {
        ...state,
        tenantData: action.payload.tenants,
        // {
        //   ...state.tenantData,
        //   firstName: action.payload.firstName,
        // },
      };
    case SET_TENANTS_DATA:
      return {
        ...state,
        tenantsData: action.payload.tenants, 
      };

    default:
      return state;
  }
};

export default reducer;
