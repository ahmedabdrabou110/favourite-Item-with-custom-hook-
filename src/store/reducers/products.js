import { TOGGLE_FAV } from "../actions/products";

const initialState = {
  products: [
    {
      id: "p1",
      title: "Red Scarf",
      description: "A pretty red scarf.",
      isFavorite: false,
    },
    {
      id: "p2",
      title: "Blue T-Shirt",
      description: "A pretty blue t-shirt.",
      isFavorite: false,
    },
    {
      id: "p3",
      title: "Green Trousers",
      description: "A pair of lightly green trousers.",
      isFavorite: false,
    },
    {
      id: "p4",
      title: "Orange Hat",
      description: "Street style! An orange hat.",
      isFavorite: false,
    },
  ],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAV:
      const productIndex = state.products.findIndex(
        (p) => p.id === action.productId
      );

      const newFavStatus = !state.products[productIndex].isFavorite;
      const updateProducts = [...state.products];

      updateProducts[productIndex] = {
        ...state.products[productIndex],
        isFavorite: newFavStatus,
      };
      return {
        ...state,
        products: updateProducts,
      };
    default:
      return state;
  }
};

export default productReducer;
