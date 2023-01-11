import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../apiData/category";
import { getProducts } from "../../apiData/products";
import Pagination from "../Common/paginationComp";
import DisplayProducts from "./displayProducts";
import ListCategory from "../Common/listCategory";
import DisplaySortOption from "../Common/displaySortOption";
import SearchForm from "../Common/searchForm";
import { paginate } from "../../utils/paginate";
import { AddProduct, AddImages } from "../../Action/DataAction";
import { setFilterText, setCategoryFilter } from "../../Action/FilterAction";
import { SortBy } from "../../Action/FilterAction";
import Axios from "axios";
import _ from "lodash";
import "./products.css";

function Products(props) {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const category = getCategories();
    //const product = getProducts();
    setCategories([...category]);

    Axios.get("http://localhost:3001/products").then((response) => {
      //setProductsData([...response.data]);
      props.dispatch(AddProduct(response.data));
    });

    Axios.get("http://localhost:3001/images").then((response) => {
      //setImages([...response.data]);
      props.dispatch(AddImages(response.data));
    });
  }, []);

  const onCategoryChange = (category) => {
    props.dispatch(setFilterText(""));
    setCurrentPage(1);
    props.dispatch(setCategoryFilter(category));
  };

  const onSortOptionChange = (sortOption) => {
    setSortOption(sortOption);
    props.dispatch(SortBy(sortOption));
    console.log(sortOption);
  };

  const handleSearchForm = () => {
    setCurrentPage(1);
    props.dispatch(setFilterText(searchTerm));
    setSearchTerm("");
  };

  const handleChange = (Text) => {
    setSearchTerm(Text);
  };

  const filteredData =
    props.Filter.selectedCategory === "All-categories"
      ? props.ProductData
      : props.ProductData.filter(
          (product) => product.category === props.Filter.selectedCategory
        );

  const filterSearchData =
    filteredData &&
    props.ProductData.filter((product) => {
      return product.title
        .toLowerCase()
        .includes(props.Filter.text.toLowerCase());
    });

  const finalData =
    props.Filter.text.length === 0 ? filteredData : filterSearchData;

  const sortedData = _.orderBy(
    finalData,
    [props.Filter.sortBy],
    [props.Filter.orderBy]
  );

  const paginateData = paginate(sortedData, currentPage, pageSize);

  return (
    <div className="ms-md-5">
      <div className="row flex products">
        <div className="col-md-3">
          <ListCategory
            categories={categories}
            selectedCategory={props.Filter.selectedCategory}
            onCategoryChange={onCategoryChange}
          />
        </div>
        <div className="col m-2">
          <SearchForm
            searchValue={searchTerm}
            handleChange={handleChange}
            handleSearchForm={handleSearchForm}
          />
          <DisplaySortOption
            sortValue={sortOption}
            onSortOptionChange={onSortOptionChange}
          />

          <DisplayProducts products={paginateData} />
          <Pagination
            itemsCount={filteredData.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ProductData: state.ProductData,
    CartData: state.CartData,
    Filter: state.Filter,
  };
};
export default connect(mapStateToProps)(Products);
