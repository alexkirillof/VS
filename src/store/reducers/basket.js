const SET_BASKET_VALUE = 'SET_BASKET_VALUE';
const CLEAR_BASKET_VALUE = 'CLEAR_BASKET_VALUE';
const DELETE_BASKET_VALUE = 'DELETE_BASKET_VALUE';
const SET_BASKET_TOAST_OPEN = 'SET_BASKET_TOAST_OPEN';
const SET_BASKET_LENGTH = 'SET_BASKET_LENGTH';
const SET_BASKET_LOADING = 'SET_BASKET_LOADING';

const initialState = {
  basketLength: 0,
  basketValue: null,
  basketProducts: [],
  basketToastOpen: false,
  basketLoading: false,
};

export const setBasketLoading = loading => {
  return async dispatch => {
    dispatch({
      type: SET_BASKET_LOADING,
      loading,
    });
  };
};

export const setBasketToastOpen = status => {
  return async dispatch => {
    dispatch({
      type: SET_BASKET_TOAST_OPEN,
      status,
    });
  };
};

export const setBasketLength = value => {
  return async dispatch => {
    dispatch({
      type: SET_BASKET_LENGTH,
      value,
    });
  };
};

export const setBasketValue = value => {
  return async dispatch => {
    dispatch({
      type: SET_BASKET_VALUE,
      value,
    });
  };
};

export const deleteBasketValue = id => {
  return async dispatch => {
    dispatch({
      type: DELETE_BASKET_VALUE,
      id,
    });
  };
};

export const clearBasketValue = () => {
  return async dispatch => {
    dispatch({
      type: CLEAR_BASKET_VALUE,
    });
  };
};

export default function basketReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BASKET_VALUE:
      return {
        ...state,
        basketValue: action.value,
        basketLength: action.value.totals?.quantity,
        basketProducts: action.value.products,
      };
    // if (action.value > 0) {
    //   const index = state.basketValue.findIndex(
    //     (product) => product.product_id === action.id,
    //   );
    //   if (index > -1) {
    //     const newArray = [...state.basketValue]; //making a new array
    //     newArray[index]?.quantity = action.value; //changing value in the new array
    //     return {
    //       ...state,
    //       basketValue: newArray,
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       basketValue: [
    //         ...state.basketValue,
    //         {
    //           product_id: action.id,
    //           quantity: action.value,
    //         },
    //       ],
    //     };
    //   }
    // } else {
    //   const index = state.basketValue.findIndex(
    //     (product) => product.product_id === action.id,
    //   );
    //   return {
    //     ...state,
    //     basketValue: state.basketValue.filter(
    //       (product) => product.product_id !== action.id,
    //     ),
    //   };
    // }
    case SET_BASKET_LOADING:
      return {
        ...state,
        basketLoading: action.bool,
      };
    case DELETE_BASKET_VALUE:
      return {
        ...state,
        basketValue: state.basketValue.filter(el => el.id !== action.value),
      };
    case SET_BASKET_LENGTH:
      return {
        ...state,
        basketLength: action.value,
      };
    case SET_BASKET_TOAST_OPEN:
      return {
        ...state,
        basketToastOpen: action.bool,
      };
    case CLEAR_BASKET_VALUE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
