import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Thumbnail, ListItem as BaseListItem, Left, Body, Right, Icon, Button } from 'native-base';

const getThumbnail = (file_id) => {
  const [thumbnails, setThumbnails] = useState({});
  async function fetchUrl() {
    const response = await fetch('http://media.mw.metropolia.fi/wbma/media/' + file_id);
    const json = await response.json();
    setThumbnails(json.thumbnails);
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  return thumbnails;
};

const getTags = (tag) => {
  const [tags, setTags] = useState({});
  async function fetchUrl() {
    const response = await fetch('http://media.mw.metropolia.fi/wbma/tags/file/' + tag);
    const json = await response.json();
    setTags(json);
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  return tags;
};

const ListItem = (props) => {
  const tg = getTags(props.singleMedia.file_id);
  const tn = getThumbnail(props.singleMedia.file_id);
  console.log('Vittu');
  try {
    console.log(tg[0].tag);
  } catch {
    console.log('error vittu');
  }


 
  console.log(tg.tag);
  return (
    <BaseListItem thumbnail
      onPress={
        () => {
          props.navigation.navigate('Single', { file: props.singleMedia, tag: tg });
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
          <Icon style={{ opacity: 40, color: '#829A20' }} name='arrow-forward' />
        </Button>
      </Right>
    </BaseListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
