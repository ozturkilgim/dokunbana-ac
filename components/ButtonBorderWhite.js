import React from 'react';
import { StyleSheet,
  View,
  Text,
  TouchableOpacity } from 'react-native';

export default class ButtonBorderWhite extends React.Component {
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
        height: 77,
        width: 300,
        marginLeft: 12,
        marginRight: 12,
        borderRadius: 200,
        borderColor: '#fff',
        marginTop: 15,
        marginBottom: 15,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextStyle: {
        fontSize: 20,
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
      },
  });