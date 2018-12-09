import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
  StyleSheet,} from 'react-native';
import * as firebase from 'firebase';
import MainButton from '../components/MainButton';

export default class SignUpAno extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }
  }  
  render() {
    const { navigate } = this.props.navigation;
    
      return (  
        <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Image style={{position: 'absolute'}} source={require('../assets/whitebackground.png')} />
            </TouchableWithoutFeedback>  
            <Text style={styles.TextTitle}> Dokunmaya hazır mısın? </Text>
            <Text style={styles.TextTitle}> Hemen Kaydol! </Text>

            <TextInput
              style={styles.TextInput}
              onChangeText={(username) => this.setState({ username })}
              value={this.state.username}
              autoCorrect={false}
              maxLength = {20}
              autoCapitalize="none"
              placeholder="İsim"
              placeholderTextColor='#BDBDBD'
            />  
            <MainButton
            ButtonText="Kaydol" 
            onPress={() => this.signIn()}
            />
           </View>
      );
    }
    startApp(){

      this.props.navigation.navigate('MainScreen')
    }
  componentDidMount() {
   firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user: user}, () => {
        if (this.state.user != null)
          this.startApp();
      });
    });

  }
  forward() {
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userId).update({
      username: this.state.username,
      UserOwnMoney: 0,
      userId,
    })
    this.props.navigation.navigate('MainScreen')
  }
  /*SignInFunct() {
      this.props.navigation.navigate('MainScreen')  
      alert("SignUp Completed!")

      const userId = firebase.auth().currentUser.uid;
      firebase.database().ref('users/' + userId).update({
        username: this.state.username,
        UserOwnMoney: 0,
        userId
            })
  }*/
  signIn() {   
        if (this.state.username && this.state.username.length) {
          firebase.auth().signInAnonymously()
          .then(() => this.forward())
          .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode);
              console.log(errorMessage);
      })
      alert("SignUp Completed!")
      
          
      }
        else {
            alert("Lütfen Doldurun!")
    } 
}
}

const styles = StyleSheet.create({
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