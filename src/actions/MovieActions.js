
import MovieController from '../controllers/MovieController';
import { mapper } from '../helpers/Utils'

export const actionTypes = {
  GET_LIST_MOVIES: 'GET_LIST_MOVIES',
  GET_LIST_TOP_RATED_MOVIES_REQUEST: 'GET_LIST_TOP_RATED_MOVIES_REQUEST',
  GET_LIST_MOVIES_ERROR: 'GET_LIST_MOVIES_ERROR',
  GET_LIST_TOP_RATED_MOVIES_SUCCESS: 'GET_LIST_TOP_RATED_MOVIES_SUCCESS',

  GET_LIST_POPULAR_MOVIES_REQUEST: 'GET_LIST_POPULAR_MOVIES_REQUEST',
  GET_LIST_POPULAR_MOVIES_ERROR: 'GET_LIST_POPULAR_MOVIES_ERROR',
  GET_LIST_POPULAR_MOVIES_SUCCESS: 'GET_LIST_POPULAR_MOVIES_SUCCESS',

  CLEAR_SEARCH_MOVIES: 'CLEAR_SEARCH_MOVIES',
  SEARCH_MOVIES_REQUEST: 'SEARCH_MOVIES_REQUEST',
  SEARCH_MOVIES_REQUEST_SUCCESS: 'SEARCH_MOVIES_REQUEST_SUCCESS',
  SEARCH_MOVIES_REQUEST_FAILED: 'SEARCH_MOVIES_REQUEST_FAILED',

};

const getListTopRated = () => ({
  type: actionTypes.GET_LIST_TOP_RATED_MOVIES_REQUEST,
});

const getListTopRatedFailed = error => ({
  type: actionTypes.GET_LIST_MOVIES_ERROR,
  error,
});

const getListTopRatedSuccess = (movies, pageIndex, totalPages) => ({
  type: actionTypes.GET_LIST_TOP_RATED_MOVIES_SUCCESS,
  movies,
  pageIndex,
  totalPages,
});

const getListPopular = () => ({
  type: actionTypes.GET_LIST_TOP_RATED_MOVIES_REQUEST,
});

const getListPopularFailed = error => ({
  type: actionTypes.GET_LIST_POPULAR_MOVIES_ERROR,
  error,
});

const getListPopularSuccess = (movies, pageIndex, totalPages) => ({
  type: actionTypes.GET_LIST_POPULAR_MOVIES_SUCCESS,
  movies,
  pageIndex,
  totalPages,
});

const searchMovie = () => ({
  type: actionTypes.SEARCH_MOVIES_REQUEST
})

const clearSearchMovie = () => ({
  type: actionTypes.CLEAR_SEARCH_MOVIES
})

const searchMovieSuccess = (searchResult, pageIndex, totalPages) => ({
  type: actionTypes.SEARCH_MOVIES_REQUEST_SUCCESS,
  searchResult,
  pageIndex,
  totalPages,
})

const searchMovieFailed = (error) => ({
  type: actionTypes.SEARCH_MOVIES_REQUEST_FAILED, 
  error
})

export const getTopRateMovies = (pageIndex = 1) => async (dispatch) => {
  dispatch(getListTopRated());
  try {
    const movies = await MovieController.getTopRated(pageIndex);
    return dispatch(getListTopRatedSuccess(mapper(movies.results), pageIndex, movies.total_pages));
  } catch (error) {
    console.log(error)
    return dispatch(getListTopRatedFailed(error.message));
  }
};

export const getPopularMovies = (pageIndex = 1) => async (dispatch) => {
  dispatch(getListPopular());
  try {
    const movies = await MovieController.getPopular(pageIndex);
    return dispatch(getListPopularSuccess(mapper(movies.results), pageIndex, movies.total_pages));
  } catch (error) {
    console.log(error)
    return dispatch(getListPopularFailed(error.message));
  }
};

export const callSearchMovies = (pageIndex, searchText) => async (dispatch) => {
  dispatch(searchMovie());
  try {
    const searchResult = await MovieController.search(pageIndex, searchText);
    return dispatch(searchMovieSuccess(searchResult.results, pageIndex, searchResult.total_pages));
  } catch (error) {
    console.log(error)
    return dispatch(searchMovieFailed(error));
  }
}

export const callClearSearchState = () => async (dispatch) => {
  dispatch(clearSearchMovie());
}