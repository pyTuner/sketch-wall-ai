import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { fontFamily } from '../theme';
import Feather from 'react-native-vector-icons/Feather'

const ImageCard = ({ item }) => {
    console.log(item.item)
    return (
        <View style={styles.imageCard}>
            {/* Image */}
            <Image
                source={{ uri: item?.imageUrl }}
                style={styles.image}
                resizeMode='cover'
            />

            {/* prompt */}
            <Text
                style={styles.promptText}
                numberOfLines={2}
            >
                {item?.prompt || 'No Prompt!'}
            </Text>

            {/* Button container */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.actionButton}>
                    <Feather name='download' size={25} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Feather name='share' size={25} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Feather name='copy' size={25} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Feather name='heart' size={25} color='#fff' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ImageCard

const styles = StyleSheet.create({
    imageCard: {
        width: '100%',
        padding: 10,
        backgroundColor: '#333',
        marginBottom: 20,
        borderRadius: 8
    },
    image: {
        height: 350,
        width: 'auto',
        borderRadius: 8,

    },
    promptText: {
        marginTop: 10,
        color: '#fff',
        fontSize: 16,
        fontFamily: fontFamily.regular,
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginHorizontal: 8,
    },
    actionButton: {
        padding: 10,
        backgroundColor: '#444',
        borderRadius: 50,
        alignItems: 'center'
    },

})