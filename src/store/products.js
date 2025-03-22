import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    shoppingcart: {
      products: [],
    },
  },
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload.products;
    },
    addToCart: (state, action) => {
      const product = { ...action.payload };
      const index = state.shoppingcart.products.findIndex(
        (p) => p.id === product.id
      );
      if (index > -1) {
        const foundProduct = state.shoppingcart.products.find(
          (p) => p.id === product.id
        );
        foundProduct.quantity += 1;
        state.shoppingcart.products[index] = foundProduct;
      } else {
        state.shoppingcart.products.push({
          ...product,
          quantity: 1,
        });
      }
    },
    deleteProduct: (state, action) => {
      const product = { ...action.payload };
      const index = state.shoppingcart.products.findIndex(
        (p) => p.id === product.id
      );
      if (index > -1) {
        state.shoppingcart.products.splice(index, 1);
      }
    },
    increaseCount: (state, action) => {
      state.shoppingcart.products[action.payload].quantity += 1;
    },
    decreaseCount: (state, action) => {
      state.shoppingcart.products[action.payload].quantity -= 1;
    },
  },
});

const { actions, reducer } = productsSlice;

export const {
  getProducts,
  addToCart,
  deleteProduct,
  increaseCount,
  decreaseCount,
} = actions;

export const fetchProducts = () => async (dispatch) => {
  const res = await axios.get("https://dummyjson.com/products?limit=10");
  dispatch(getProducts({ products: res.data.products }));
};

export default reducer;
