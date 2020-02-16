import { actionTypes } from 'actions/MovieActions';
import _ from 'lodash'

const initialState = {
  listData: {},
  listIds: [],
  pageIndex: 1,
  totalPage: 0,
  listDataPopular: {},
  listIdsPopular: [],
  pageIndexPopular: 1,
  totalPagePopular: 0,
  searchResultIndex: 1,
  searchResult: [],
  searchResultTotalPage: 0
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIST_TOP_RATED_MOVIES_REQUEST:
      return {
        ...state,
      };
    case actionTypes.GET_LIST_TOP_RATED_MOVIES_SUCCESS:
      let totalPage = action.movies.totalPages
      let currentIndex = action.movies.pageIndex
      let nextIndex = _.isNumber(currentIndex) ? currentIndex + 1 : state.pageIndex + 1
      if (nextIndex >= totalPage) {
        nextIndex = totalPage
      }
      return {
        ...state,
        listData: {...state.listData, ...action.movies.listData},
        listIds: _.compact(_.union(state.listIds, action.movies.listIds)),
        totalPage,
        pageIndex: nextIndex,
      };

    case actionTypes.GET_LIST_POPULAR_MOVIES_REQUEST:
      return {
        ...state,
      };
    case actionTypes.GET_LIST_POPULAR_MOVIES_SUCCESS:
      let totalPagePopular = action.movies.totalPages
      let currentPopularIndex = action.movies.pageIndex
      let nextPopularIndex = _.isNumber(currentPopularIndex) ? currentPopularIndex + 1 : state.pageIndex + 1
      if (nextPopularIndex >= totalPagePopular) {
        nextPopularIndex = totalPagePopular
      }
      return {
        ...state,
        listDataPopular: {...state.listDataPopular, ...action.movies.listData},
        listIdsPopular: _.compact(_.union(state.listIdsPopular, action.movies.listIds)),
        totalPagePopular,
        pageIndexPopular: nextPopularIndex,
      };

    case actionTypes.SEARCH_MOVIES_REQUEST:
      return {
        ...state,
      };
    case actionTypes.SEARCH_MOVIES_REQUEST_SUCCESS:
      const receivedSearchResult = action.searchResult
      const {pageIndex, totalPages} = action

      let nextSearchIndex = _.isNumber(pageIndex) ? pageIndex + 1 : state.pageIndex + 1
      if (nextSearchIndex >= totalPages) {
        nextSearchIndex = totalPages
      }
      return {
        ...state,
        searchResult: _.compact(_.union(state.searchResult, receivedSearchResult)),
        searchResultTotalPage: totalPages,
        searchResultIndex: nextSearchIndex,
      };
    case actionTypes.SEARCH_MOVIES_REQUEST_FAILED:
      return {
        ...state,
      };
    case actionTypes.CLEAR_SEARCH_MOVIES: 
      return {
        ...state,
        searchResult: [],
        searchResultTotalPage: 0,
        searchResultIndex: 1
      };
    default:
      return state;
  }
};

export default movieReducer;
