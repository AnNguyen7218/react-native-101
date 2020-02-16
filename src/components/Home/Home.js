import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList, 
  ScrollView,
  Image
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash'
import { BASE_IMG_URL } from 'react-native-dotenv';

import styles from './styles';

import TextStyles from 'helpers/TextStyles';
import strings from 'localization';

import getUser from 'selectors/UserSelectors';
import {listIdMovies, listMovies, pageIndexInfo, totalPageInfo, listViewData, listPopularMovies, listIdPopularMovies, pagePopularIndexInfo, totalPagePopularInfo, listViewPopularData} from 'selectors/MoviesSelectors';

import { getTopRateMovies, getPopularMovies } from 'actions/MovieActions';

function Home() {
  const user = useSelector(state => getUser(state));

  const moviesList = useSelector(state => listMovies(state));
  const movieIdsList = useSelector(state => listIdMovies(state));
  const pageIndex = useSelector(state => pageIndexInfo(state));
  const totalPage = useSelector(state => totalPageInfo(state));
  const topRatedData = useSelector(state => listViewData(state));

  const moviesPopularList = useSelector(state => listPopularMovies(state));
  const movieIdsPopularList = useSelector(state => listIdPopularMovies(state));
  const pagePopularIndex = useSelector(state => pagePopularIndexInfo(state));
  const totalPopularPage = useSelector(state => totalPagePopularInfo(state));
  const popularData = useSelector(state => listViewPopularData(state));

  const dispatch = useDispatch();
  
  const getMessage = useCallback(() => `${strings.homeMessage} ${user && user.name}`, [user]);
  
  const getTopRated = useCallback((pageIndex) => dispatch(getTopRateMovies(pageIndex), [dispatch]));
  const getPopular = useCallback((pagePopularIndex) => dispatch(getPopularMovies(pagePopularIndex), [dispatch]));
  

  useEffect(() => {
    if (_.isEmpty(moviesList) && _.isEmpty(topRatedData)) {
      getTopRated(0)
    }
    if (_.isEmpty(moviesPopularList) && _.isEmpty(popularData)) {
      getPopular(0)
    }
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={TextStyles.lightTitle}>
          {getMessage()}
        </Text>
          <Text style={TextStyles.lightTitle}>
            Top Rated Movies
          </Text>
          <View>
            {!_.isEmpty(topRatedData) && 
              <FlatList 
                onEndReachedThreshold={1}
                style={styles.scrollView}
                data = {topRatedData}
                onEndReached={() => getTopRated(pageIndex)}
                renderItem={({item}) => {
                  return (
                    <View key={item.id} style={styles.movieItem}>
                      <Image
                        style={{width: 150, height: 250}}
                        source={{uri: BASE_IMG_URL+item.poster_path}}
                      />
                    </View>
                  )
                }}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            }
          </View>
          <Text style={TextStyles.lightTitle}>
            Top Popular Movies
          </Text>
          <View>
            {!_.isEmpty(popularData) && 
              <FlatList 
                onEndReachedThreshold={1}
                style={styles.scrollView}
                data = {popularData}
                onEndReached={() => getPopular(pagePopularIndex)}
                renderItem={({item}) => {
                  return (
                    <View key={item.id} style={styles.movieItem}>
                      <Image
                        style={{width: 150, height: 250}}
                        source={{uri: BASE_IMG_URL+item.poster_path}}
                      />
                    </View>
                  )
                }}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            }
          </View>
      </View>
    </ScrollView>
  );
}

Home.navigationOptions = {
  title: strings.home,
};

export default Home;
