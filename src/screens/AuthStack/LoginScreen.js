import {useState} from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

import {Colors, Fonts, Layout} from '../../constants/Values'
import { StackHeader } from '../../components/Headers'
import {OTPVerificationModal, MessageModal, LoadingModal} from '../../components/Modals'
import {PrimaryButton} from '../../components/Buttons'

const LoginScreen = () => {
    const [value, setValue] = useState('')

    const onRootViewPressed = () => {
        console.log('Root view pressed')
    }

  return (
    <TouchableWithoutFeedback
    onPress={onRootViewPressed} >
        <View
        style={styles.container} >

            

        </View>
    </TouchableWithoutFeedback>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.defaultWhite
    }
})