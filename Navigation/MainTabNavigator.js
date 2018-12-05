import React from 'react';
import {
    createStackNavigator,
    createAppContainer
  } from 'react-navigation';
import ButtonScreen from '../pages/ButtonScreen';
import OnTouchButton from '../pages/OnTouchButton';
import LoginScreen from '../pages/LoginScreen';
import SignUpScreen from '../pages/SignUpScreen'
import SignUpPhone from '../pages/SignUpPhone';
import SignUpUserName from '../pages/SignUpUserName';
import WinScreen from '../pages/WinScreen';
import FailScreen from '../pages/FailScreen';
import MainScreen from '../pages/MainScreen';
import MoneyReset from '../pages/MoneyReset';


  const MainTabNavigator = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen, 
    },
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
    FailScreen: {
      screen: FailScreen,
      navigationOptions: {
        gesturesEnabled: false,
    },
    },
    SignUpPhone: {
      screen: SignUpPhone
    },
    MainScreen: {
      screen: MainScreen,
      navigationOptions: {
        gesturesEnabled: false,
    },
    },
    
    WinScreen: {
      screen: WinScreen,
      navigationOptions: {
        gesturesEnabled: false,
    },
    },
    
    Button: {
      screen: ButtonScreen,
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
    
    SignUpScreen: {
      screen: SignUpScreen
    },
    SignUpUserName: {
      screen: SignUpUserName,
      navigationOptions: {
        gesturesEnabled: false,
    },
    },
    
  },
  {
    initialRouteName:  'SignUpPhone',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  },
);

const AppContainer = createAppContainer(MainTabNavigator);
export default createAppContainer(AppContainer);



