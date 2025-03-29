import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

const ImageCard = ({ img, redirectLink, navigation }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(redirectLink)}>
            <View style={styles.imageContainer}>
                <Image source={img} style={styles.image} />
            </View>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        elevation: 5,
        backgroundColor: '#fff',
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 3,
        marginHorizontal: 10,
        marginVertical: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200, 
    },
    imageContainer: {
        width: '50%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default ImageCard;