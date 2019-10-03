/* eslint-disable max-len */
import React from 'react';
import List from '../components/List';
import PropTypes from 'prop-types';
import mediaAPI from '../hooks/ApiHooks';
import {Container, Content, Header, Title} from 'native-base';


const Home = (props) => {
  const {navigation} = props;
  const {userToContext} = mediaAPI();
  userToContext();
  return (
    <Container>
      <Header>
          <Title>Wastic</Title>
      </Header>
      <Content>
        <List navigation={navigation}></List>
      </Content>
    </Container>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
