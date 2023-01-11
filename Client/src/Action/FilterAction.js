export const setFilterText = (text) => ({
  type: "SET_TEXT_FILTER",
  text,
});

export const setCategoryFilter = (category) => ({
  type: "SET_CATEGORY_FILTER",
  category,
});

export const SortBy = (option) => ({
  type: "SORT_BY",
  option,
});

export const SortByRating = () => ({
  type: "SORT_BY_RATING",
});

export const SetCartOption = () => ({
  type: "SET_CART_OPTION",
});
