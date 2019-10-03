import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import AImage from '../components/AsyncImage';
import { Container, Content, Text, Card, CardItem, H2, Body, Button } from 'native-base';
import mediaAPI from '../hooks/ApiHooks';
import { AsyncStorage } from 'react-native';

const Single = (props) => {
    const getToken = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        console.log('token', userToken);
        props.navigation.navigate(userToken ? 'Home' : 'Logout');
    }
    useEffect(() => {
        getToken();
    }, []);

    const { navigation } = props;
    console.log('Singel navi', navigation.state);
    const file = navigation.state.params.file;
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
};

export default Single;
