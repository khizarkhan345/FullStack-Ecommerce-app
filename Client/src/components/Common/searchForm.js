import React from "react";
import { setSearchTerm } from "../../Action/FilterAction";
import { connect } from "react-redux";

function SearchForm(props) {
  const { searchValue, handleChange, handleSearchForm } = props;
  const handleSubmit = (e) => {
    e.preventDefault();

    handleSearchForm();
  };

  return (
    <form className="form-group hstack mb-3" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchValue}
        placeholder="Search Product"
        className="form-control"
        style={{ width: "20rem", marginRight: "0.4rem" }}
        onChange={(event) => handleChange(event.target.value)}
      />
      <button className="btn btn-primary">Search</button>
    </form>
  );
}

export default connect()(SearchForm);
