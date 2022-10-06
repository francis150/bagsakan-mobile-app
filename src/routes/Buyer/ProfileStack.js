import {useLayoutEffect} from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import {Colors} from '../../constants/Values'

import ProfileStackScreen from '../../screens/Buyer/ProfileStack/ProfileStackScreen'
import EditProfileScreen from '../../screens/Buyer/ProfileStack/EditProfileScreen'
import EditProfilePictureScreen from '../../screens/Buyer/ProfileStack/EditProfilePictureScreen'
import NotificationsSettingsScreen from '../../screens/Buyer/ProfileStack/NotificationsSettingsScreen'
import SecuritySettingsScreen from '../../screens/Buyer/ProfileStack/SecuritySettingsScreen'
import ChangePINScreen from '../../screens/Buyer/ProfileStack/ChangePINScreen'
import AccountVerificationScreen_1 from '../../screens/Buyer/ProfileStack/AccountVerificationScreen_1'
import AccountVerificationScreen_2 from '../../screens/Buyer/ProfileStack/AccountVerificationScreen_2'
import AccountVerificationScreen_3 from '../../screens/Buyer/ProfileStack/AccountVerificationScreen_3'
import PrivacyPolicyScreen from '../../screens/Buyer/ProfileStack/PrivacyPolicyScreen'
import InviteFriendsScreen from '../../screens/Buyer/ProfileStack/InviteFriendsScreen'

const Stack = createStackNavigator()

const ProfileStack = ({ navigation, route }) => {

  useLayoutEffect(() => {
    if(getFocusedRouteNameFromRoute(route) && getFocusedRouteNameFromRoute(route) !== 'ProfileStack/ProfileStackScreen') {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
     } else {
     navigation.setOptions({tabBarStyle: {display: 'flex'}});
    }
  },[navigation, route])

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
        cardStyle: {
          backgroundColor: Colors.defaultWhite
        }
      }}
    >

      <Stack.Screen
        name={'ProfileStack/ProfileStackScreen'}
        component={ProfileStackScreen}
      />

      <Stack.Screen
        name={'ProfileStack/EditProfileScreen'}
        component={EditProfileScreen}
      />

      <Stack.Screen
        name={'ProfileStack/EditProfilePictureScreen'}
        component={EditProfilePictureScreen}
      />

      <Stack.Screen
        name={'ProfileStack/NotificationsSettingsScreen'}
        component={NotificationsSettingsScreen}
      />

      <Stack.Screen
        name={'ProfileStack/SecuritySettingsScreen'}
        component={SecuritySettingsScreen}
      />

      <Stack.Screen
        name={'ProfileStack/ChangePINScreen'}
        component={ChangePINScreen}
      />

      <Stack.Screen
        name={'ProfileStack/AccountVerificationScreen_1'}
        component={AccountVerificationScreen_1}
      />

      <Stack.Screen
        name={'ProfileStack/AccountVerificationScreen_2'}
        component={AccountVerificationScreen_2}
      />

      <Stack.Screen
        name={'ProfileStack/AccountVerificationScreen_3'}
        component={AccountVerificationScreen_3}
      />

      <Stack.Screen
        name={'ProfileStack/PrivacyPolicyScreen'}
        component={PrivacyPolicyScreen}
      />

      <Stack.Screen
        name={'ProfileStack/InviteFriendsScreen'}
        component={InviteFriendsScreen}
      />
      
    </Stack.Navigator>
  )
}

export default ProfileStack