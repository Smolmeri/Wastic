// import React from 'react';
// import { Container, Content, Card, CardItem, Text, Icon, Button } from 'native-base';
// import { AsyncStorage } from 'react-native';
// import PropTypes from 'prop-types';

// const SideBar = (props) => {

//     const getToken = async (local) => {
//         const userToken = await AsyncStorage.getItem('userToken');
//         console.log('Get Token SideBar', userToken);
//         if (!userToken) {
//             props.navigation.navigate('Login');
//             console.log('Login here');
//         } else {
//             props.navigation.navigate(local);
//             console.log('Reserved here');
//         };
//         console.log('getToken Here')
//     };

//     const signOutAsync = async () => {
//         await AsyncStorage.clear();
//         props.navigation.navigate('Auth');
//     };



//     return (
//         <Container>
//             <Content>
//                 <Card>
//                     <CardItem>
//                         <Button transparent onPress={() => {
//                             props.navigation.navigate('MyFiles');
//                         }
//                         }>

//                             <Text>My Uploads</Text>
//                             <Icon name="arrow-forward" />
//                         </Button>
//                     </CardItem>
//                     <CardItem>
//                         <Button transparent onPress={() => {
//                             getToken('Profile')
//                         }
//                         }>
//                             <Text>Profile</Text>
//                             <Icon name="arrow-forward" />
//                         </Button>
//                     </CardItem>
//                     <CardItem>
//                         <Button transparent onPress={signOutAsync}>
//                             <Text>Logout</Text>
//                             <Icon name="arrow-forward" />
//                         </Button>
//                     </CardItem>
//                 </Card>
//             </Content>
//         </Container>
//     )
// }

// SideBar.propTypes = {
//     navigation: PropTypes.object,
// };

// export default SideBar;