import _ from 'lodash'
import { mapper } from 'helpers/Utils';


export const listMovies = state => state.movies.listData;
export const listIdMovies = state => state.movies.listIds;
export const pageIndexInfo = state => state.movies.pageIndex;
export const totalPageInfo = state => state.movies.totalPage;
export const listViewData = state => {
  const {listIds, listData} = state.movies;
  return _.compact(listIds.map(id => listData[id]));
};


export const listPopularMovies = state => state.movies.listDataPopular;
export const listIdPopularMovies = state => state.movies.listIdsPopular;
export const pagePopularIndexInfo = state => state.movies.pageIndexPopular;
export const totalPagePopularInfo = state => state.movies.totalPagePopular;
export const listViewPopularData = state => {
  const {listIdsPopular, listDataPopular} = state.movies;
  return _.compact(listIdsPopular.map(id => listDataPopular[id]));
};

export const searchResult = state => state.movies.searchResult;
export const searchResultIndex = state => state.movies.searchResultIndex;
export const searchResultTotalPage = state => state.movies.searchResultTotalPage;
export const formattedSearchResult = state => {
  const currentResult = state.movies.searchResult;
  return mapper(currentResult).listData
}
