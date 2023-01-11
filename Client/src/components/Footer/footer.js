import React from "react";
import "./footer.css";
import Contact from "../Contact/contact";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer">
      <div className="row row-group">
        <div className="col-sm">
          <h3>Information</h3>
          <ul className="list-group">
            <li>
              <Link to="/" className="Link-cls">
                {" "}
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="Link-cls">
                Products
              </Link>
            </li>
            <li>
              <Link to="/aboutus" className="Link-cls">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="Link-cls">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-sm">
          <h3>Products</h3>
          <ul className="list-group">
            <li>
              <Link to="/products" className="Link-cls">
                Smartphones
              </Link>
            </li>
            <li>
              <Link to="/products" className="Link-cls">
                Laptops
              </Link>
            </li>
            <li>
              <Link to="/products" className="Link-cls">
                Fragrances
              </Link>
            </li>
            <li>
              <Link to="/products" className="Link-cls">
                Skincare
              </Link>
            </li>
            <li>
              <Link to="/products" className="Link-cls">
                Groceries
              </Link>
            </li>
            <li>
              <Link to="/products" className="Link-cls">
                Home Decoration
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-sm">
          <h3>Contact</h3>
          <div className="d-flex  justify-content-center">
            <i className="fa fa-address-book fa-2x"></i>
            <p className="card-text ms-2"> Hagel Circle, Lorton Virginia</p>
          </div>
          <div className="d-flex mt-2 justify-content-center">
            <i className="fa fa-phone fa-2x"></i>
            <p className="card-text ms-2">571-121-4556</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
