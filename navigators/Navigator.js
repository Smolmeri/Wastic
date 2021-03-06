import React from 'react';
import {Icon} from 'native-base';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';
import Upload from '../views/Upload';
import AuthLoading from '../views/AuthLoading';
import Login from '../views/Login';
import MyFiles from '../views/MyFiles';
import Reserved from '../views/Reserved';

const TabNavigator = createBottomTabNavigator(
    {
        Home,
        Upload,
        Profile,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: () => {
                const { routeName} = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = 'home';
                } else if (routeName === 'Profile') {
                    iconName = 'person';
                } else if (routeName === 'Upload') {
                    iconName = 'add';
                }

                return <Icon name={iconName} size={25} />;
            },
        }),
    }
);

const StackNavigator = createStackNavigator(
    {
        Home: {
            screen: TabNavigator,
            navigationOptions: {
                header: null,
            
            },
            
        },
        Single: {
            screen: Single,
            navigationOptions: {
                header: null,
            },
        },
        Login: {
            screen: Login,
            navigationOptions: {
                header: null,
            
            },
        },
        MyFiles: {
            screen: MyFiles,
            navigationOptions: {
                header: null,
            
            },
        },
        Reserved: {
            screen: Reserved,
            navigationOptions: {
                header: null,
            
            },
        },
    },
);

const Navigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        App: StackNavigator,
        Auth: Login,
    },
    {
        initialRouteName: 'App',
    }
);

export default createAppContainer(Navigator);