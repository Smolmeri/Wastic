import React from 'react';
import { Container, Content, Card, CardItem, Text, Icon, Button } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';

const SideBar = (props) => {
    
    const getToken = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log('Get Token SideBar', userToken);
        if (!userToken) {
            props.navigation.navigate('Login');
            console.log('Login here');
        } else {
            props.navigation.navigate('MyFiles');
            console.log('Reserved here');
        };
        console.log('getToken Here')
    };

    const signOutAsync = async () => {
        await AsyncStorage.clear();
        props.navigation.navigate('Auth');
    };

    

    return (
        <Container>
            <Content>
                <Card>
                    <CardItem>
                        <Button onPress={getToken}>
                            <Text>My Uploads</Text>
                        </Button>
                    </CardItem>
                    <CardItem>
                        <Button onPress={getToken}>
                            <Text>Profile</Text>
                        </Button>
                    </CardItem>
                    <CardItem>
                        <Button onPress={signOutAsync}>
                            <Text>Logout</Text>
                        </Button>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    )
}

SideBar.propTypes = {
    navigation: PropTypes.object,
};

export default SideBar;