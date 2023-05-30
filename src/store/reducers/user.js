const SET_USER_DATA = 'SET_USER_DATA';
const SET_ADULT = 'SET_ADULT';
const SET_SELECTED_SHOP = 'SET_SELECTED_SHOP';
const SET_REGION_ID = 'SET_REGION_ID';
const SET_SHOP_ID = 'SET_SHOP_ID';
const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
const SET_DELIVERY_TYPE = 'SET_DELIVERY_TYPE';
const SET_DELIVERY_ID = 'SET_DELIVERY_ID';
const CLEAR_USER_DATA = 'CLEAR_USER_DATA';
const ADD_FAVORITE_AD = 'ADD_FAVORITE_AD';
const DELETE_FAVORITE_AD = 'DELETE_FAVORITE_AD';
const SET_LOYALTY_CARD = 'SET_LOYALTY_CARD';

const initialState = {
  data: null,
  loyaltyCard: null,
  sessid: null,
  hash: null,
  shop: null,
  shopId: null,
  notifications: 0,
  shopRegionId: null,
  deliveryType: 0,
  deliveryId: null,
  deliveryAddress: '',
  favorites: [],
  orders: [],
  adult: false,
};

export const setUserData = (data, sessid, hash) => {
  return async dispatch => {
    dispatch({
      type: SET_USER_DATA,
      data,
      sessid,
      hash,
    });
  };
};

export const setLoyaltyCard = number => {
  return async dispatch => {
    dispatch({
      type: SET_LOYALTY_CARD,
      number,
    });
  };
};

export const setAdult = adult => {
  return async dispatch => {
    dispatch({
      type: SET_ADULT,
      adult,
    });
  };
};

export const setNotifications = count => {
  return async dispatch => {
    dispatch({
      type: SET_NOTIFICATIONS,
      count,
    });
  };
};

export const setSelectedShop = shop => {
  return async dispatch => {
    dispatch({
      type: SET_SELECTED_SHOP,
      shop,
    });
  };
};

export const setDeliveryType = id => {
  return async dispatch => {
    dispatch({
      type: SET_DELIVERY_TYPE,
      id,
    });
  };
};

export const setRegionId = id => {
  return async dispatch => {
    dispatch({
      type: SET_REGION_ID,
      id,
    });
  };
};

export const setShopId = id => {
  return async dispatch => {
    dispatch({
      type: SET_SHOP_ID,
      id,
    });
  };
};

export const setDeliveryId = (id, address) => {
  return async dispatch => {
    dispatch({
      type: SET_DELIVERY_ID,
      id,
      address,
    });
  };
};

export const addFavorite = id => {
  return async dispatch => {
    dispatch({
      type: ADD_FAVORITE_AD,
      id,
    });
  };
};

export const deleteFavorite = id => {
  return async dispatch => {
    dispatch({
      type: DELETE_FAVORITE_AD,
      id,
    });
  };
};

export const clearUserData = sessid => {
  return async dispatch => {
    dispatch({
      type: CLEAR_USER_DATA,
      sessid,
    });
  };
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        data: action.data,
        sessid: action.sessid,
        hash: action.hash,
      };
    case SET_LOYALTY_CARD:
      return {
        ...state,
        loyaltyCard: action.number,
      };
    case SET_ADULT:
      return {
        ...state,
        adult: action.adult,
      };
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.count,
      };
    case SET_SELECTED_SHOP:
      return {
        ...state,
        shop: action.shop,
      };
    case SET_REGION_ID:
      return {
        ...state,
        shopRegionId: action.id,
      };
    case SET_SHOP_ID:
      return {
        ...state,
        shopId: action.id,
      };
    case SET_DELIVERY_TYPE:
      return {
        ...state,
        deliveryType: action.id,
      };
    case SET_DELIVERY_ID:
      return {
        ...state,
        deliveryId: action.id,
        deliveryAddress: action.address,
      };
    case ADD_FAVORITE_AD:
      return {
        ...state,
        favorites:
          state.favorites && !state.favorites.includes(action.id)
            ? [...state.favorites, action.id]
            : [...state.favorites],
      };
    case DELETE_FAVORITE_AD:
      return {
        ...state,
        favorites:
          state.favorites.length === 1
            ? []
            : state.favorites.filter(item => item !== action.id),
      };
    case CLEAR_USER_DATA:
      return {
        ...state,
        sessid: action.sessid ? action.sessid : null,
        data: null,
        loyaltyCard: null,
        hash: null,
        deliveryType: 0,
        notifications: 0,
        deliveryId: null,
        shopId: null,
        shopRegionId: null,
        deliveryAddress: '',
        favorites: [],
        orders: [],
      };
    default:
      return state;
  }
}
