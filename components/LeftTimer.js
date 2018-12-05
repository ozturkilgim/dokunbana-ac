import React from 'react';
import { StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity  } from 'react-native';
import * as firebase from 'firebase';


export default class OnTouchButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      timer: 0,
      score: 0,
      showCancel: true,
    }
  }

  static navigationOptions = {
  };

  render() {
    
    const { navigate } = this.props.navigation;
    return(
      <View>
        <Text style={styles.TextStyle}>
                            {this.state.LeftTimer} saniye kaldı
                            </Text>
                </View>
    )
  }
  componentWillMount () {
          const GameRef = firebase.database().ref('Game');
          const StartedGameRef = GameRef.child('StartedGame');
          StartedGameRef.on('value', snap => {
          this.setState({
            StartedGame: snap.val() })
              });
              
          const GameExistRef = GameRef.child('GameExist');
          GameExistRef.on('value', snap => {
          this.setState({
            GameExist: snap.val() })
              });
          const LeftTimerRef = GameRef.child('LeftTimer');
          LeftTimerRef.on('value', snap => {
          this.setState({
            LeftTimer: snap.val() })
              });
          
              if (this.state.GameExist==1) {
                doIntervalChange =() => {
                  this.myInterval = setInterval(() => {
                  this.setState(prevState => ({
                    LeftTimer: prevState.LeftTimer - 1
                }))
              }, this.state.LeftTimer)
              if (this.prevState.LeftTimer==0) {
                firebase.database().ref('Game').update({
                  StartedGame: 1,
                })
              }
              }
              }
              else{
              }

              
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7654D2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextTitle: {
    marginTop: 10,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
    marginBottom: 20,  
    marginLeft: 30,
    marginRight: 30,
  },
  buttonstyle: {
    height: 250,
    width: 250,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textstyle: {
    color: 'white',
    fontSize: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagestyle: {
    width: 100,
    height: 100,
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    alignItems: 'center',
    fontSize: 50,
    color: 'white',
    marginTop: 50,
  },
});
