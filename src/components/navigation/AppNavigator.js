import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Profile from '../Profile';
import Home from '../Home';
import Search from '../Search';
import MovieDetails from '../MovieDetails'

import homeIcon from 'assets/ic_home/ic_home.png';
import searchIcon from 'assets/ic_search/search.png';
import settingsIcon from 'assets/ic_settings/ic_settings.png';
import Colors from 'helpers/Colors';

const iconForTab = ({ state }) => {
  switch (state.routeName) {
    case 'Home':
      return homeIcon;
    case 'Search':
      return searchIcon;
    case 'Profile':
      return settingsIcon;
    default:
      return null;
  }
};

const TabIcon = ({ icon, tintColor }) => (// eslint-disable-line
  <Image
    source={icon}
    style={{ tintColor }}
  />
);

const ProfileStack = createStackNavigator({ Profile });
const HomeStack = createStackNavigator({ Home });
const SearchStack = createStackNavigator({ 
  Search: {
    screen: Search,
    navigationOptions: {
      headerTitle: 'Search',
    },
  },
  MovieDetails: {
    screen: MovieDetails,
    navigationOptions: {
      headerTitle: 'Movies Details',
    },
  },
});

const AppStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    Search: SearchStack,
    Profile: ProfileStack,
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: Colors.primary,
      inactiveTintColor: Colors.gray,
      style: {
        backgroundColor: Colors.White,
      },
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => (// eslint-disable-line
        <TabIcon
          icon={iconForTab(navigation)}
          tintColor={tintColor}
        />
      ),
    }),
  },
);

export default AppStack;
