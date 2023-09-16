import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  // Add other action types as needed
} from '../constants/orderConstants';

const initialState = {
  loading: false,
  success: false,
  order: {},
  myOrders: [], // New state for holding user's orders
  error: ''
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, loading: true };
    case ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    // New cases for listing user's orders
    case ORDER_LIST_MY_REQUEST:
      return { ...state, loading: true };
    case ORDER_LIST_MY_SUCCESS:
      return { ...state, loading: false, myOrders: action.payload };
    case ORDER_LIST_MY_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Add cases for other action types as needed
    default:
      return state;
  }
};
