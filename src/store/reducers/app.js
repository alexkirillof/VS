const INCREMENT_START_COUNT = 'INCREMENT_START_COUNT';
const DECREMENT_START_COUNT = 'DECREMENT_START_COUNT';
const CHANGE_WAS_REGISTRATION = 'CHANGE_WAS_REGISTRATION';
const CHANGE_INTERNET_CONNECTION = 'CHANGE_INTERNET_CONNECTION';
const REFRESH_FAVORITES = 'REFRESH_FAVORITES';
const SET_UPDATE_STATUS = 'SET_UPDATE_STATUS';

const initialState = {
  startCount: 0,
  wasRegistration: false,
  internetConnection: true,
  refreshFavorites: false,
  updateStatus: false,
};

export const incrementStartCount = () => {
  return async dispatch => {
    dispatch({
      type: INCREMENT_START_COUNT,
    });
  };
};

export const decrementStartCount = () => {
  return async dispatch => {
    dispatch({
      type: DECREMENT_START_COUNT,
    });
  };
};

export const changeWasRegistration = () => {
  return async dispatch => {
    dispatch({
      type: CHANGE_WAS_REGISTRATION,
    });
  };
};

export const changeInternetConnection = status => {
  return async dispatch => {
    dispatch({
      type: CHANGE_INTERNET_CONNECTION,
      status,
    });
  };
};

export const refreshFavorites = () => {
  return async dispatch => {
    dispatch({
      type: REFRESH_FAVORITES,
    });
  };
};

export const setUpdateStatus = status => {
  return async dispatch => {
    dispatch({
      type: SET_UPDATE_STATUS,
      status,
    });
  };
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_START_COUNT:
      return {
        ...state,
        startCount: state.startCount + 1,
      };
    case DECREMENT_START_COUNT:
      return {
        ...state,
        startCount: state.startCount > 0 ? state.startCount - 1 : 0,
      };
    case CHANGE_WAS_REGISTRATION:
      return {
        ...state,
        wasRegistration: true,
      };
    case CHANGE_INTERNET_CONNECTION:
      return {
        ...state,
        internetConnection: action.status,
      };
    case SET_UPDATE_STATUS:
      return {
        ...state,
        updateStatus: action.status,
      };
    case REFRESH_FAVORITES:
      return {
        ...state,
        refreshFavorites: !state.refreshFavorites,
      };
    default:
      return state;
  }
}
