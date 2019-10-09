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
              <Body>
                <Button onPress={signOutAsync}>
                  <Text>Sign out</Text>
                  <Icon name="log-out" />
                </Button>
              </Body>
              <Body>
                <Button onPress={
                  () => {
                    props.navigation.navigate('MyFiles');
                  }
                }>
                  <Text>My Products</Text>
                  <Icon name="home" />
                </Button>
              </Body>
            </CardItem>
          </Card>
        }
        {!user &&
          <Card>
            <CardItem>
              <Text>Login or Register here!</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Button onPress={
                  () => {
                    props.navigation.navigate('Login');
                  }
                }>
                  <Icon name="log-in" />
                </Button>
              </Body>
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
