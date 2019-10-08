/* eslint-disable max-len */
import React from 'react';
import List from '../components/List';
import PropTypes from 'prop-types';
import mediaAPI from '../hooks/ApiHooks';
import { Container, Content, Header, Title, Drawer, Body, Right, Button, Icon } from 'native-base';
import SideBar from '../components/SideBar';


const Home = (props) => {
  const { navigation } = props;
  const { userToContext } = mediaAPI();
  userToContext();

  return (
    <Container>
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
