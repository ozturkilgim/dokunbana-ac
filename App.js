import React from 'react';
import * as firebase from 'firebase';
import AppContainer from './Navigation/MainTabNavigator.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDo35t4nxfNmuUnqy65o3NFuUmlM9WMd6w',
  authDomain: 'dokun-bana-ad966.firebaseapp.com',
  databaseURL: 'https://dokun-bana-ad966.firebaseio.com',
  storageBucket: 'dokun-bana-ad966.appspot.com',
  projectId:  "dokun-bana-ad966",
};

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
      return (
      <AppContainer />
      
    );
  }
}
