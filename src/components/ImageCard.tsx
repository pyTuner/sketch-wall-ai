import { Image, Modal, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { fontFamily } from '../theme';
import Feather from 'react-native-vector-icons/Feather';
import { requestWriteStoragePermission } from '../utils';
import ReactNativeBlobUtil from 'react-native-blob-util';

const ImageCard = ({ item }: { item: any }) => {
    console.log(item.item);

    // states
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    const [downloadProgress, setDownloadProgress] = useState<number>(0);


    // console.log('isDownloading: ', isDownloading);
    // console.log('downloadProgress', downloadProgress);

    // handle fns
    const handleDownload = async () => {
        // console.log('downloading...')

        // ask permission
        const isGranted = await requestWriteStoragePermission();
        // console.log('permission', isGranted);

        if (!isGranted) {
            return;
        }

        // download the file using react-native-blob util

        const imageURL = item?.imageUrl;  // image url
        const PictureDirectory = ReactNativeBlobUtil.fs.dirs.PictureDir;  // directory path
        const filePath = `${PictureDirectory}/sketchAi_${Date.now()}.png`;


        setIsDownloading(true);

        // download fn
        ReactNativeBlobUtil
            .config({
                path: filePath,
                appendExt: 'png',
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: filePath,
                    description: 'Downloadning image...',
                    mime: 'image/png',
                    mediaScannable: true
                }
            })
            .fetch('GET', imageURL).progress({ interval: 100 }, (received, total) => {
                let percentage = Math.floor((received / total) * 100);
                setDownloadProgress(percentage);
            })
            .then((res) => {
                copyMediaToStorage(filePath, filePath)
                setIsDownloading(false);
                setDownloadProgress(0);
                ToastAndroid.show('Image downloaded successfully!', ToastAndroid.SHORT);
            })
            .catch((error) => {
                console.log({
                    message: 'error occured!',
                    error: error.message
                });
            })
    }

    // helper fn
    const copyMediaToStorage = async (fileName: string, filePath: string) => {
        try {
            await ReactNativeBlobUtil.MediaCollection.copyToMediaStore({
                name: fileName,
                parentFolder: 'SketchAI',
                mimeType: 'image/png',
            },
                'Image',
                filePath
            )
            console.log({
                message: 'File copied to the media store successfully.'
            })
        } catch (error: any) {
            console.log({
                message: 'Failed to copy file to media store!',
                error: error.message
            });
        }
    }
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
                <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
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

            {/* modal container */}
            <Modal transparent={true} animationType='fade' visible={isDownloading}>
                <View style={styles.overlay}>
                    <View style={styles.progressContainer}>
                        <Text style={styles.progressTitle}>
                            Downloading Image...
                        </Text>
                        <Text style={styles.progressText}>{downloadProgress}%</Text>
                        <Text style={styles.progressDescription}>
                            Please wait while we are downloading your image.
                        </Text>
                        <View style={styles.progressBarContainer}>
                            <View style={[
                                styles.progressBar,
                                { width: `${downloadProgress}%` }
                            ]} >

                            </View>
                        </View>
                    </View>

                </View>
            </Modal>
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

    // Download pop-up
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.17)'
    },
    progressContainer: {
        width: '80%',
        backgroundColor: '#222',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    progressTitle: {
        fontFamily: fontFamily.bold,
        fontSize: 18,
        color: '#fff',
        marginBottom: 10,
    },
    progressText: {
        fontFamily: fontFamily.bold,
        fontSize: 24,
        color: '#fff',
        marginBottom: 10,
    },
    progressDescription: {
        fontFamily: fontFamily.regular,
        fontSize: 14,
        color: '#ccc',
        textAlign: 'center',
        marginTop: 10,
    },
    progressBarContainer: {
        width: '100%',
        height: 10,
        backgroundColor: '#444',
        borderRadius: 5,
        marginTop: 10,
    },
    progressBar: {
        height: 10,
        backgroundColor: '#76c7c0',
        borderRadius: 5,
    }

})