
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

export const getTopRateMovies = (pageIndex) => async (dispatch) => {
  dispatch(getListTopRated());
  try {
    const movies = await MovieController.getTopRated(pageIndex);
    return dispatch(getListTopRatedSuccess(mapper(movies.results), pageIndex, movies.total_pages));
  } catch (error) {
    console.log(error)
    return dispatch(getListTopRatedFailed(error.message));
  }
};

export const getPopularMovies = (pageIndex) => async (dispatch) => {
  dispatch(getListPopular());
  try {
    const movies = await MovieController.getPopular(pageIndex);
    return dispatch(getListPopularSuccess(mapper(movies.results), pageIndex, movies.total_pages));
  } catch (error) {
    console.log(error)
    return dispatch(getListPopularFailed(error.message));
  }
};

