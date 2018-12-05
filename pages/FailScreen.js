import React from 'react';
import { StyleSheet,
  Text,
  View,} from 'react-native';
import ButtonBorder from '../components/ButtonBorder';

export default class FailScreen extends React.Component {
  static navigationOptions = {
    title: 'FailScreen',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (  
        
        <View style={styles.container}>
        <ButtonBorder
          ButtonText="Ana Sayfa"
          onPress={() => this.props.navigation.navigate('MainScreen')}
          />
            <Text style={styles.TextTitle}>Kaybettin Bro, {this.props.timer} saniye geçti</Text>
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