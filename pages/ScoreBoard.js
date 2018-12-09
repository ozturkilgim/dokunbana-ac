import React from 'react'
import {Component} from 'react'
import {
ListView,
Text,
FlatList } from 'react-native';
import firebase from '@firebase/app'

export default class ScoreBoard extends Component {

 constructor(props){
 super(props)
 userId = firebase.auth().currentUser.uid;

 this.dataRef = firebase.database().ref('ScoreBoard/' + 'game1');

   this.state = {
     dataSource: new ListView.DataSource({
       rowHasChanged: (row1, row2) => row1 !== row2,
     })
   };

  }
  
  listenForProfiles(dataRef){
    dataRef.on('value', (snap) => {

      var scores = [];
      snap.forEach((child) => {
        scores.push({
          Rank: child.val().Rank,
          userName: child.val().userName,
          userIdData: child.val().userId,
          _key: child.key
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(scores)
      });
    });
  }

  componentDidMount() {
    this.listenForProfiles(this.dataRef);
    
  }


render(){
 return(
  <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
      />
 )
 }
}