export const categories = [
  {
    id: 1,
    type: "All-categories",
    name: "All Categories",
  },
  {
    id: 2,
    type: "smartphones",
    name: "Smart Phones",
  },
  {
    id: 3,
    type: "laptops",
    name: "Laptops",
  },
  {
    id: 4,
    type: "fragrances",
    name: "Fragrances",
  },
  {
    id: 5,
    type: "skincare",
    name: "Skincare",
  },
  {
    id: 6,
    type: "groceries",
    name: "Groceries",
  },
  {
    id: 7,
    type: "home-decoration",
    name: "Home Decoration",
  },
];

export function getCategories() {
  return categories.filter((g) => g);
}
