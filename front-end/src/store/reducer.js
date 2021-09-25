import { combineReducers } from "redux";

// reducer import
import customizationReducer from "./customizationReducer";
import snackbarReducer from "./snackbarReducer";
import accountReducer from "./accountReducer";

//-----------------------|| COMBINE REDUCER ||-----------------------//

const reducer = combineReducers({
  customization: customizationReducer,
  snackbar: snackbarReducer,
  accounts: accountReducer,
});

export default reducer;
