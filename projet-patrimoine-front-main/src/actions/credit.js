export const SET_CREDIT_DATA = "SET_CREDIT_DATA";
export const setCreditData = (credit) => ({
  type: SET_CREDIT_DATA,
  payload: { credit: credit },
});
