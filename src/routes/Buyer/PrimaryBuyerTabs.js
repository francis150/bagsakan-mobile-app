import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from '@expo/vector-icons/Feather'

import {Colors, Layout} from '../../constants/Values'

import HomeStack from './HomeStack'
import CartStack from './CartStack'
import MessagesStack from './MessagesStack'
import OrdersStack from './OrdersStack'
import ProfileStack from './ProfileStack'

const Tab = createBottomTabNavigator()

const PrimaryBuyerTabs = () => {
  return (
    <Tab.Navigator
        initialRouteName={'ProfileStack'} // TODO remove this later
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.accentColor
        }}
    >

        <Tab.Screen
            name={'HomeStack'}
            component={HomeStack}
            options={{
                title: 'Home',
                tabBarIcon: ({color}) => (
                    <Icon name={'home'} size={Layout.tabBarIconSize} color={color} />
                )
            }}
        />

        <Tab.Screen
            name={'CartStack'}
            component={CartStack}
            options={{
                title: 'Cart',
                tabBarIcon: ({color}) => (
                    <Icon name='shopping-cart' size={Layout.tabBarIconSize} color={color} />
                )
            }}
        />

        <Tab.Screen
            name={'MessagesStack'}
            component={MessagesStack}
            options={{
                title: 'Messages',
                tabBarIcon: ({color}) => (
                    <Icon name='message-square' size={Layout.tabBarIconSize} color={color} />
                )
            }}
        />

        <Tab.Screen
            name={'OrdersStack'}
            component={OrdersStack}
            options={{
                title: 'Orders',
                tabBarIcon: ({color}) => (
                    <Icon name='list' size={Layout.tabBarIconSize} color={color} />
                )
            }}  
        />

        <Tab.Screen
            name={'ProfileStack'}
            component={ProfileStack}
            options={{
                title: 'Profile',
                tabBarIcon: ({color}) => (
                    <Icon name='user' size={Layout.tabBarIconSize} color={color} />
                )
            }}
        />
        
    </Tab.Navigator>
  )
}

export default PrimaryBuyerTabs