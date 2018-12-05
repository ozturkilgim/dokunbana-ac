import React from 'react';
import {
  View,
  Text,
  TextInput,
  Platform,
  WebView,
  DeviceEventEmitter,
  StyleSheet,} from 'react-native';
import * as firebase from 'firebase';
import MainButton from '../components/MainButton';
//import SafariView from "react-native-safari-view";
import ReCaptcha from 'react-native-recaptcha-v3';



export default class SignUpUserName extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
      sitekey:'6LfuT34UAAAAAIQxkPUKAnB9nX0rIJgvGozp9qA5',
      user: null,
      message: '',
      phoneNumber: '+90',
      confirmResult: null,
      messageSent: null,
      pageStructure: 1,
  }
}
  static navigationOptions = {
    title: 'SignUp',
  };
  
  render() {
    const { navigate } = this.props.navigation;
    console.info('this.state.pageStructure :: ', this.state.pageStructure)
    if(this.state.pageStructure==0) {
      return (  
        <View style={styles.container}>
            <Text style={styles.TextTitle}> Verification </Text>
            <Text style={styles.TextTitle}> {this.state.phoneNumber}</Text>
            <TextInput
            style={styles.TextInput}
            onChangeText={(verificationCode) => this.setState({ verificationCode })}
            value={this.state.verificationCode}
            placeholder='Kodu Giriniz'
            autoCorrect={false}
            autoCapitalize="none"
            placeholderTextColor='#BDBDBD'
            />  
            <MainButton
            ButtonText="Onayla"
            onPress={() => this.pressHandler()}
            />
           </View>
      );
    }
    if(this.state.pageStructure==1) {
      return (
            
        <ReCaptcha 
        siteKey='6LeW1X4UAAAAAGekCFgEG2u7GtO5EupydpjfcOOR'
        url='teamfluencer.co/index.php/recaptcha/'
        reCaptchaType={1}
        action='homepage'
        onExecute={() => this.props.navigation.navigate('MainScreen')}
        />
      )
          
    }
    else {
      return (
      <View style={styles.container}>
            <Text style={styles.TextTitle}> Dokunmak için kendine bir kullanıcı adı seç! </Text>
            <Text style={styles.TextTitle}> {this.state.message}</Text>
            <TextInput
            style={styles.TextInput}
            onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
            value={this.state.phoneNumber}
            placeholder='Tel No'
            autoCorrect={false}
            autoCapitalize="none"
            placeholderTextColor='#BDBDBD'
            />  
            <MainButton
            ButtonText="Mesaj Gönder"
            onPress={() => this.onLoginOrRegister()}
            />
           </View>
      )
    }
  }
  onLoginOrRegister() {
    this.setState({
      pageStructure: 1
    })
  }
  
  onExecute = (value) => {
    console.info('value : ', value)
    if (firebase.auth().currentUser) {
          
      userId = firebase.auth().currentUser.uid;
    }
    this.setState({
      message: value
    })
    alert(this.state.message)

   /* const onlineUserRef = firebase.database().ref('users/' + userId);
    onlineUserRef.update({
      recaptchaToken: recaptchaToken
      
    })

    AppVerifierFunction = firebase.functions().httpsCallable('AppVerifierFunction');
    AppVerifierFunction()
      const VerifierRef = onlineUserRef.child('appVerifier');
      VerifierRef.on('value', snap => {
            this.setState({
              appVerifier: snap.val()
            })
          });

    
            const phoneNumberAuth = this.state.phoneNumber  
            const applicationVerifier = this.state.appVerifier
            
          //const applicationVerifier= firebase.auth.RecaptchaVerifier('homepage', applicationVerifier)
              firebase.auth().signInWithPhoneNumber(phoneNumberAuth, applicationVerifier)
                .then((confirmResult) => {
                  this.setState({ confirmResult, messageSent: true });
                  this.props.navigation.navigate('MainScreen')
                })
                .catch((error) => {
                  this.setState({ errorMessage: `Sign In With Phone Number Error: ${error.message}`})
                  alert(errorMessage)
                });*/
            
    }

  

  componentDidMount() {

    this.setState({
      message: '',
      confirmResult: null,
      messageSent: false,
    });
  }

  
  

onVerificationCode = () => {

  const { confirmResult, verificationCode } = this.state;
  confirmResult.confirm(verificationCode)
    .then(() => alert("Phone Number Authenticated!"))
    .then(() => this.props.navigation.navigate('MainScreen'))
    .then(() => this.successPhone())

    .catch((error) => {
      const { code, message } = error;
      alert(error)
    });
  }
  successPhone() {
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userId).update({
    })
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