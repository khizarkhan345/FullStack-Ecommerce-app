import React from "react";
import { setCategoryFilter } from "../../Action/FilterAction";

function ListCategory({ categories, selectedCategory, onCategoryChange }) {
  return (
    <ul className="list-group list-group-sm">
      {categories.map((category) => (
        <li
          key={category.id}
          className={
            selectedCategory === category.type
              ? "list-group-item active"
              : "list-group-item"
          }
          style={{ cursor: "pointer" }}
          onClick={() => onCategoryChange(category.type)}
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
}

export default ListCategory;
