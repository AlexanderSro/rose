import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_ADJUST_QTY,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const adjustCartQty = (id, qty) => (dispatch, getState) => {
  const item = getState().cart.cartItems.find((x) => x.product === id);
  if (item) {
    dispatch({
      type: CART_ADJUST_QTY,
      payload: {
        product: id,
        qty,
      },
    });
  }

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => (dispatch, getState) => {
  dispatch({ type: CART_CLEAR_ITEMS });
  localStorage.removeItem("cartItems");
};

export const saveShippingAddress = (address) => (dispatch, getState) => {
  console.log("Dispatching saveShippingAddress with payload", address);

  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: address,
  });

  const { userLogin: { userInfo } } = getState();
  localStorage.setItem('shippingAddress', JSON.stringify({ userId: userInfo._id, address }));
};
