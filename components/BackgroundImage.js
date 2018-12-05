import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default class BackgroundImage extends React.Component {
    render() {
        return (
            <Image source={require('../assets/whitebackground.png')}
                  style={styles.backgroundImage}>
            </Image>
        )
    }
}
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        margin: 10
    },
});