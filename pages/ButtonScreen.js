import React from 'react';
import { StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import Timer from '../components/Timer.js';

export default class ButtonScreen extends React.Component {
  static navigationOptions = {
    title: 'Button',
  };

  constructor(props) {
    super(props)
    this.state = { 
      count: 0
    }
  }

  componentDidMount(count) {

  }

  onPressButton = () => {
    this.setState({
      count: this.state.count+1
    })
    if (firebase.auth().currentUser) {
          
      userId = firebase.auth().currentUser.uid;
    }
    firebase.database().ref('users/' + userId).update({
      count: this.state.count,
    })
  }

  onPressButton0 = () => {
    this.setState({
      count: this.state.count==0,
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (  
        
        <View style={styles.container}>
            <Text style={styles.TextTitle}>30 saniye içerisinde butona kaç kere basabileceksin?</Text>
            <Button
            title="Diğer Oyun"
            onPress={() =>
              navigate('Profile')
            }
            />
            <Timer startTimer='30' />
            
            <Text style={[styles.countText]}>
              { this.state.count !== 0 ? this.state.count: null}
            </Text>
            
            <Button 
            title="Sıfırla"
            onPress={this.onPressButton0}
            color="white" />
            
            <TouchableOpacity onPress={this.onPressButton}>
            <View style={styles.buttonstyle}>
            <Image style={styles.imagestyle} source={require('../assets/Fingerprintbutton.png')} />
            </View>
            </TouchableOpacity>
         </View>
    );
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