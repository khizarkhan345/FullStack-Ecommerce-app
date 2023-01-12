import { combineReducers } from "redux";
import CartReducer from "./CartReducer";
import DataReducer from "./DataReducer";
import OrderReducer from "./OrderReducer";
import FilterReducer from "./FilterReducer";

const RootReducer = combineReducers({
  OrderData: OrderReducer,
  ProductData: DataReducer,
  CartData: CartReducer,
  Filter: FilterReducer,
});

export default RootReducer;
