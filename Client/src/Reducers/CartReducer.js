const CartDefaultState = [];

export default (state = CartDefaultState, action) => {
  switch (action.type) {
    case "ADD_CART":
      //console.log(action.product);
      console.log("Add Cart is called");
      if (state.length === 0) {
        return [...state, ...action.product];
      } else {
        return state;
      }
    //} else {
    //return [...state, ]
    // let bool = false;
    // const newState = state.map((cart) => {
    //   if (cart.id === action.id) {
    //     const prevCart = { ...cart };
    //     prevCart.quantity = prevCart.quantity + action.product["quantity"];

    //     bool = true;
    //     return prevCart;
    //   } else {
    //     console.log("Else is called");
    //     return cart;
    //   }
    // });

    // console.log("newState", newState);

    // if (!bool) {
    //   return [...newState, action.product];
    // }

    // return newState;
    //}

    //
    case "UPDATE_CART":
      if (state.length === 0) {
        return [...state, action.product];
      } else {
        let bool = false;
        const newState = state.map((cart) => {
          if (cart.id === action.id) {
            const prevCart = { ...cart };
            prevCart.quantity = prevCart.quantity + action.product["quantity"];

            bool = true;
            return prevCart;
          } else {
            console.log("Else is called");
            return cart;
          }
        });

        console.log("newState", newState);

        if (!bool) {
          return [...newState, action.product];
        }

        return newState;
      }

    // return state.map((cart) => {
    //   if (cart.id === action.id) {
    //     const prevCart = { ...cart };
    //     prevCart.quantity = prevCart.quantity + action.newQuantity;
    //     //bool = true;
    //     return prevCart;
    //   } else {
    //     console.log("Else is called");
    //     return cart;
    //   }
    // });

    case "REMOVE_CART":
      console.log("Remove cart called");
      return state.filter((cart) => cart.id !== action.id);
    case "EDIT_CART":
      return state.map((cart) => {
        if (cart.id === action.id) {
          return { ...cart, ...action.updates };
        } else {
          return cart;
        }
      });
    default:
      return state;
  }
};
