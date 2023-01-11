import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { UpdateCartProduct } from "../../Action/CartAction";
import { ReduceStock } from "../../Action/DataAction";
import { toNumber } from "lodash";
import ImageGallery from "react-image-gallery";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./product.css";

function Product(props) {
  const [addToCart, setAddToCart] = useState(0);
  const [count, setCount] = useState(1);
  const [alert, setAlert] = useState(false);
  //const [productData, setProductData] = useState(null);

  const { id } = useParams();

  console.log("Id:", id);
  //const products = getProducts();

  let product = props.ProductData.filter((product) => product.id == id);

  console.log("Product Details", product);

  //setProductData(product);

  var Images = [];

  product[0].images.map((p) => {
    Images.push({
      original: p,
      thumbnail: p,
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let myuuid = uuidv4();
    const productEdited = {
      id: myuuid,
      prodID: product[0].id,
      title: product[0].title,
      quantity: toNumber(count),
      stock: product[0].stock - toNumber(count),
      price: product[0].price,
      totalPrice: toNumber(count) * product[0].price,
    };

    Axios.post("http://localhost:3001/addToCart", {
      id: myuuid,
      prodID: product[0].id,
      quantity: toNumber(count),
    })
      .then(() => {
        console.log("Success");
      })
      .catch(() => {
        console.log("Failed");
      });

    const newStock = product[0].stock - toNumber(count);
    Axios.put(`http://localhost:3001/editStock/${product[0].id}`, {
      newStock: newStock,
    })
      .then(() => {
        console.log("Success");
      })
      .catch((err) => {
        console.log(err);
      });
    props.dispatch(UpdateCartProduct(product[0].id, productEdited));
    props.dispatch(ReduceStock(product[0].id, toNumber(count)));
    setCount(1);
    setAlert(true);

    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">{product[0].title}</h1>
      <div className="row m-1 hstack">
        <div className="col image-gallery">
          <ImageGallery
            items={Images}
            originalHeight="350px"
            originalWidth="400px"
          />
        </div>
        <div className="col mt-5">
          <h3 className="desc-header">Description</h3>
          <p className="mt-6">{product[0].description}</p>
          <p className="mt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <form className="form-group hstack mt-3" onSubmit={handleSubmit}>
            <input
              type="number"
              className="form-control"
              value={count}
              min={1}
              max={product[0].stock}
              style={{ width: "8rem", height: "2.2rem" }}
              onChange={(e) => setCount(e.target.value)}
            />
            <button
              className="btn btn-danger btn-sm m-1"
              style={{ width: "6rem", height: "2.2rem" }}
              disabled={product[0].stock === 0}
              onClick={() => {
                setAddToCart(count);
                console.log("Add to Cart: ", addToCart);
              }}
            >
              Add to Cart
            </button>
          </form>
          {product[0].stock === 0 ? (
            <h4 className="text-danger p-2">Out of Stock</h4>
          ) : (
            <div className="d-flex mt-3">
              <h5 className="stock-header">Available Quantity:</h5>
              <p className="stock-title">{product[0].stock}</p>
            </div>
          )}
        </div>
      </div>
      {alert && (
        <div className="alert alert-success success-text-msg" role="alert">
          Product has been added to cart successfully! Check your cart for
          details.
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("Product state", state);
  return {
    ProductData: state.ProductData,
  };
};

export default connect(mapStateToProps)(Product);
