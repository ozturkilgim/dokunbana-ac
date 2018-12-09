import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput } from 'react-native';
import * as firebase from 'firebase';
import ButtonBorderReset from '../components/ButtonBorderReset';
import MainButton from '../components/MainButton';

export default class MoneyReset extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      StateMoney: 0
    }
  }

  static navigationOptions = {
    title: 'Para Çek',
  }

  render() {
    const { navigate } = this.props.navigation;          
    return (  
      <View style={styles.container}>
          <Text style={styles.TextTitle}>Para Çekmek için Iban Numaranı Gir!</Text>
          <TextInput
          style={styles.TextInput}
          onChangeText={(IbanName) => this.setState({ IbanName })}
          value={this.state.IbanName}
          placeholder='Iban Sahibi İsmi'
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor='#BDBDBD'
          />  
          <TextInput
          style={styles.TextInput}
          onChangeText={(IbanNo) => this.setState({ IbanNo })}
          value={this.state.IbanNo}
          placeholder='Iban Numarası'
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType='number-pad'
          placeholderTextColor='#BDBDBD'
          />  
          <MainButton
          ButtonText="Para Çek"
          onPress={() => this.MoneyReset() }
          />
          <ButtonBorderReset
          ButtonText="Ana Sayfaya Dön"
          onPress={() => this.props.navigation.navigate('MainScreen') }
          />
         </View>
    );
  }

  EarnMoneySet = () => {
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref('MoneyEarn/' + userId).update({
      userId: userId,
      IbanName: this.state.IbanName,
      IbanNo: this.state.IbanNo,
      UserOwnMoney: this.state.StateMoney,
    })
  }

  MoneyReset(IbanName, IbanNo) {
    const ibanNameDefined = IbanName && IbanName.length
    const ibanNoDefined = IbanNo && IbanNo.length
    if (!ibanNameDefined || !ibanNoDefined) {
      alert("Lütfen bilgileri doldurunuz!")
    }
    else {
      this.EarnMoneySet()

        const userId = firebase.auth().currentUser.uid;
        const updates = {}; 
        updates['/users/' + userId + '/UserOwnMoney'] = 0
        firebase.database().ref().update(updates)
        
        alert("Paranız bir hafta içerisinde hesabınıza yatırılacaktır!")

        this.props.navigation.navigate('MainScreen')
    }
        
  }
  componentWillMount() {
    if (firebase.auth().currentUser) {
          
      userId = firebase.auth().currentUser.uid;
      if (userId) {
        const UserRef = firebase.database().ref('users/' + userId);
        const MoneyRef = UserRef.child('UserOwnMoney');
        MoneyRef.on('value', snap => {
              this.setState({
              StateMoney: snap.val()
              })
            });
          }
         }
    }
        
}

const styles = StyleSheet.create({
  TextTitle: {
    marginTop: 10,
    color: '#6747CE',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
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