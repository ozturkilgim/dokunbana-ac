import React from 'react';
import { StyleSheet,
  Text,
  View,} from 'react-native';
import ButtonBorder from '../components/ButtonBorder';
import * as firebase from 'firebase';


export default class WinScreen extends React.Component {
  static navigationOptions = {
    title: 'WinScreen',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (  
        
        <View style={styles.container}>
        <ButtonBorder
          ButtonText="Ana Sayfa"
          onPress={() => this.props.navigation.navigate('MainScreen')}
          onPress={() => this.moneySend()}
          />
            <Text style={styles.TextTitle}>Kazandın Bro, {this.props.timer} saniye geçti!</Text>
         </View>
    );
  }
  componentWillMount () {
    
    const OnlineRef = firebase.database().ref('OnlineUser');
      const OnlineUserNumberRef = OnlineRef.child('Number');
      OnlineUserNumberRef.on('value', snap => {
          this.setState({
          OnlineUserNumber: snap.val() })
        });

      const UserOnlineRef = firebase.database().ref('users/' + userId);
      const NowMoneyRef = UserOnlineRef.child('UserOwnMoney');
      NowMoneyRef.on('value', snap => {
          this.setState({
          NowMoney: snap.val() })
        });
            
             
          
      
      const GameRef = firebase.database().ref('Game');
      const MoneyRef = GameRef.child('Money');
      MoneyRef.on('value', snap => {
      this.setState({
      GameMoney: snap.val() })
          });
          
          firebase.database().ref('users/' + userId).update({
            UserOwnMoney: this.state.GameMoney + this.state.NowMoney,
              }); 
}
}

//<Image source={require('../assets/MainPage_background.png')} />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7654D2',
    alignItems: 'center',
    justifyContent: 'center',
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
});