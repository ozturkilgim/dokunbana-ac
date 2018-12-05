import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class TimerD extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      timer: 0
    }
  }
  
  render() {
    const {timer} = this.state
    return (  
      <View>
          <Text style={styles.countText}>
            Timer : {timer} saniye kaldı yavrum;)</Text>
      </View>
    );
  }

  componentDidMount () {
      const {startTimerD} = this.props
      this.setState({
        timer: startTimerD
      })
      this.doIntervalChange()      
  }
  
  doIntervalChange =() => {
    this.myInterval = setInterval(() => {
      this.setState(prevState => ({
      timer: prevState.timer + 1
    }))
  }, 1000)
  }

  componentWillMount () {
    clearInterval(this.myInterval)
  }  
}

const styles = StyleSheet.create({
  countText: {
    alignItems: 'center',
    fontSize: 25,
    color: 'white',
    marginTop: 25,
  },
});