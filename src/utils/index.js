import { Alert, PermissionsAndroid, Platform } from "react-native";

export const requestWriteStoragePermission = async () => {
    try {

        // console.log('platform version', Platform.Version);


        // if platfoem version is greater than 33, it doesn't require permission
        if (Number(Platform.Version) >= 33) {
            return true;
        }

        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Sketch.AI Storage Permission',
                message:
                    'Sketch.AI needs access to your storage ' +
                    'so you can download awesome pictures.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // console.log('You can download the file');
            return true;
        } else {
            Alert.alert(
                'Permission denied!',
                'You need to allow storage permission to download images.',
                [{ text: 'CLOSE' }]
            );
            console.log({
                message: 'storage permission denied!',
            })
            return false;
        }
    } catch (error) {
        Alert.alert(
            'Error!',
            'There is an issue requesting storage permission. Please try again.',
            [{ text: 'CLOSE' }]
        );
        console.log({
            message: 'Error occured while requesting storage permission',
            error: error.message
        });
        return false;
    }
};