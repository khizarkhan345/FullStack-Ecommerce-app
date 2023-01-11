import { bindActionCreators } from "redux";

const DataReducerDefaultState = [];

export default (state = DataReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      if (state.length === 0) {
        return [...state, ...action.product];
      } else {
        return state;
      }

    case "ADD_IMAGES":
      let imgArray = [];
      let index = 0;
      const oldState = [...state];
      let newState = [...state];

      return newState.map((st) => {
        imgArray = [];
        action.images.forEach((image) => {
          if (st.id === image.prodID) {
            imgArray.push(image.imageURL);
          }
        });
        index = index + 1;
        return { ...st, images: imgArray };
      });
    // oldState.forEach((st) => {
    //   action.images.forEach((image) => {
    //     if (st.id === image.prodID) {
    //       imgArray.push(image.imageURL);
    //     }
    //   });
    //   newState[index]["images"] = imgArray;
    //   index = index + 1;
    //   imgArray = [];
    // });
    // return newState;
    case "REDUCE_STOCK":
      return state.map((product) => {
        if (product.id === action.id) {
          const product1 = { ...product };
          product1.stock = product1.stock - action.count;
          return product1;
        } else {
          return product;
        }
      });
    case "ADD_STOCK":
      return state.map((product) => {
        if (product.id === action.id) {
          const product1 = { ...product };
          product1.stock = product1.stock + action.count;
          return product1;
        } else {
          return product;
        }
      });
    default:
      return state;
  }
};
