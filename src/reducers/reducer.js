import { ACTION_TYPES } from "../types/types";

const initialState = {
  name: "",
  comments: "",
  table: "",
  showCheckout: false

};

const reducerForm = (state = initialState, action) => {
  if (action.type === ACTION_TYPES.ENTER_NAME) {
    return {
      ...state,
      name: action.payload,
    };
  }

  if (action.type === ACTION_TYPES.SELECT_TABLE) {
    return {
      ...state,
      table: action.payload,
    };
  }
  
  if (action.type === ACTION_TYPES.ENTER_TEXT_AREA) {
    return {
      ...state,
      comments: action.payload,
    };
  }
  return state;
};

export default reducerForm;