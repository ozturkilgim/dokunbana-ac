import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      timer: 1
    }
  }
  
  render() {
    const {timer} = this.state
    return (  
      <View>
          <Text style={[styles.countText]}>
            Timer : {timer} saniye kaldı!;)</Text>
      </View>
    );
  }

  componentDidMount () {
      const {startTimer} = this.props
      this.setState({
        timer: startTimer
      })
      this.doIntervalChange()      
  }
  
  doIntervalChange =() => {
    this.myInterval = setInterval(() => {
      this.setState(prevState => ({
      timer: prevState.timer + 1
    }))
  }, )
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