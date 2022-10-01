import { useState, useEffect, useCallback } from 'react'
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import {useNetInfo} from '@react-native-community/netinfo'

import LoginScreen from './src/screens/AuthStack/LoginScreen'
import { MessageModal } from './src/components/Modals';

export default function App() {

  const [isAppReady, setIsAppReady] = useState(false)

  const [showDisconnectionNotice, setShowDisconnectionNotice] = useState(false)
  const netInfo = useNetInfo()

  useEffect(() => {
    if (netInfo.isConnected !== null && !netInfo.isConnected) return setShowDisconnectionNotice(true)
  }, [netInfo])
  

  useEffect(() => {
    const prep = async () => {
      try {
        // app prep codes here...

        // load fonts
        await Font.loadAsync({
          'urbanist-regular': require('./src/assets/fonts/Urbanist-Regular.ttf'),
          'urbanist-semibold': require('./src/assets/fonts/Urbanist-SemiBold.ttf'),
          'urbanist-bold': require('./src/assets/fonts/Urbanist-Bold.ttf'),
          'urbanist-extrabold': require('./src/assets/fonts/Urbanist-ExtraBold.ttf')
        })
        // ...
        
      } catch (err) {
        console.err('Error on prep...', err.message)
      } finally {
        setIsAppReady(true)
      }
    }

    prep()
  }, [])
  

  const onRootViewLayout = useCallback(async () => {
    if(isAppReady) await SplashScreen.hideAsync()
  }, [isAppReady])

  if (!isAppReady) return null

  return (
    <NavigationContainer>
      <SafeAreaView
      style={styles.container}
      onLayout={onRootViewLayout}>

        <LoginScreen/>

      </SafeAreaView>

      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <MessageModal
      visible={showDisconnectionNotice}
      title={'No internet connection 😱'}
      message={'It looks like you have a slow or no internet connection. Please check your internet connection and try again.'}
      onOkay={() => setShowDisconnectionNotice(false)} />

    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
