import { ENDPOINT } from './endpoints';
import { API_KEY, API_URL } from 'react-native-dotenv';
import axios from 'axios';

class MovieController {
  getTopRated = async (index) => {
    let page = index >= 1 ? '&page='+index : ''
    let url = API_URL+ENDPOINT.TOP_RATE()+'?api_key='+API_KEY+page
    try {
      const result = await axios.get(url)
      return result.data
    } catch (error) {
      return error
    }
  }
  getPopular = async (index) => {
    let page = index >= 1 ? '&page='+index : ''
    let url = API_URL+ENDPOINT.POPULAR()+'?api_key='+API_KEY+page
    console.log(url)
    try {
      const result = await axios.get(url)
      console.log(result)
      return result.data
    } catch (error) {
      return error
    }
  }
  // search = async () => {
  //   try {
  //     const result = await httpClient.post({
  //       url: endpoints.TOP_RATE()+'?api_key='+API_KEY,
  //       method: 'POST',
  //       data: {
  //         email,
  //         password,
  //       },
  //     });
  //     console.log(result.data)
  //     return {};
  //   } catch (error) {
  //     return error;
  //   }
  // },
  // getMovieDetails = async (movieId) => {
  //   try {
  //     const result = await httpClient.post({
  //       url: endpoints.DETAILS_MOVIE(movieId)+'?api_key='+API_KEY,
  //       method: 'GET',
  //       data: {
  //         email,
  //         password,
  //       },
  //     });
  //     console.log(result.data)
  //     return {};
  //   } catch (error) {
  //     return error;
  //   }
  // }
}

export default new MovieController();
  