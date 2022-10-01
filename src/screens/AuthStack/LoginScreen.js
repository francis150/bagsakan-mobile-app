import {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Colors} from '../../constants/Values'

import { StackHeader } from '../../components/Headers'
import {OTPVerificationModal} from '../../components/Modals'
import {PrimaryButton} from '../../components/Buttons'

const LoginScreen = () => {
    const [value, setValue] = useState('')

  return (
    <View
    style={styles.container}>
      <StackHeader
      title={'Notifications'}
      suffixText={'2/3'}
      onBack={() => console.log('Back...')} />

      {/* <OTPVerificationModal
      visible={true}
      title={'Verify your login 🤗'} 
      onSubmit={() => console.log('OTP verify')}
      onCancel={() => console.log('OTP Cancel')}
      onResendCode={() => console.log('OTP Resend')}
      phoneNumber={'+639669257362'} /> */}
      
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})