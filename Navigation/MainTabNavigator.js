import React from 'react';
import {
    createStackNavigator,
    createAppContainer
  } from 'react-navigation';
import OnTouchButton from '../pages/OnTouchButton';
import SignUpAno from '../pages/SignUpAno';
import MainScreen from '../pages/MainScreen';
import MoneyReset from '../pages/MoneyReset';
import ScoreBoard from '../pages/ScoreBoard';

  const MainTabNavigator = createStackNavigator(
  {
    MoneyReset: {
      screen: MoneyReset,
      headerMode: 'screen',
      navigationOptions: {
        headerVisible: true,
    },
      header: ({ goBack }) => ({
        left: <Left onPress={goBack} />,
      }),
    },

    SignUpAno: {
      screen: SignUpAno
    },
    ScoreBoard: {
      screen: ScoreBoard
    },
    MainScreen: {
      screen: MainScreen,
      navigationOptions: {
        gesturesEnabled: false,
    },
    },

    OnTouchButton: {
      screen: OnTouchButton,
      navigationOptions: { 
        gesturesEnabled: false,
    },
    },
  },
  {
    initialRouteName:  'SignUpAno',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  },
);

const AppContainer = createAppContainer(MainTabNavigator);
export default createAppContainer(AppContainer);



