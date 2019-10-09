/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { MediaProvider } from './contexts/MediaContext';
import Navigator from './navigators/Navigator';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { Drawer, Header, Body, Title, Right, Button, Icon } from 'native-base';
import SideBar from './components/SideBar';


const App = () => {
  const [isReady, setIsReady] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    setIsReady(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);
  if (!isReady) {
    return <AppLoading />;
  }
  closeSideBar = () => {
    this._drawer._root.close()
  };
  openSideBar = () => {
    this._drawer._root.open()
  };

  return (
    <Drawer
      ref={(ref) => { this._drawer = ref; }}
      content={<SideBar navigator={this._navigator} />}
      onClose={() => closeSideBar()} >
        <Header>
          <Body>
            <Title>Wastic</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => openSideBar()} >
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
    <MediaProvider>
        <Navigator />
    </MediaProvider>
    </Drawer>

  );
};

export default App;
