import {useState, useRef} from 'react'
import { Image, Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'

import {fireApp} from '../../config/Firebase'

import {Colors, Fonts, Layout} from '../../constants/Values'
import { LoadingModal, MessageModal, OTPVerificationModal } from '../../components/Modals'
import { StackHeader } from '../../components/Headers'
import { InputText } from '../../components/Inputs'
import { PrimaryButton } from '../../components/Buttons'

const RegisterScreen_3 = ({navigation}) => {

  const [isAppLoading, setIsAppLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('') // Something went wrong please try again.

  const [showOTPVerificationModal, setShowOTPVerificationModal] = useState(false)
  const [showDisconnectionNotice, setShowDisconnectionNotice] = useState(false)

  const [phoneNumber, setPhoneNumber] = useState('')
  const phoneNumberInput = useRef()
  const [email, setEmail] = useState('')
  const emailInput = useRef()

  const reCaptchaVerifier = useRef()

  const onRootViewPressed = () => {
    phoneNumber.current.blur()
    email.current.blur()
  }

  const onRegisterBottonPressed = () => {
    console.log('Register...')
  }

  return (
    <TouchableWithoutFeedback onPress={onRootViewPressed}>
      <View style={styles.container}>

        <LoadingModal
          visible={isAppLoading}
        />

        <OTPVerificationModal
          visible={showOTPVerificationModal}
          title={'Verify your phone'}
          onSubmit={(otp) => console.log(`OTP: ${otp}`)}
          onResendCode={() => console.log('Resend OTP')}
          onCancel={() => console.log('OTP Canceled')}
        />

        <MessageModal
          visible={showDisconnectionNotice}
          title={'No internet connection 😱'}
          message={'It looks like you have a slow or no internet connection. Please check your internet connection and try again.'}
          onOkay={() => setShowDisconnectionNotice(false)}
        />

        <FirebaseRecaptchaVerifierModal
          ref={reCaptchaVerifier}
          firebaseConfig={fireApp.options}
          attemptInvisibleVerification={true}
          title={'Prove you are a human!'} 
        />

        <StackHeader
          onBack={() => navigation.goBack()}
          suffixText={'3/3'}
        />

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps={'handled'}
          overScrollMode={'never'}
        >

          <Image
            style={styles.logo}
            source={require('../../assets/images/bare-logo.png')}
          />

          <Text style={styles.titleText}>Set your account credentials</Text>

          <Text style={styles.errorMessage}>{errorMessage}</Text>

          <InputText
            style={styles.inputText}
            prefixIcon={'smartphone'}
            prefixText={'+63'}
            placeholder={'Phone number'}
            maxLength={10}
            value={phoneNumber}
            onChangeText={(val) => setPhoneNumber(val)}
            ref={phoneNumberInput}
            returnKeyType={'next'}
            onSubmitEditing={() => emailInput.current.focus()}
            blurOnSubmit={false}
            keyboardType={'phone-pad'}
          />

          <InputText
            style={styles.lastInputText}
            prefixIcon={'mail'}
            placeholder={'Email address (Optional)'}
            value={email}
            onChangeText={(val) => setEmail(val)}
            ref={emailInput}
            returnKeyType={'done'}
            onSubmitEditing={() => Keyboard.dismiss()}
            keyboardType={'email-address'}
            info={'The email address is not required but this will be very useful in retrieving your account.'}
          />

          <PrimaryButton
            text={'Register'}
            onPress={onRegisterBottonPressed}
          />

        </ScrollView>

      </View>
    </TouchableWithoutFeedback>
  )
}

export default RegisterScreen_3

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultWhite
  },
  content: {
    paddingVertical: 50,
    paddingHorizontal: Layout.defaultHorizontalPadding,
    alignItems: 'center'
  },
  logo :{
    height: 50,
    width: 31.54,
    marginBottom: 40,
  },
  titleText: {
    fontFamily: Fonts.semibold,
    fontSize: 24,
    color: Colors.defaultBlack,
    marginBottom: 10
  },
  errorMessage: {
    fontFamily: Fonts.semibold,
    fontSize: 14,
    color: Colors.errorColor,
    marginBottom: 40
  },
  inputText: {
    marginBottom: 20
  },
  lastInputText: {
    marginBottom: 40
  }
})