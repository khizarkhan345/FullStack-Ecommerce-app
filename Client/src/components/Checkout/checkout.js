import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";
import { RemoveCartProduct } from "../../Action/CartAction";
import { connect } from "react-redux";
import { Link, redirect } from "react-router-dom";
import "./checkout.css";

function Checkout(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState();
  const [alert, setAlert] = useState(false);
  const [flag, setFlag] = useState(false);
  const [customerID, setCustomerID] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNoChange = (e) => {
    setPhoneNo(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleZipChange = (e) => {
    setZip(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let myuuid = uuidv4();
    const currentDate = new Date();
    //console.log("PHoneNo:", phoneNo);

    console.log("Email to get customer", email);
    Axios.get(`http://localhost:3001/getCustomer/${email}`)
      .then((result) => {
        // console.log("Customer ID", result.data[0].custID);
        console.log("Result data:", result.data);
        if (result.data.length > 0) {
          console.log("Result data:", result.data);
          setCustomerID(result.data[0].custID);
          setFlag(true);

          props.cartData.map((data) => {
            Axios.post("http://localhost:3001/order", {
              custID: result.data[0].custID,
              prodID: data.prodID,
              quantity: data.quantity,
              orderDate: currentDate,
            })
              .then(() => {
                console.log("Success");
              })
              .catch((err) => {
                console.log(err);
              });

            Axios.delete(`http://localhost:3001/deleteCart/${data.id}`)
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                console.log(err);
              });

            props.dispatch(RemoveCartProduct(data.id));
          });
        } else {
          Axios.post("http://localhost:3001/addCustomer", {
            custID: myuuid,
            name: name,
            email: email,
            phoneNo: phoneNo,
            street: address,
            city: city,
            state: state,
            zipcode: zip,
          })
            .then(() => {
              console.log("Success");
            })
            .catch((err) => {
              console.log(err);
            });

          props.cartData.map((data) => {
            Axios.post("http://localhost:3001/order", {
              custID: myuuid,
              prodID: data.prodID,
              quantity: data.quantity,
              orderDate: currentDate,
            })
              .then(() => {
                console.log("Success");
              })
              .catch((err) => {
                console.log(err);
              });

            Axios.delete(`http://localhost:3001/deleteCart/${data.id}`)
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                console.log(err);
              });

            props.dispatch(RemoveCartProduct(data.id));
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //console.log("Flag value", flag);

    setName("");
    setEmail("");
    setPhoneNo("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");

    setAlert(true);
  };

  if (alert) {
    return (
      <div className="alert alert-success success-text" role="alert">
        Your order has been placed. Check your email for confirmation.
      </div>
    );
  } else {
    return (
      <div className="container mb-3">
        <h3>Check Out</h3>

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={name}
              onChange={handleNameChange}
              placeholder="Your name..."
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Your Email..."
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="phoneno" className="form-label">
              Phone No
            </label>
            <input
              type="number"
              className="form-control"
              id="phoneno"
              value={phoneNo}
              onChange={handlePhoneNoChange}
              placeholder="Your Phone No..."
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="address" className="form-label">
              Street Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={handleAddressChange}
              placeholder="1234 Street Name..."
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              value={city}
              placeholder="Your city e.g. Lorton"
              onChange={handleCityChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="state"
              value={state}
              onChange={handleStateChange}
              required
              placeholder="Your state e.g. Virginia"
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="zipcode" className="form-label">
              Zip
            </label>
            <input
              type="number"
              className="form-control"
              id="zipcode"
              value={zip}
              onChange={handleZipChange}
              placeholder="22079..."
              required
            />
          </div>

          <div className="col-12">
            <button className="btn btn-primary mt-2 center">Check Out</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartData: state.CartData,
  };
};
export default connect(mapStateToProps)(Checkout);
