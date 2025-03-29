import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Logo = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/logo-img.png')} style={styles.logo} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    },
});

export default Logo;