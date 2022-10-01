import { useState, useEffect, useCallback } from 'react'
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {

  const [isAppReady, setIsAppReady] = useState(false)

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

        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      </SafeAreaView>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
