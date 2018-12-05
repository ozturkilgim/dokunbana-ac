import React from 'react';
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import ButtonBorderBig from '../components/ButtonBorderBig';

export default class MoneyReset extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      StateMoney: '0',
    }
  }

  static navigationOptions = {
    title: 'MainScreen',
  }

  render() {
    const { navigate } = this.props.navigation;      
    
    return (  
      <View onPress={() => {Keyboard.dismiss()}} style={styles.container}>
      <Image onPress={() => {Keyboard.dismiss()}} style={{position: 'absolute'}} source={require('../assets/MainPage_background.png')}>
      </Image>
      <Image source={require('../assets/DokunBanaBeyaz.png')} style={{marginBottom: 50, width: 100, height: 100}} />
      <Text style={{fontSize: 40, fontWeight: 'bold', marginBottom: 20, color: '#fff'}}>Merhaba, {this.state.username}! </Text>
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.props.navigation.navigate('MoneyReset')}>
          <Image style={{width: 24, height: 28}} source={require('../assets/money-bag.png')} />
          <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom: 20, color: '#fff'}}> Bakiye:     {this.state.StateMoney}₺ </Text>
          </TouchableOpacity>
          </View>


          <View style={{flexDirection: 'row', justifyContent: 'center', width: 100, marginTop: 30,}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 0, marginTop: 60, marginRight: 20, color: '#fff'}}>Sıradaki Oyun:</Text>

          <ImageBackground style={styles.ImageStyle} source={require('../assets/NextGame.png')}>
          <Text style={{fontSize: 28, fontWeight: 'bold', marginBottom: 15, marginTop: 70, marginLeft: 15, color: '#fff'}}>{this.state.GameMoney}₺</Text>
          </ImageBackground>

          <Text style={{fontSize: 23, fontWeight: 'bold', marginBottom: 20, marginTop: 40, marginLeft: 25, color: '#fff'}}>28 Kasım 19.30</Text>
          </View>
          <ButtonBorderBig
          ButtonText="Oyuna Başla"
          onPress={() => this.ToGame()}
          />
         </View>
    );
  }

  ToGame() {
    if (this.state.GameExist==1) {
      this.props.navigation.navigate('OnTouchButton')
    }
    else {
      alert("Oyun henüz başlamadı")
      alert("Oyun başlamadan 5 dk önce hazır ol!")
    }
  }

  componentWillMount() {
    if (firebase.auth().currentUser) {
          
      userId = firebase.auth().currentUser.uid;
      if (userId) {
        const UserRef = firebase.database().ref('users/' + userId);
        const UserMoneyRef = UserRef.child('UserOwnMoney');
        UserMoneyRef.on('value', snap => {
              this.setState({
              StateMoney: snap.val()
              })
            });
        const UsernameRef = UserRef.child('username');
        UsernameRef.on('value', snap => {
          this.setState({
          username: snap.val()
          })
        });
        const GameRef = firebase.database().ref('Game');
          const MoneyRef = GameRef.child('Money');
          MoneyRef.on('value', snap => {
          this.setState({
          GameMoney: snap.val() })
              });
          
          const GameTimeRef = GameRef.child('GameTime');
          GameTimeRef.on('value', snap => {
          this.setState({
          GameTime: snap.val() })
              });
          const GameExistRef = GameRef.child('GameExist');
          GameExistRef.on('value', snap => {
          this.setState({
            GameExist: snap.val() })
              });
              
          }
         }
    }
    componentDidMount() {
      if (firebase.auth().currentUser) {
          
        userId = firebase.auth().currentUser.uid;
        if (userId) {
          const UserRef = firebase.database().ref('users/' + userId);
          const UserMoneyRef = UserRef.child('UserOwnMoney');
          UserMoneyRef.on('value', snap => {
                this.setState({
                StateMoney: snap.val()
                })
              });
          const UsernameRef = UserRef.child('username');
          UsernameRef.on('value', snap => {
            this.setState({
            username: snap.val()
            })
          });
          const GameRef = firebase.database().ref('Game');
            const MoneyRef = GameRef.child('Money');
            MoneyRef.on('value', snap => {
            this.setState({
            GameMoney: snap.val() })
                });
            
            const GameTimeRef = GameRef.child('GameTime');
            GameTimeRef.on('value', snap => {
            this.setState({
            GameTime: snap.val() })
                });
            const GameExistRef = GameRef.child('GameExist');
            GameExistRef.on('value', snap => {
            this.setState({
              GameExist: snap.val() })
                });
                
            }
           }
    }
        
}

const styles = StyleSheet.create({
  TextTitle: {
    marginTop: 10,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    marginBottom: 20,    
    marginLeft: 30,
    marginRight: 30,
    fontWeight: 'black',
  },
  ImageStyle: {
    height: 126,
    width: 109,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  TextTitle: {
    marginTop: 10,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#6747CE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextStyle: {
    marginTop: 10,
    color: '#6747CE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    height: 53,
    paddingLeft:10,
    borderColor: '#F5F5F5',
    paddingRight:10,
    marginBottom: 25,
    width: 300,
    borderRadius: 20,
    borderWidth: 2
  }

});