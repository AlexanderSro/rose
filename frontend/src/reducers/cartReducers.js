import {
  CART_ADD_ITEM,
  CART_ADJUST_QTY,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cartItems: [],
  shippingAddress: shippingAddressFromStorage.address || {},
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_ADJUST_QTY:
      const adjustedItem = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x.product === adjustedItem.product
            ? { ...x, qty: adjustedItem.qty }
            : x
        ),
      };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case CART_CLEAR_ITEMS:
      return { cartItems: [] };

    case CART_SAVE_SHIPPING_ADDRESS:
      console.log("Handling CART_SAVE_SHIPPING_ADDRESS with state", state);
      console.log("Payload", action.payload);
      return {
        ...state,
        shippingAddress: action.payload,
      };

    default:
      return state;
  }
};
