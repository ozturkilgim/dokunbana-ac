import React from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,} from 'react-native';
import * as firebase from 'firebase';
import MainButton from '../components/MainButton';


export default class SignUpUserName extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      phonenumber: '+90',
    }
  }

  signUpUserName = (username) => {
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userId).update({
      phoneNumber: this.state.phonenumber,
      
    })
  this.props.navigation.navigate('MainScreen')
      }

  static navigationOptions = {
    title: 'SignUp',
  };
  render() {
    const { navigate } = this.props.navigation;      
    //if (this.state.user) return this.UserLoggedIn;
    
    return (  
      <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Image style={{position: 'absolute'}} source={require('../assets/whitebackground.png')} />
      </TouchableWithoutFeedback>
          <Text style={styles.TextTitle}> Oyuna başlamak için telefon numaranı yaz! </Text>
          <TextInput
          style={styles.TextInput}
          onChangeText={(phonenumber) => this.setState({ phonenumber })}
          value={this.state.phonenumber}
          placeholder='Telefon Numarası'
          maxLength = {13}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType='phone-pad'
          placeholderTextColor='#BDBDBD'
          />  
          <MainButton
          ButtonText="Sign Up"
          onPress={() => this.signUpUserName(this.state.username,this.state.password)}
          />
         </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextTitle: {
    marginTop: 10,
    marginBottom: 20,
    color: '#6747CE',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
    marginLeft: 30,
    marginRight: 30,
    fontWeight: 'bold'
  },
  TextInput: {
    height: 53,
    paddingLeft:10,
    borderColor: '#F5F5F5',
    paddingRight:10,
    marginBottom: 40,
    width: 300,
    borderRadius: 20,
    borderWidth: 2
  }

});