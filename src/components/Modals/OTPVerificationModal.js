import {useState, createRef} from 'react'
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback } from 'react-native'

import {Colors, Layout, Fonts} from '../../constants/Values'
import {InputText} from '../Inputs'
import { PrimaryButton, Link } from '../Buttons'

const OTPVerificationModal = ({visible, title, onSubmit, onCancel, onResendCode, phoneNumber}) => {

  const [otp, setOtp] = useState('')
  const otpInput = createRef()
  
  
  return (
    <Modal
    visible={visible}
    transparent={true}
    animationType={'fade'}>
      <View style={styles.backgroundOverlay}>


        <TouchableWithoutFeedback
        onPress={() => otpInput.current.blur()} >
          <View style={styles.contentContainer}>

            <Text style={styles.title}>{title}</Text>

            <InputText
            style={styles.inputText}
            prefixIcon={'hash'}
            placeholder={'One-time PIN'}
            info={`We've sent an OTP to your phone number ${phoneNumber}`}
            value={otp}
            onChangeText={val => setOtp(val)}
            returnKeyType={'done'}
            keyboardType={'numeric'}
            maxLength={6}
            ref={otpInput} />

            <PrimaryButton
            style={styles.primaryButton}
            text={'Verify'}
            onPress={() => onSubmit(otp)} />

            <Link
            style={styles.resendCodeText}
            text={'Resend code'}
            onPress={onResendCode} />

            <Link
            style={styles.cancelText}
            text={'Cancel'}
            onPress={onCancel} />

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
  },
  contentContainer: {
    width: '100%',
    backgroundColor: Colors.defaultWhite,
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 10,
    alignItems: 'center'
  },
  title: {
    color: Colors.defaultBlack,
    fontFamily: Fonts.semibold,
    fontSize: 22,
    marginBottom: 40,
  },
  inputText: {
    marginBottom: 20
  },
  primaryButton: {
    marginBottom: 20
  },
  resendCodeText: {
    marginBottom: 20,
  },
  
})