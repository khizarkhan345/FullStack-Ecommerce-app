import React from "react";
import { useState, useEffect } from "react";
import { getProducts } from "../../apiData/products";
import { AddProduct, AddImages } from "../../Action/DataAction";
import { connect } from "react-redux";
import DisplayAllProduct from "../Common/displayAllProduct";
import { AddCartProduct } from "../../Action/CartAction";
import "./dashboard.css";
import Axios from "axios";

function Dashboard(props) {
  const [productsData, setProductsData] = useState([]);
  const [images, setImages] = useState([]);
  useEffect(() => {
    const product = getProducts();
    //setCategories([...category]);
    //setProducts([...product]);
    //props.dispatch(AddProduct(product));

    Axios.get("http://localhost:3001/products").then((response) => {
      //setProductsData([...response.data]);
      props.dispatch(AddProduct(response.data));
    });

    Axios.get("http://localhost:3001/images").then((response) => {
      //setImages([...response.data]);
      props.dispatch(AddImages(response.data));
    });

    Axios.get("http://localhost:3001/cart")
      .then((response) => {
        if (response.data.length > 0) {
          props.dispatch(AddCartProduct(response.data));
        }

        // response.data.forEach((entry) => {
        //   const cartData = {
        //     id: entry.id,
        //     prodID: entry.prodID,
        //     title: entry.title,
        //     quantity: entry.quantity,
        //     price: entry.price,
        //   };

        // });
        //props.dispatch(AddCartProduct(product[0].id, productEdited));
        //console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // let imgArray = [];
    // let index = 0;
    // const newProductsData = [...productsData];
    // productsData.forEach((product) => {
    //   images.forEach((image) => {
    //     if (product.id === image.prodID) {
    //       imgArray.push(image.imageURL);
    //     }

    //     //onsole.log(imgArray);
    //   });
    //   newProductsData[index]["images"] = imgArray;
    //   index = index + 1;
    //   imgArray = [];
    // });

    //console.log(newProductsData);
    //props.dispatch(AddProduct(productsData));
    //props.dispatch(AddImages(images));
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">Best Selling Products</h2>
      <div className="row container m-0">
        {props.ProductData.map((product) => {
          if (product.id > 6) {
            return " ";
          } else {
            return (
              <DisplayAllProduct
                key={product.id}
                id={product.id}
                image={product.thumbnail}
                title={product.title}
                price={product.price}
                rating={product.rating}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  //console.log(state);
  //console.log(state.ProductData[1]);
  return {
    ProductData: state.ProductData,
    CartData: state.CartData,
    Filter: state.Filter,
  };
};
export default connect(mapStateToProps)(Dashboard);
