const SET_FILTERS_STATUS = 'SET_FILTERS_STATUS';
const SET_FILTERS_CATEGORY = 'SET_FILTERS_CATEGORY';
const SET_SORT_CATEGORY = 'SET_SORT_CATEGORY';
const SET_FILTERS = 'SET_FILTERS';
const RESET_FILTERS = 'RESET_FILTERS';

const initialState = {
  filtersStatus: false,
  sortCategory: 'popular',
  filtersCategory: null,
  selectedFilters: {},
};

export const setFiltersStatus = value => {
  return async dispatch => {
    dispatch({
      type: SET_FILTERS_STATUS,
      value,
    });
  };
};

export const setSortCategory = value => {
  return async dispatch => {
    dispatch({
      type: SET_SORT_CATEGORY,
      value,
    });
  };
};

export const setFiltersCategory = value => {
  return async dispatch => {
    dispatch({
      type: SET_FILTERS_CATEGORY,
      value,
    });
  };
};

export const setFilters = (code, filters) => {
  return async dispatch => {
    dispatch({
      type: SET_FILTERS,
      code,
      filters,
    });
  };
};

export const resetFilters = () => {
  return async dispatch => {
    dispatch({
      type: RESET_FILTERS,
    });
  };
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTERS_STATUS:
      return {
        ...state,
        filtersStatus: action.value,
      };
    case SET_FILTERS_CATEGORY:
      return {
        ...state,
        filtersCategory: action.value,
      };
    case SET_SORT_CATEGORY:
      return {
        ...state,
        sortCategory: action.value,
      };
    case SET_FILTERS:
      return {
        ...state,
        selectedFilters: {
          ...state.selectedFilters,
          [action.code]: action.filters,
        },
      };
    case RESET_FILTERS:
      return {
        filtersStatus: false,
        filtersCategory: null,
        sortCategory: state.sortCategory,
        selectedFilters: {},
      };
    default:
      return state;
  }
}
