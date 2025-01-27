import { ActivityIndicator, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import { colors, fontFamily } from '../theme'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import ImageCard from '../components/ImageCard'

const Home = () => {

    // states
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState('https://endertech.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Ffswbkokbwqb5%2F4vBAsCbQ9ITwI7Ym0MtXgY%2F96c4ec25d505f1b702f46a5a3d9dbe77%2FAI-Article-00.png&w=3840&q=75');

    // handle fns
    const handleOpenLink = () => {
        const url = '';
        Linking.openURL(url).catch((error) =>
            console.log(error)
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>

            {/* Logo container */}
            <View style={styles.appLogoContainer}>
                <Text style={styles.appName}>Sketch.AI</Text>
                <TouchableOpacity onPress={handleOpenLink}>
                    <Text style={styles.subText}>
                        Made by
                        {" "}
                        <Text style={[styles.subText, styles.creatorNameLink]}>pyTuner</Text>
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Input container */}
            <View style={styles.textInputWrapper}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        placeholder='Enter your prompt...'
                        placeholderTextColor={'#808080'}
                        style={styles.textInput}
                        multiline
                        value={prompt}
                        onChangeText={setPrompt}
                    />
                    {
                        prompt &&
                        (
                            <TouchableOpacity
                                onPress={() => setPrompt('')}
                                style={styles.clearButton}
                            >
                                <FontAwesome6
                                    name='eraser'
                                    size={20}
                                    color='#fff'
                                />
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>

            {/* Generate button */}
            <TouchableOpacity style={styles.generateButton}>
                {
                    isLoading ?
                        <ActivityIndicator color={'#fff'} />
                        :
                        <Text style={styles.generateButtonText}>Generate</Text>
                }
            </TouchableOpacity>

            {
                image ?

                    // image cntainer
                    <View style={styles.imageWrapper}>
                        <ImageCard item={{ imageUrl: image, prompt: 'Generate an AI image' }} />
                    </View>

                    :

                    // Description container 
                    <View style={styles.descriptionContainer}>

                        <Text style={styles.description}>
                            Generate stunning AI-driven images in real-time. Describe your idea, enter the prompt, and watch your imagination come to life!
                        </Text>

                        <Text style={styles.description}>
                            Powered by Together.ai & flux
                        </Text>
                    </View>
            }
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({

    // main container
    container: {
        flexGrow: 1,
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        paddingBottom: 30,
    },

    // Logo container
    appLogoContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    appName: {
        color: '#fff',
        fontFamily: fontFamily.light,
        fontSize: 30,
        textAlign: 'center',
    },
    subText: {
        color: '#808080',
        fontFamily: fontFamily.regular,
        fontSize: 12,
        marginTop: 5,
    },
    creatorNameLink: {
        textDecorationLine: 'underline'
    },

    // Input container
    textInputWrapper: {
        marginTop: 20,

    },
    textInputContainer: {
        position: 'relative',

    },
    textInput: {
        width: '100%',
        height: 120,
        borderWidth: 2,
        borderColor: '#565656',
        borderRadius: 10,
        backgroundColor: '#222',
        color: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 10,
        fontFamily: fontFamily.regular,
        fontSize: 16,
    },
    clearButton: {
        position: 'absolute',
        // alignSelf:'flex-end',
        // padding:10,
        right: 10,
        top: 10,
    },

    // Generate Button
    generateButton: {
        marginTop: 10,
        backgroundColor: '#000',
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderBottomWidth: 4,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5
        },
        elevation: 7

    },
    generateButtonText: {
        color: '#fff',
        fontFamily: fontFamily.semiBold,
        fontSize: 20,

    },

    // Description container
    descriptionContainer: {
        height: '30%',
        justifyContent: 'space-between',
    },
    description: {
        fontFamily: fontFamily.regular,
        fontSize: 14,
        color: '#808080',
        textAlign: 'center',
        marginTop: 20,

    },

    // Image Container
    imageWrapper: {
        marginTop: 20,
        alignItems: 'center',
        elevation: 7,

    },


})