import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import "./displayAllProduct.css";

function DisplayAllProduct(props) {
  const { id, image, title, price, rating } = props;
  return (
    <div className="col mt-3 mb-3">
      <div key={id} className="card product text-center m-0">
        <img src={image} alt="" className="product-image" />
        <h5 className="card-title mt-3">{title}</h5>
        <p className="card-text"> ${price}</p>
        <Rating
          initialValue={rating}
          size={25}
          allowFraction
          fillColor="orange"
          emptyColor="gray"
        />
        <button className="btn btn-primary product-button m-2">
          <Link to={`/product/${id}`} className="product-link">
            View
          </Link>
        </button>
      </div>
    </div>
  );
}

export default DisplayAllProduct;
