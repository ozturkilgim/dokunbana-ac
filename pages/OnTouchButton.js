import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar  } from 'react-native';
import * as firebase from 'firebase';
import ButtonBorderWin from '../components/ButtonBorderWin';


export default class OnTouchButton extends React.Component {

  constructor(props) {
    super(props)

    this.state = { 
      timer: 0,
      score: 0,
      showCancel: true,
      onTouchStatus: false,

    }
  }

  static navigationOptions = {
  };


  render() {
    
    const { navigate } = this.props.navigation;

      if (this.state.showCancel) {

        if(this.state.StartedGame==1 && this.state.onTouchStatus==false) {
          return (
            <View style={styles.container}>
            <Image style={{position: 'absolute'}} source={require('../assets/ButtonBackground.png')} />
    
              <Text style={styles.countText}>
              Ne Yazık Ki Kaçırdın!</Text>
  
              <ButtonBorderWin
              ButtonText="Ana Sayfa"
              onPress={() => this.props.navigation.navigate('MainScreen')}
              />
  
              </View>
        );
        }else {
          return (
            <View style={styles.container}>
                  <Image style={{position: 'absolute'}} source={require('../assets/ButtonBackground.png')} />
                  <Text style={styles.TextTitle}>Ödül: {this.state.GameMoney} ₺</Text>
  
                  <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 15}}>
                    <Image style={{height: 25, width: 25}} source={require('../assets/time.png')} />
                    <Text style={styles.timerStyle}>{this.state.timer} saniye</Text>
                    </View>
  
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 15}}>
                    <Image style={{height: 27, width: 20.5}} source={require('../assets/man-user.png')} />
                    <Text style={styles.onlineNumber}>
                    {this.state.OnlineUserNumber} kişi oynuyor!</Text>
                    </View>
  
                    <Text style={styles.TextTitleMin}>
                    Oyun Saati: {this.state.GameTime}</Text>
                    
                    <Text style={styles.countText}>
                    Butonu Sakın Bırakma!</Text>
                    
                    
                    
                    <TouchableOpacity style={styles.buttonShadow} onPress={() => this.setState({onTouchStatus: true})} onPressIn={this.onPressIn} onPressOut={this.onPressOut}>
                      <View style={styles.buttonstyle}>
                        <Image style={styles.imagestyle} source={require('../assets/Fingerprintbutton.png')} />
                      </View>
                    </TouchableOpacity>

          </View>
          ); 
        }   
     }else {
  
      if (this.state.Win==true) {
        return (
          <View style={styles.container}>

                <Image style={{position: 'absolute'}} source={require('../assets/ButtonBackground.png')} />
               
                <Text style={styles.countText}>
                {this.state.GameMoney}₺ Kazandın</Text>
                
                <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 15}}>
                  <Image style={{height: 25, width: 25}} source={require('../assets/time.png')} />
                  <Text style={styles.timerStyle}>Rekorun: {this.state.timer} saniye</Text>
                </View>
                

                <ButtonBorderWin
                ButtonText="Ana Sayfa"
                onPress={() => this.Win()}
                 />
              
            </View>
        );

      }else {
        return (
          <View style={styles.container}>

            <Image style={{position: 'absolute'}} source={require('../assets/ButtonBackground.png')} />
    
              <Text style={styles.countText}>
              Ne Yazık Ki Kaybettin!</Text>

              <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 15}}>
                  <Image style={{height: 25, width: 25}} source={require('../assets/time.png')} />
                  <Text style={styles.timerStyle}>Rekorun: {this.state.timer} saniye</Text>
              </View>

              <ButtonBorderWin
              ButtonText="Ana Sayfa"
              onPress={() => this.props.navigation.navigate('MainScreen')}
              />

            </View>
        );
      }
    }  

     
  }
  scoreBoardAddUser() {
    const userId = firebase.auth().currentUser.uid;
    const ScoreBoardRef = firebase.database().ref('ScoreBoard')
    const GameIdRef = ScoreBoardRef.child(this.state.GameId)
    GameIdRef.child(this.state.OnlineUserNumber).update({
    
      Rank: this.state.OnlineUserNumber,
      userName: this.state.username,
      userId

    })
    
  }

    Win() {
      this.props.navigation.navigate('MainScreen')
      firebase.database().ref('/Game').update({
        Money: 0
      })
    }    
    
  onPressIn = () => {
    this.doIntervalChange();
    this.setState({
      onTouchStatus: true,
    });
    require('firebase/functions')
    
    if (this.state.StartedGame==1) {
      this.setState({
        OnlineUserNumber: this.state.OnlineUserNumber + 1,
        OnPressIn: true,
        onTouchStatus: true,
      });
      addOnlineUser = firebase.functions().httpsCallable('addOnlineUser');
      addOnlineUser()
      .then(result => console.info(result))
      .catch(err => console.info('err :: ', err))
      
      
    } else {
      addOnlineUser = firebase.functions().httpsCallable('addOnlineUser');
      addOnlineUser()
      .then(result => console.info(result))
      .catch(err => console.info('err :: ', err))
      
    }
  }
  
  onPressOut = (timer) => {
    clearInterval(this.myInterval) 

    if (this.state.StartedGame==1) {

      this.setState({
        prevState: this.state.score,
        prevState: 0,
        showCancel: false,
        GameInfo: "Oyun Başladı"
      });

      subOnlineUser = firebase.functions().httpsCallable('subOnlineUser');
      subOnlineUser()
      .then(result => console.info(result))
      .catch(err => console.info('err :: ', err))

      
      clearInterval(this.myInterval) 

      if (this.state.OnlineUserNumber==1) {
        
        this.setState({
          Win: true,
        });

        const userId = firebase.auth().currentUser.uid;
        const updates = {}; 
        updates['/users/' + userId + '/UserOwnMoney'] = this.state.GameMoney + this.state.NowMoney
        firebase.database().ref().update(updates)
        this.scoreBoardAddUser()
      }else {
        this.setState({
          Win: false,
        });
        this.scoreBoardAddUser()
      }
      this.state.timer==this.props.FinalScore
    }else {
      alert("Oyun Başlayacak Hazır Ol!")

      subOnlineUser = firebase.functions().httpsCallable('subOnlineUser');
      subOnlineUser()
      .then(result => console.info(result))
      .catch(err => console.info('err :: ', err))

      this.setState({
        GameInfo: "Oyun Başlayacak",
        timer: 0
      });
    }
      
  }

    componentDidMount () {

      if (this.state.StartedGame==0) {
        firebase.database().ref('Game').update({
        GameDescription: "'da başlayacak!"})
      
        }
        else {
         

          this.setState({
            GameDescription: "'da başladı! Butonu sakın bırakma!"})
        }
          StatusBar.setHidden(false);
          const OnlineRef = firebase.database().ref('OnlineUser');
          const OnlineUserNumberRef = OnlineRef.child('Number');
          OnlineUserNumberRef.on('value', snap => {
              this.setState({
              OnlineUserNumber: snap.val() })
            });

          const UserOnlineRef = firebase.database().ref('users/' + userId);
          const NowMoneyRef = UserOnlineRef.child('UserOwnMoney');
          NowMoneyRef.on('value', snap => {
              this.setState({
              NowMoney: snap.val() })
            });  
            
             
          
          const GameRef = firebase.database().ref('Game');
          const MoneyRef = GameRef.child('Money');
          MoneyRef.on('value', snap => {
          this.setState({
          GameMoney: snap.val() })
              });

          const GameIdRef = GameRef.child('GameId');
          GameIdRef.on('value', snap => {
          this.setState({
          GameId: snap.val() })
              });

          const StartedGameRef = GameRef.child('StartedGame');
          StartedGameRef.on('value', snap => {
          this.setState({
          StartedGame: snap.val() })
              });
          
          const GameTimeRef = GameRef.child('GameTime');
          GameTimeRef.on('value', snap => {
          this.setState({
          GameTime: snap.val() })
              });

          const GameExistRef = GameRef.child('GameExist');
          GameExistRef.on('value', snap => {
          this.setState({
            GameExist: snap.val() })
              });
              
              const UserNameRef = UserOnlineRef.child('username');
              UserNameRef.on('value', snap => {
              this.setState({
              username: snap.val()
                });
              });  
      }
      doIntervalChange =() => {
        this.myInterval = setInterval(() => {
        this.setState(prevState => ({
        timer: prevState.timer + 1
      }))
    }, 1000)
    }

    componentWillMount () {

      //Firebase
      StatusBar.setHidden(false);
      const OnlineRef = firebase.database().ref('OnlineUser');
          const OnlineUserNumberRef = OnlineRef.child('Number');
          OnlineUserNumberRef.on('value', snap => {
              this.setState({
              OnlineUserNumber: snap.val() })
            });

          const UserOnlineRef = firebase.database().ref('users/' + userId);
          const NowMoneyRef = UserOnlineRef.child('UserOwnMoney');
          NowMoneyRef.on('value', snap => {
              this.setState({
              NowMoney: snap.val() })
            });  
                       
          
          const GameRef = firebase.database().ref('Game');
          const MoneyRef = GameRef.child('Money');
          MoneyRef.on('value', snap => {
          this.setState({
          GameMoney: snap.val() })
              });

          const StartedGameRef = GameRef.child('StartedGame');
          StartedGameRef.on('value', snap => {
          this.setState({
          StartedGame: snap.val() })
              });
          
          const GameTimeRef = GameRef.child('GameTime');
          GameTimeRef.on('value', snap => {
          this.setState({
          GameTime: snap.val() })
              });
          const GameExistRef = GameRef.child('GameExist');
          GameExistRef.on('value', snap => {
          this.setState({
            GameExist: snap.val() })
              });

    }
}

const styles = StyleSheet.create({
  animatedView: {
    height: 100,
    width: 100,
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: 'steelblue',
  },
  container: {
    flex: 1,
    backgroundColor: '#7654D2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonShadow: {
    shadowColor: '#fff',
    shadowOpacity: 0.5,
    shadowRadius: 8,

  },

  TextTitle: {
    marginTop: 10,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 40,
    marginBottom: 20,  
    marginLeft: 30,
    marginRight: 30,
    fontWeight: 'bold'
  },

  TextTitleMin: {
    marginTop: 12,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 23,
    marginBottom: 12,  
    marginLeft: 30,
    marginRight: 30,
  },

  timerStyle: {
    marginTop: -5,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 32,
    marginLeft: 10,
    fontWeight: 'bold'
  },

  onlineNumber: {
    marginTop: 0,
    color: '#76FFCD',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 30,
    marginLeft: 10,
    fontWeight: 'bold'
  },

  buttonstyle: {
    height: 250 ,
    width: 250,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imagestyle: {
    width: 100,
    height: 100,
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countText: {
    alignItems: 'center',
    fontSize: 25,
    color: 'white',
    marginTop: 10,
    marginBottom: 30,
    fontWeight: 'bold',
    justifyContent: 'space-between',
  },
});
/*
      //DragAndDrop Start
      state:
            pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),

      <Animated.View style={[styles.animatedView,
        { transform: [
          { scale: this.state.scale },
          { translateX: this.state.pan.x },
          { translateY: this.state.pan.y }
        ] }]}
        {...this._panResponder.panHandlers}
        >

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
          //this.setState({ win: false })
        }
      });
      //DragAndDrop Finish
*/
