import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { fontFamily } from '../theme'
import ImageCard from '../components/ImageCard'

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

const Explore = () => {

    // states
    const [loading, setLoading] = useState(false);


    // handle fns
    const handleRefresh = () => {
        setLoading(true);
        try {
            console.log('refreshing...')
        } catch (error) {
            console.log({
                message: 'error occured',
                error: error.message
            })
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Explore</Text>

            {/* image list */}
            <FlatList
                data={data}
                renderItem={({ item, index }) => {
                    return (
                        <ImageCard item={item} />
                    )
                }}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={handleRefresh}
                        size={'large'}
                        colors={['#000','#fff']}
                    />
                }
            />
        </View>
    )
}

export default Explore

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        paddingHorizontal: 20,

    },
    title: {
        color: '#ffff',
        fontFamily: fontFamily.light,
        fontSize: 30,
        textAlign: 'center',
        marginVertical: 20,

    },

    // list container 
    listContainer: {
        paddingBottom: 50,
    },
})