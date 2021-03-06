/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { MediaProvider } from './contexts/MediaContext';
import Navigator from './navigators/Navigator';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { Drawer, Header, Body, Title, Right, Button, Icon, Left, Container } from 'native-base';
import SideBar from './components/SideBar';

console.disableYellowBox = true;

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
  // closeSideBar = () => {
  //   this._drawer._root.close()
  // };
  // openSideBar = () => {
  //   this._drawer._root.open()
  // };

  return (
    // <Drawer
    //   ref={(ref) => { this._drawer = ref; }}
    //   content={<SideBar navigation={this._navigator} />}
    //   onClose={() => closeSideBar()} >
    <Container>
      <Header style={{
        backgroundColor: '#829A20',
        
        justifyContent: 'center',
      }}>  
      <Left>
        <Icon style={{
          backgroundColor: '#829A20',
        }} />
      </Left>
        <Body>
          <Title style={{
            color: 'white'
          }}>Wastic</Title>
        </Body>
        <Right>
          <Button 
            style={{
            color: '#00000',
            }} 
            transparent 
            onPress={() => {
            alert("I'm not functional! Please help!")
            }}>
            <Icon style={{
              color: 'white',
            }} name="search" />
          </Button>
        </Right>
      </Header>
      <MediaProvider>
        <Navigator />
      </MediaProvider>
      </Container>

  );
};

export default App;
