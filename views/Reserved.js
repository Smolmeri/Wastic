import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import AImage from '../components/AsyncImage';
import { Container, Content, Text, Card, CardItem, H2, Body, Button } from 'native-base';
import mediaAPI from '../hooks/ApiHooks';
import { MediaContext } from '../contexts/MediaContext';

const Reserved = (props) => {
    const { navigation } = props;
    console.log('Reserved navi', navigation.state);
    const file = navigation.state.params.file;
    const { getUserInfo } = mediaAPI();
    const { user } = useContext(MediaContext);
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
                        <Text>Thanks for choosing to save the planet! Below is the sellers contact information.</Text>
                    </CardItem>
                    <CardItem>
                        <Text>User: {getUserInfo(file.user_id).username}</Text>
                    </CardItem>
                    <CardItem>
                        <Text>Address: Mannerheimintie 94</Text>
                    </CardItem>
                    <CardItem>
                        <Text>Contact: {getUserInfo(file.user_id).email} </Text>
                    </CardItem>
                </Card>
                <Button style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: '#829A20'
                }}>
                    <Text>Send Message</Text>
                </Button>
            </Content>
        </Container>
    );
};


Reserved.propTypes = {
    navigation: PropTypes.object,
    file: PropTypes.object,
};

export default Reserved;
