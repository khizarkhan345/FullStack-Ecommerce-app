import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { RemoveCartProduct, EditCartProduct } from "../../Action/CartAction";
import { AddStock, ReduceStock } from "../../Action/DataAction";
import DisplayCart from "./displayCart";
import { toNumber } from "lodash";
import "./displayCartProducts.css";
import { applyMiddleware } from "redux";
import Axios from "axios";
import { AddCartProduct } from "./../../Action/CartAction";

function DisplayCartProducts(props) {
  const [edit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [oldQuantity, setOldQuantity] = useState(0);
  const [id, setId] = useState("");

  // useEffect(() => {

  // }, []);

  const handleEdit = (id, oldQuantity) => {
    setEdit(true);
    setId(id);
    setOldQuantity(oldQuantity);
    console.log("Handle Edit called");
    //props.dispatch(R(id));
  };

  const handleDelete = (id, prodID, quantity) => {
    console.log("Handle Delete called");

    const newRecord = props.productData.filter((data) => data.id === prodID);

    console.log(newRecord);

    const newStock = newRecord[0].stock + quantity;
    Axios.delete(`http://localhost:3001/deleteCart/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    props.dispatch(RemoveCartProduct(id));
    Axios.put(`http://localhost:3001/editStock/${prodID}`, {
      newStock: newStock,
    })
      .then(() => {
        console.log("Success");
      })
      .catch((err) => {
        console.log(err);
      });
    props.dispatch(AddStock(prodID, toNumber(quantity)));
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(inputValue);

    Axios.put(`http://localhost:3001/editCart/${id}`, {
      newQuantity: inputValue,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    const cartdata = props.cartData.filter((data) => data.id == id);
    console.log("Cart Data", cartdata);

    const productdata = props.productData.filter(
      (data) => data.id == cartdata[0].prodID
    );

    console.log("Product Data", productdata);

    //const newStock = productdata.stock - toNumber();
    props.dispatch(EditCartProduct(id, { quantity: toNumber(inputValue) }));
    if (toNumber(inputValue) > toNumber(oldQuantity)) {
      let quantity = toNumber(inputValue) - toNumber(oldQuantity);
      console.log("New Quanity in case of Reduce stock", quantity);
      const newStock = productdata[0].stock - toNumber(quantity);
      Axios.put(`http://localhost:3001/editStock/${cartdata[0].prodID}`, {
        newStock: newStock,
      })
        .then(() => {
          console.log("Success");
        })
        .catch((err) => {
          console.log(err);
        });
      props.dispatch(ReduceStock(cartdata[0].prodID, toNumber(quantity)));
    } else {
      const quantity = toNumber(oldQuantity) - toNumber(inputValue);
      console.log("New Quanity in case of Add stock", quantity);
      const newStock = productdata[0].stock + toNumber(quantity);
      Axios.put(`http://localhost:3001/editStock/${cartdata[0].prodID}`, {
        newStock: newStock,
      })
        .then(() => {
          console.log("Success");
        })
        .catch((err) => {
          console.log(err);
        });
      props.dispatch(AddStock(cartdata[0].prodID, toNumber(quantity)));
    }
    setInputValue("");
    setEdit(false);
  };
  return (
    <div className="container cart">
      <h2 className="text-center">Cart Data</h2>
      {props.cartData.length === 0 ? (
        <p className="text-center mt-4 text-danger">Cart is Empty</p>
      ) : (
        <DisplayCart
          cartData={props.cartData}
          edit={edit}
          inputValue={inputValue}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    productData: state.ProductData,
    cartData: state.CartData,
  };
};

export default connect(mapStateToProps)(DisplayCartProducts);
