import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { AddOrder } from "../../Action/OrderAction";
import "./Orders.css";

function Orders(props) {
  useEffect(() => {
    Axios.get("http://localhost:3001/getOrders")
      .then((response) => {
        console.log(response.data);
        props.dispatch(AddOrder(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className="table-responsive">
      <table className="table table-sm table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Addresss</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {props.orderData.map((order) => {
            // const product = props.ProductData.filter(
            //   (product) => product.id == cart.id
            // );
            // stock = product.stock;
            const Address =
              order.cStreet +
              "\n" +
              order.cCity +
              "\n" +
              order.cState +
              "\n" +
              order.czipCode;
            return (
              <tr key={order.custID + order.prodID}>
                <td>{order.cName}</td>
                <td>{order.cEmail}</td>
                <td>{Address}</td>

                <td>{order.title}</td>
                <td>{order.quantity}</td>
                <td>{order.orderDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("Order Page State:", state);
  return {
    orderData: state.OrderData,
  };
};
export default connect(mapStateToProps)(Orders);
