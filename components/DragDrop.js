import React from 'react';
import {
  Dimensions,
  View,
  PanResponder,
  Text,
  Animated,
  StyleSheet,} from 'react-native';

export default class DragDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      win: true
    }
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (evt, gestureState) => {

        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value
        }),

        this.state.pan.setValue({ x: 0, y: 0 });

        Animated.spring(
          this.state.scale,
          { toValue: 1.3, friction: 3 }
        ).start()
      },
      onPanResponderMove: Animated.event([
        //moving
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y },
      ]),
      onPanResponderRelease: (evt, gestureState) => {
        //call when stop moving release your finger
        this.state.pan.flattenOffset();
        Animated.spring(
          this.state.scale,
          { toValue: 1, friction: 3 }
        ).start()
        this.setState({ win: false })
      }
    });
  }
  render() {
   return (

        <Animated.View style={[styles.animatedView,
        { transform: [
          { scale: this.state.scale },
          { translateX: this.state.pan.x },
          { translateY: this.state.pan.y }
        ] }]}
        {...this._panResponder.panHandlers}
        >
          </Animated.View>
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
  animatedView: {
    height: 100,
    width: 100,
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: 'steelblue',
  }

});
/*import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,} from 'react-native';
import * as firebase from 'firebase';
import MainButton from '../components/MainButton';


export default class SignUpUserName extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      user: null,
      message: '',
      phoneNumber: '90',
      confirmResult: null,
      messageSent: false,
    }
  }


  static navigationOptions = {
    title: 'SignUp',
  };
  render() {
    const { navigate } = this.props.navigation;      
    //if (this.state.user) return this.UserLoggedIn;
    if(this.state.messageSent==true) {
      return (  
        <View style={styles.container}>
            <Text style={styles.TextTitle}> Dokunmak için kendine bir kullanıcı adı seç! </Text>
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
            onPress={() => this.onVerificationCode()}
            />
           </View>
      );
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

  componentDidMount() {
    this.setState({
      message: '',
      confirmResult: null,
      messageSent: false,
    });
  }

  onLoginOrRegister = (phoneNumber) => {
    
    const applicationVerifier = firebase.auth.ApplicationVerifier.verify()
    firebase.auth().signInWithPhoneNumber(this.state.phoneNumber, applicationVerifier)
    firebase.auth.ApplicationVerifier.verify()
      .then((confirmResult) => {
        this.setState({ confirmResult, messageSent: true });
      })
      .catch((error) => {
        const { code, message } = error;
        alert(error)
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
*/