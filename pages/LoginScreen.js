import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Keyboard,
  ActivityIndicator,
  TouchableWithoutFeedback,
  StatusBar } from 'react-native';
import * as firebase from 'firebase';
import MainButton from '../components/MainButton';
import ButtonBorder from '../components/ButtonBorder';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      email: '',
      password: '',
      errorMessage: null,
      authenticating: false,
    }
  }

  loginUser = (email, password) => {

      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.setState({  authenticating: true }))
      .then(() => this.props.navigation.navigate('SignUpPhone'))
      
      .catch(error => 
          alert('Giriş Yapamadın! Lütfen tekrar dene!'+error))
      .catch(error => 
        this.setState({ authenticating: false }))
          

        if (firebase.auth().currentUser) {
          
          userId = firebase.auth().currentUser.uid;
        }
    }

  componentDidMount() {
    StatusBar.setHidden(false);
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        authenticating: false,
        user,
      });
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }
  
  static navigationOptions = {
    //title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    
    if (this.state.authenticating==true) {
      return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
      )
    }
    if (this.state.authenticating==false) {
      return (  
      
        <View onPress={() => {Keyboard.dismiss()}} style={styles.container}>
        
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Image onPress={() => {Keyboard.dismiss()}} style={{position: 'absolute'}} source={require('../assets/whitebackground.png')}></Image>    
          </TouchableWithoutFeedback>
          
          <Image source={require('../assets/DokunBana.png')} style={{marginBottom: 20, width: 100, height: 100}} />
  
              
                  <Text style={styles.TextTitle}> Dokunmaya hazır mısın?</Text>  
  
                  <TextInput
                    style={styles.TextInput}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Email"
                    placeholderTextColor='#BDBDBD'
                  />
  
  
                  <TextInput
                  style={styles.TextInput}
                  onChangeText={(password) => this.setState({ password })}
                  value={this.state.password}
                  placeholder='Password'
                  secureTextEntry={true}
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholderTextColor='#BDBDBD'
                  />
  
  
                  <MainButton
                  ButtonText="Giriş Yap"
                  onPress={() => this.loginUser(this.state.email,this.state.password)}
                  />
  
  
                  <ButtonBorder
                  ButtonText="Hemen Kaydol!"
                  onPress={() => this.props.navigation.navigate('SignUpScreen')}
                  />
           </View>
      );
    }
    
  }
}

const styles = StyleSheet.create({
  TextTitle: {
    marginTop: 12,
    color: '#6747CE',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginBottom: 12,
    marginLeft: 30,
    marginRight: 30,
    fontWeight: 'bold',
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