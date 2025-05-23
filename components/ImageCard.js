import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";

const ImageCard = ({ img, title, redirectLink, navigation }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(redirectLink)}>
            <View style={styles.imageContainer}>
                <Image source={img} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.cardText}>{title}</Text>
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
        height: "30%",
        padding: 10,
    },
    imageContainer: {
        width: '100%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '30%',
        height: '86%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    textContainer: {
        marginTop: 1,  
        // alignItems: 'center',
    },
    cardText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
});

export default ImageCard;