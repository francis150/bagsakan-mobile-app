import React from 'react'
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack'

import { Colors } from '../constants/Values'

import LoginScreen from '../screens/AuthStack/LoginScreen'
import RegisterScreen_1 from '../screens/AuthStack/RegisterScreen_1'
import RegisterScreen_2 from '../screens/AuthStack/RegisterScreen_2'
import RegisterScreen_3 from '../screens/AuthStack/RegisterScreen_3'

const Stack = createStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerShown: false,
            cardStyle: {backgroundColor: Colors.defaultWhite}
        }}
    >

        <Stack.Screen
            name={'LoginScreen'}
            component={LoginScreen}
        />

        <Stack.Screen
            name={'RegisterScreen_1'}
            component={RegisterScreen_1}
        />

        <Stack.Screen
            name={'RegisterScreen_2'}
            component={RegisterScreen_2}
        />

        <Stack.Screen
            name={'RegisterScreen_3'}
            component={RegisterScreen_3}
        />

    </Stack.Navigator>
  )
}

export default AuthStack