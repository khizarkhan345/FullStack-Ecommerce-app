import React from "react";
import Input from "../Common/input";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./displayCart.css";

function DisplayCart(props) {
  const {
    edit,
    inputValue,
    cartData,
    handleInput,
    handleDelete,
    handleEdit,
    handleSubmit,
  } = props;

  let total = 0;
  let stock = 0;
  cartData.map((cart) => {
    const totalPrice = _.multiply(cart.price, cart.quantity);
    total = total + totalPrice;
  });

  return (
    <div>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th></th>
            <th></th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cartData.map((cart) => {
            const product = props.ProductData.filter(
              (product) => product.id == cart.id
            );
            stock = product.stock;
            return (
              <tr key={cart.id}>
                <td>{cart.title}</td>
                <td>{cart.quantity}</td>
                <td>${cart.price}</td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleEdit(cart.id, cart.quantity)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDelete(cart.id, cart.prodID, cart.quantity)
                    }
                  >
                    Delete
                  </button>
                </td>
                <td>${_.multiply(cart.price, cart.quantity)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {edit ? (
        <Input
          value={inputValue}
          handleChange={handleInput}
          handleSubmit={handleSubmit}
          min={1}
          max={stock}
        />
      ) : (
        ""
      )}

      <div className="d-flex justify-content-center">
        <h3 className="m-3">Total Amount</h3>
        <h4 className="mt-3 text-primary">${total}</h4>
      </div>
      <div className="text-center">
        <button className="btn btn-primary text-center">
          <Link to={`/checkout`} className="checkout-link">
            Check Out
          </Link>
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ProductData: state.ProductData,
  };
};
export default connect(mapStateToProps)(DisplayCart);
