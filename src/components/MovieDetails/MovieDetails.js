import React from 'react';
import {View, Text, Image} from 'react-native'
import { useSelector } from 'react-redux'
import { BASE_IMG_URL } from 'react-native-dotenv';

import { formattedSearchResult } from 'selectors/MoviesSelectors'

import styles from './styles'

const MovieDetails = ({ route, navigation }) => {
  const movieId = navigation.state.params.id
  const currentSearchResult = useSelector(state => formattedSearchResult(state));
  const movieDetails = currentSearchResult[movieId]
  const photoUrl = movieDetails.backdrop_path || movieDetails.poster_path

  return (
    <View>
      <Image 
        style={{width: 500, height: 200}}
        source={{uri: BASE_IMG_URL+movieDetails.backdrop_path}}
      />
      <Text style={styles.title}>{movieDetails.original_title}</Text>
      <Text style={styles.overview}>{movieDetails.overview}</Text>
    </View>
  )
}

export default MovieDetails