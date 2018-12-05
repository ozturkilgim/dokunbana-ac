import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  ActivityIndicator, } from 'react-native';
import * as firebase from 'firebase';
import MainButton from '../components/MainButton';
import ButtonBorder from '../components/ButtonBorder';


export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      email: '',
      password: '',
      errorMessage: null,
      authenticating: false,
    }
  }

  createUser = () => {
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userId).update({
        email: this.state.email,
        username: this.state.username,
        UserOwnMoney: 0,
        userId,
        
      })
  }
  
  signUpUser = (email, password) => {
    firebase
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => this.setState({  authenticating: true }))
    .then(() => alert("SignUp Completed!") )
    .then(this.createUser)
    .then(() => this.props.navigation.navigate('SignUpPhone') )

    .catch(error => 
      alert('Kaydolamadın!  Lütfen tekrar dene!   '+error)) 
    .catch(error => 
      this.setState({ authenticating: false }))    
  }
  static navigationOptions = {
    title: 'SignUp',
  };

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        authenticating: false,
        user,
      });
    });
  }
  
  render() {
    const { navigate } = this.props.navigation;      
    //if (this.state.user) return this.UserLoggedIn;

    if (this.state.authenticating==true) {
      return (
      <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      </View>
      )
    }
    else {

      return (  
        <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Image style={{position: 'absolute'}} source={require('../assets/whitebackground.png')} />
            </TouchableWithoutFeedback>  
            <Text style={styles.TextTitle}> Dokunmaya hazır mısın? </Text>
            <Text style={styles.TextTitle}> Hemen Kaydol! </Text>
            <TextInput
              style={styles.TextInput}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="E-mail"
              placeholderTextColor='#BDBDBD'
            />
            <TextInput
            style={styles.TextInput}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            placeholder='Şifre'
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            placeholderTextColor='#BDBDBD'
            />
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
            onPress={() => this.signUpUser(this.state.email,this.state.password)}
            />
            <ButtonBorder
            ButtonText="Giriş Yap"
            onPress={() => this.props.navigation.navigate('LoginScreen')}
            />
           </View>
      );
    }
    
   
  }
}

const styles = StyleSheet.create({
  TextTitle: {
    marginTop: 10,
    color: '#6747CE',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
    marginBottom: 20,    
    marginLeft: 30,
    marginRight: 30,
    fontWeight: 'bold'
  },
  TextTitle: {
    marginTop: 10,
    color: '#6747CE',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
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