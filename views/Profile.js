import React, { useContext } from 'react';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import {
  Icon,
  Container,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Left,
  H2,
  Body,
} from 'native-base';
import mediaAPI from '../hooks/ApiHooks';
import AImage from '../components/AsyncImage';
import { MediaContext } from '../contexts/MediaContext';
import MyFiles from './MyFiles';

const Profile = (props) => {
  const { user } = useContext(MediaContext);
  console.log('ret user', user);
  const { getAvatar } = mediaAPI();
  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };
  return (
    <Container>
      <Content>
        {user &&
          <Card>
            <CardItem>
              <Left>
                <H2>{user.username}</H2>
              </Left>
              <Body>
                <Text>{user.full_name}</Text>
                <Text note>{user.email}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <AImage
                  source={{ uri: getAvatar(user) }}
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
              <Left>
                <Button onPress={signOutAsync}>
                  <Icon name="log-out" />
                </Button>
                <Button onPress={
                  () => {
                    props.navigation.navigate('MyFiles');
                  }
                }>
                <Icon name="home" />
              </Button>
            </Left>
          </CardItem>
        </Card>
      }
      </Content>
    </Container >
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
