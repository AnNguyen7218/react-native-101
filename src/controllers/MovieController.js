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
    try {
      const result = await axios.get(url)
      return result.data
    } catch (error) {
      return error
    }
  }

  search = async (index, searchText) => {
    let page = index >= 1 ? '&page='+index : ''
    let query = '&query='+searchText
    let url = API_URL+ENDPOINT.SEARCH()+'?api_key='+API_KEY+query+page
    try {
      const result = await axios.get(url)
      return result.data
    } catch (error) {
      return error;
    }
  }
}

export default new MovieController();
  