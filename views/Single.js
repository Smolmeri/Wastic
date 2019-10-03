import React from 'react';
import PropTypes from 'prop-types';
import AImage from '../components/AsyncImage';
import {Container, Content, Text, Card, CardItem, H2, Body} from 'native-base';
import mediaAPI from '../hooks/ApiHooks';

const Single = (props) => {
  const {navigation} = props;
  console.log('Singel navi', navigation.state);
  const file = navigation.state.params.file;
  const {getUserInfo} = mediaAPI();
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
                source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + file.filename}}
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
      </Content>
    </Container>
  );
};


Single.propTypes = {
  navigation: PropTypes.object,
  file: PropTypes.object,
};

export default Single;
