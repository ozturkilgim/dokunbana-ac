import React from 'react';
import { StyleSheet,
  View,
  Text,
  TouchableOpacity } from 'react-native';

export default class ButtonBorderReset extends React.Component {
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
        borderColor: '#6747CE',
        marginTop: 15,
        marginBottom: 15,
        borderWidth: 1,
        //backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#fff',
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset:{  width: 0,  height: 0,  },
    },
    TextStyle: {
        fontSize: 20,
        color: '#6747CE',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
      },
  });