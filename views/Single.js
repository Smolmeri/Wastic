import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AImage from '../components/AsyncImage';
import { Container, Content, Text, Card, CardItem, H2, Body, Button, Badge } from 'native-base';
import mediaAPI from '../hooks/ApiHooks';
import { AsyncStorage } from 'react-native';
import { setPlaneDetection } from 'expo/build/AR';

const Single = (props) => {
    const getToken = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log('Get Token', userToken);
        if (!userToken) {
            props.navigation.navigate('Login');
            console.log('Login here');
        } else {
            props.navigation.navigate('Reserved', { file: file });
            console.log('Reserved here');
        };
        console.log('getToken Here')
    };



    const { navigation } = props;
    console.log('Singel navi', navigation.state);
    const file = navigation.state.params.file;
    const tag = navigation.state.params.tag;
    console.log(tag, 'TAG TIEDOT');
    const { getUserInfo } = mediaAPI();
    return (
        <Container>
            <Content>
                <Card>
                    <CardItem>
                        <Body>
                            <H2>{file.title}</H2>
                            <Text note>by: {getUserInfo(file.user_id).username}</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <AImage
                                source={{ uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + file.filename }}
                                style={{
                                    borderRadius: 50,
                                    width: '100%',
                                    height: 500,
                                }}
                                spinnerColor='#b3e5fc'
                            />
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Text>{file.description}</Text>
                    </CardItem>
                    <CardItem>
                        <Badge success>
                            <Text>{tag[1].tag}</Text>
                        </Badge>
                    </CardItem>
                </Card>
                <Button onPress={getToken}>
                    <Text>Reserve</Text>
                </Button>
            </Content>
        </Container>
    );
};


Single.propTypes = {
    navigation: PropTypes.object,
    file: PropTypes.object,
    singleMedia: PropTypes.object,
};

export default Single;
