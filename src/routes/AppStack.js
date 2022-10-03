import {useEffect} from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'

import { useDispatch } from 'react-redux'
import {setCurrentUserData} from '../redux/CurrentUserSlice'

import {fireAuth, fireDb} from '../config/Firebase'
import { onSnapshot, doc } from 'firebase/firestore'

import {Colors} from '../constants/Values'

import PrimaryBuyerTabs from './Buyer/PrimaryBuyerTabs'

const Stack = createStackNavigator()

const AppStack = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    onSnapshot(doc(fireDb, 'users', fireAuth.currentUser.uid), doc => {
      dispatch(setCurrentUserData(doc.data()))
    }, err=> {
      console.error(`ERROR Updating currentUserState on AppStack.js`, err.message)
    })
  }, [])
  

  return (
    <Stack.Navigator
    screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
        cardStyle: {
          backgroundColor: Colors.defaultWhite
        }
    }}>

        <Stack.Screen
          name={'PrimaryBuyerTabs'}
          component={PrimaryBuyerTabs}
        />

    </Stack.Navigator>
  )
}

export default AppStack