import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {fireAuth} from '../config/Firebase'
import { signOut } from 'firebase/auth'

import { Link } from '../components/Buttons'

const TestHome = () => {

    const onLogout = async () => {
        try {
            signOut(fireAuth)
        } catch (err) {
            console.error(`Error on logout`, err.message)
        }
    }

  return (
    <View style={styles.container}>
      <Link text={'Logout'} onPress={onLogout}/>
    </View>
  )
}

export default TestHome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})