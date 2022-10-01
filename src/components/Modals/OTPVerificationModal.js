import {useState, createRef} from 'react'
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback } from 'react-native'

import {Colors, Layout} from '../../constants/Values'
import {InputText} from '../Inputs'

const OTPVerificationModal = ({visible, title, onSubmit, onCancel, onResendCode, phoneNumber,}) => {

  const [otp, setOtp] = useState('')
  const otpInput = createRef()
  
  
  return (
    <Modal
    visible={visible}
    transparent={true}>
      <View style={styles.backgroundOverlay}>


        <TouchableWithoutFeedback
        onPress={() => otpInput.current.blur()} >
          <View style={styles.contentContainer}>

            <Text style={styles.title}>{title}</Text>

            <InputText
            prefixIcon={'hash'}
            placeholder={'One-time PIN'}
            info={`We've sent an OTP to your phone number ${phoneNumber}`}
            value={otp}
            onChangeText={val => setOtp(otp)}
            returnKeyType={'done'}
            keyboardType={'numeric'}
            maxLength={6}
            ref={otpInput} />

          </View>
        </TouchableWithoutFeedback>

      </View>
    </Modal>
  )
}

export default OTPVerificationModal

const styles = StyleSheet.create({
    backgroundOverlay: {
        flex: 1,
        backgroundColor: Colors.modalOverlayBackground,
        padding: Layout.defaultHorizontalPadding,
        justifyContent: 'center',
        alignItems: 'center'
    }
})