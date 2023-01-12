const OrderDefaultState = [];

export default (state = OrderDefaultState, action) => {
  switch (action.type) {
    case "ADD_ORDER":
      if (state.length === 0) {
        return [...state, ...action.order];
      } else {
        return state;
      }
    default:
      return state;
  }
};
