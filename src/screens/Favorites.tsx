import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fontFamily } from '../theme';
import ImageCard from '../components/ImageCard';
import Feather from 'react-native-vector-icons/Feather';

// sample response data
const data = [
    {
        imageUrl: 'https://viso.ai/wp-content/uploads/2024/02/ai-generated-content-detection-system-recognize-ai-content.jpg',
        prompt: 'Generate an AI image',
        id: 1,
    },
    {
        imageUrl: 'https://endertech.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Ffswbkokbwqb5%2F4vBAsCbQ9ITwI7Ym0MtXgY%2F96c4ec25d505f1b702f46a5a3d9dbe77%2FAI-Article-00.png&w=3840&q=75',
        prompt: 'Generate an AI image',
        id: 2,
    },
    {
        imageUrl: 'https://miro.medium.com/v2/resize:fit:1400/0*G0EA5UxJlV3YTXY5.png',
        prompt: 'Generate an AI image',
        id: 3,
    }
]

const EmptyListScreen = () => (
    <View style={styles.emptyStateContainer}>
        <Feather
            name={'heart'}
            size={80}
            color={'#D3D3D3'}
        />
        <Text style={styles.emptyStateText}>You haven't liked any images yet!</Text>
        <Text style={styles.subText}>Browse and like images to see them here!</Text>
    </View>
)
const Favorites = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favorites</Text>
            <FlatList
                data={data}
                renderItem={({ item, index }) => {
                    return (
                        <ImageCard item={item} />
                    )
                }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={EmptyListScreen}
                contentContainerStyle={
                    [
                        styles.listContainer,
                        data.length === 0 && styles.emptyListContainer
                    ]
                }
            />
        </View>
    )
}

export default Favorites

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        paddingHorizontal: 20,
    },
    title: {
        color: '#fff',
        fontFamily: fontFamily.light,
        fontSize: 30,
        textAlign: 'center',
        marginVertical: 20,
    },

    // list containers
    listContainer: {

    },
    emptyListContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        // borderWidth:1,
        // borderColor:'#fff'

    },

    // empty-state container
    emptyStateContainer: {
        alignItems: 'center',
        // marginTop: 50,
    },
    emptyStateText: {
        color: '#D3D3D3',
        fontFamily: fontFamily.medium,
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    },
    subText: {
        color: '#A9A9A9',
        fontFamily: fontFamily.regular,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
    }
})