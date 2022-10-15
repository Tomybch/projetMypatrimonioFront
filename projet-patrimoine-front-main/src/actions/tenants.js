export const ADD_TENANT = 'ADD_TENANT';
export const addTenant = ({firstName}) => ({
  type: ADD_TENANT,
  payload: {
    firstName,
  },
});

export const SET_TENANTS_DATA = "SET_TENANTS_DATA";
export const setTenantsData = (tenants) => ({
  type: SET_TENANTS_DATA,
  payload: { tenants: tenants },
});
