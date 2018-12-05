import React from 'react';
import { StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity  } from 'react-native';
import * as firebase from 'firebase';
import ButtonBorder from '../components/ButtonBorder';


export default class OnTouchButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      score: 0,
      showCancel: true,
      Escaped: false,
      TimeLeft: false,
    }
  }

  static navigationOptions = {
    //title: 'Welcome',
  };

  render() {
    
    const { navigate } = this.props.navigation;


    if (this.state.showCancel) {
      return (
        <View style={styles.container}>
   <Text style={styles.TextTitle}>Butona en uzun süre basılı tutan oyunu kazanır, {this.state.LeftTimer} {this.state.SecondText}</Text>
      

   <Text style={styles.countText}>
       Online Oyuncu Sayısı : {this.state.OnlineUserNumber}</Text>


      <Text style={styles.countText}>
       Timer : {this.state.timer} saniye geçti!</Text>
       <TouchableOpacity onPressIn={this.onPressIn} onPressOut={this.onPressOut}>
        <View style={styles.buttonstyle}>
          <Image style={styles.imagestyle} source={require('../assets/Fingerprintbutton.png')} />
        </View>
      </TouchableOpacity>
      </View>); 
   } 
   else {

    if (this.state.Win==true) {
      return (
        <View style={styles.container}>
              
          <Text style={styles.countText}>
          {this.state.GameMoney}₺ Kazandın Bro</Text>
          <ButtonBorder
          ButtonText="Ana Sayfa"
          onPress={() => this.props.navigation.navigate('MainScreen')}
          />

              <Text style={styles.countText}>
              Timer : {this.state.timer} saniye geçti!</Text>
          </View>
    );

    }
    
    else {
      return (
        <View style={styles.container}>
              

          <Text style={styles.countText}>
          Kaybettin Bro</Text>
          <ButtonBorder
          ButtonText="Ana Sayfa"
          onPress={() => this.props.navigation.navigate('MainScreen')}
          />

              <Text style={styles.countText}>
              Timer : {this.state.timer} saniye geçti!</Text>
          </View>
    );

    }
    
   }

        
  }
  onPressIn = () => {
    
    this.setState({
      OnlineUserNumber: this.state.OnlineUserNumber + 1,
      onPressIn: true,
    });
    
    this.OnTouchTimerPlus();

    firebase.database().ref('OnlineUser/').update({
      Number: this.state.OnlineUserNumber + 1
    
    });

  }
  
  onPressOut = (timer) => {
      
      this.setState({
        prevState: this.state.score,
        prevState: 0,
        showCancel: false,
        onPressIn: false,
      });

      firebase.database().ref('OnlineUser/').update({
        Number: this.state.OnlineUserNumber - 1
      });
      
      clearInterval(this.myInterval) 

      if (this.state.OnlineUserNumber==1) {
        
        this.setState({
          Win: true,
        });
        const userId = firebase.auth().currentUser.uid;
        const updates = {}; 
        updates['/users/' + userId + '/UserOwnMoney'] = this.state.GameMoney + this.state.NowMoney
        firebase.database().ref().update(updates)

      }
      else {
        this.setState({
          Win: false,
        });
      }
      this.state.timer==this.props.FinalScore
  }
    componentDidMount () {
    }

    Begin =() => {
      if (this.state.Start==1) {
        if(this.prevState.LeftTimer==0 || this.prevState.LeftTimer<0) {
        
          if(this.state.onPressIn=true) {
  
            this.OnTouchTimerPlus()
  
              this.setState({
                SecondText: 'Saniye geçti',
              });
  
          }
          else  {
            this.setState({
              Escaped: true,
              SecondText: 'Saniye geçti',
            });
          }
        }
        
        else  {
          this.setState({
            SecondText: 'Saniye Kaldı'
          });
        }
              this.OnTouchTimerMinus()
        }  
      }
      

    OnTouchTimerPlus =() => {
      this.myInterval = setInterval(() => {
      this.setState(prevState => ({
      timer: prevState.timer + 1
    }))
  }, 1000)
  }
    
  OnTouchTimerMinus =() => {
    this.myInterval = setInterval(() => {
    this.setState(prevState => ({
    LeftTimer: prevState.LeftTimer - 1
  }))
}, this.state.LeftTimer)
this.setState(prevState => ({
  this.state.LeftTimer: prevState.LeftTimer
}))
    firebase.database().ref('Game/LeftTimer').update({
      LeftTimer: this.prevState.LeftTimer
    })

}
    componentWillMount () {

      this.Begin()


        const OnlineRef = firebase.database().ref('OnlineUser');
          const OnlineUserNumberRef = OnlineRef.child('Number');
          OnlineUserNumberRef.on('value', snap => {
              this.setState({
              OnlineUserNumber: snap.val() })
            });
        
            const GameRef = firebase.database().ref('Game');
            const LeftTimerRef = GameRef.child('LeftTimer');
            LeftTimerRef.on('value', snap => {
              this.setState({
              LeftTimer: snap.val() })
            });
            const StartRef = GameRef.child('Start');
            StartRef.on('value', snap => {
              this.setState({
              Start: snap.val() })
            });

          const UserOnlineRef = firebase.database().ref('users/' + userId);
          const NowMoneyRef = UserOnlineRef.child('UserOwnMoney');
          NowMoneyRef.on('value', snap => {
              this.setState({
              NowMoney: snap.val() })
            });
                
                 
              
          
          const MoneyRef = GameRef.child('Money');
          MoneyRef.on('value', snap => {
          this.setState({
          GameMoney: snap.val() })
              });
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7654D2',
    alignItems: 'center',
    justifyContent: 'center',
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
});
