const FilterReducerDefaultState = {
  text: "",
  selectedCategory: "All-categories",
  sortBy: "Price",
  orderBy: "asc",
  cartDisplay: false,
};

export default (state = FilterReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      console.log("Text filter", action.text);
      return {
        ...state,
        text: action.text,
      };
    case "SET_CATEGORY_FILTER":
      //console.log("Set Category action is called");
      return {
        ...state,
        selectedCategory: String(action.category),
      };
    case "SORT_BY":
      let str1 = String(action.option);
      const str_arr = str1.split(" ");
      //console.log("REducer", str_arr);
      return {
        ...state,
        sortBy: str_arr[0],
        orderBy: str_arr[1],
      };
    case "SORT_BY_RATING":
      return {
        ...state,
        sortBy: "rating",
      };
    case "SET_CART_OPTION":
      const prevState = { ...state };
      prevState.cartDisplay = !prevState.cartDisplay;
      return prevState;
    default:
      return state;
  }
};
