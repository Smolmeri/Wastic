import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Thumbnail, ListItem as BaseListItem, Left, Body, Right, Icon, Button } from 'native-base';

const getThumbnail = (url) => {
  const [thumbnails, setThumbnails] = useState({});
  async function fetchUrl() {
    const response = await fetch('http://media.mw.metropolia.fi/wbma/media/' + url);
    const json = await response.json();
    setThumbnails(json.thumbnails);
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  return thumbnails;
};

const ListItem = (props) => {
  const tn = getThumbnail(props.singleMedia.file_id);
  return (
    <BaseListItem thumbnail
      onPress={
        () => {
          props.navigation.navigate('Single', { file: props.singleMedia });
          console.log('what is happening');
        }
      }
    >
      <Left>
        <Thumbnail source={{ uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + tn.w160 }} />
      </Left>
      <Body>
        <Text> {props.singleMedia.title} </Text>
        <Text> {props.singleMedia.description} </Text>
      </Body>
      <Right>
        <Button transparent>
          <Icon style={{ opacity: 40, color: 'blue' }} name='arrow-forward' />
        </Button>
      </Right>
    </BaseListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
