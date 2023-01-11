import React from "react";

function DisplaySortOption({ sortValue, onSortOptionChange }) {
  return (
    <div>
      <label htmlFor="select" className="form-label">
        Sort By
      </label>
      <select
        id="select"
        value={sortValue}
        className="form-control"
        style={{ width: "20rem" }}
        onChange={(event) => onSortOptionChange(event.target.value)}
      >
        <option value="price asc">Price ASC</option>
        <option value="price desc">Price DESC</option>
        <option value="rating asc">Rating ASC</option>
        <option value="rating desc">Rating DESC</option>
      </select>
    </div>
  );
}

export default DisplaySortOption;
