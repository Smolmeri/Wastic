import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
} from 'react-native';

const bootstrapAsync = async (props) => {
    const getToken = async () => {  
        const userToken = await AsyncStorage.getItem('userToken');

        console.log('token', userToken);
        props.navigation.navigate(userToken ? 'App' : 'Auth');
    }
    useEffect(() => {
        getToken();
    }, []);
};

const AuthLoading = (props) => {
    bootstrapAsync(props);
    return (
        <View>
            <ActivityIndicator />
            <StatusBar barStyle='default' />
        </View>
    );
};

export default AuthLoading;