import {useState} from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

import {Colors, Fonts, Layout} from '../../constants/Values'
import { StackHeader } from '../../components/Headers'
import {OTPVerificationModal, MessageModal} from '../../components/Modals'
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

            <MessageModal
            visible={true}
            title={'No internet connection 😱'}
            message={'It looks like you have a slow or no internet connection. Please check your internet connection and try again.'}
            onOkay={() => console.log('Okay')} />

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