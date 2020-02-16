import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { BASE_IMG_URL } from 'react-native-dotenv';

import {
    View,
    Text,
    FlatList, 
    Image,
    TouchableOpacity
  } from 'react-native';
import _ from 'lodash'

import strings from 'localization';
import SearchInput from '../common/SearchInput'
import { callSearchMovies, callClearSearchState } from 'actions/MovieActions';
import { searchResultIndex, searchResult } from 'selectors/MoviesSelectors'
import styles from './styles';

const Search = ({navigation}) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const searchIndex = useSelector(state => searchResultIndex(state));
  const currentSearchResult = useSelector(state => searchResult(state));

  const callSearch = useCallback((idx, text) => dispatch(callSearchMovies(idx, text), [dispatch]));
  const callClearSearch = useCallback(() => dispatch(callClearSearchState(), [dispatch]));

  const callSetText = useCallback(text => {
    const index = searchIndex ? searchIndex : 1
    setText(text);
    debounceChangeText(index, text);
  })

  const debounceChangeText = _.debounce((searchIndex, text) => {
    callClearSearch() 
    callSearch(searchIndex, text)
  }, 500)

  useEffect(() => {
    if (!_.isEmpty(currentSearchResult)) {
      setText('')
    }
  }, [])

  return ( 
    <View style={styles.container}>
      <SearchInput text={text} setText={callSetText} /> 
      {!_.isEmpty(currentSearchResult) && 
        <FlatList 
          onEndReachedThreshold={1}
          style={styles.scrollView}
          data = {currentSearchResult}
          onEndReached={() => debounceChangeText(searchIndex, text)}
          renderItem={({item}) => {
            return (
              <TouchableOpacity key={item.id} style={styles.movieItem} onPress={() => navigation.navigate('MovieDetails', {id: item.id})}>
                <Image
                  style={{width: 100, height: 200}}
                  source={{uri: BASE_IMG_URL+item.poster_path}}
                />
                <View style={styles.wrapInfo}>
                  <Text style={styles.title}>{item.original_title}</Text>
                  <Text style={styles.overview} numberOfLines={5} ellipsizeMode='tail'>{item.overview}</Text>
                  <Text style={styles.published}>{strings.published}: {item.release_date}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
          keyExtractor={item => item.id.toString()}
        />
      }
    </View>
  );
};

Search.navigationOptions = {
  title: strings.search,
};

export default Search;