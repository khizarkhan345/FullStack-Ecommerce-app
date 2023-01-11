import { combineReducers } from "redux";
import CartReducer from "./CartReducer";
import DataReducer from "./DataReducer";
import FilterReducer from "./FilterReducer";

const RootReducer = combineReducers({
  ProductData: DataReducer,
  CartData: CartReducer,
  Filter: FilterReducer,
});

export default RootReducer;
