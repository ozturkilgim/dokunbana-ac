import React from 'react';
import { StyleSheet,
  View,
  Text,
  TouchableOpacity } from 'react-native';

export default class MainButton extends React.Component {
        render () {
            let {onPress, ButtonText} = this.props;
            return (
                <View>
                    <TouchableOpacity 
                    onPress={onPress}
                    style={styles.MainButton}>
                        <View style={styles.MainButton}>
                            <Text style={styles.TextStyle}>
                            {ButtonText}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    }

const styles = StyleSheet.create({
    MainButton: {
        height: 53,
        width: 300,
        marginLeft: 37.5,
        marginRight: 37.5,
        borderRadius: 200,
        marginTop: 5,
        marginBottom: 15,
        backgroundColor: '#6747CE',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#6747CE',
        shadowOpacity: 0.6,
        shadowRadius: 6,
        shadowOffset:{  width: 0,  height: 0,  },
    },
    TextStyle: {
        fontSize: 20,
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
      },
  });