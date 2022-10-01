import {useState, useRef} from 'react'
import { Image, Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import {useNetInfo} from '@react-native-community/netinfo'
import * as Yup from 'yup'

import {fireApp, fireDb, fireAuth} from '../../config/Firebase'
import {collection, query, where, getDocs, setDoc, doc} from 'firebase/firestore'
import { signInWithPhoneNumber, updateProfile, updateEmail } from 'firebase/auth'

import {Colors, Fonts, Layout} from '../../constants/Values'
import { LoadingModal, MessageModal, OTPVerificationModal } from '../../components/Modals'
import { StackHeader } from '../../components/Headers'
import { InputText } from '../../components/Inputs'
import { PrimaryButton } from '../../components/Buttons'

const RegisterScreen_3 = ({navigation, route}) => {

  const [isAppLoading, setIsAppLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('') // Something went wrong please try again.

  const [confirmationResult, setConfirmationResult] = useState(null)
  const [showOTPVerificationModal, setShowOTPVerificationModal] = useState(false)

  const netInfo = useNetInfo()
  const [showDisconnectionNotice, setShowDisconnectionNotice] = useState(false)

  const [phoneNumber, setPhoneNumber] = useState('')
  const phoneNumberInput = useRef()
  const [email, setEmail] = useState('')
  const emailInput = useRef()

  const [userFinalData, setUserFinalData] = useState(null)

  const reCaptchaVerifier = useRef()

  const onRootViewPressed = () => {
    phoneNumberInput.current.blur()
    emailInput.current.blur()
  }

  const onRegisterBottonPressed = () => {
    Keyboard.dismiss()
    setIsAppLoading(true)
    setErrorMessage('')

    setTimeout( async () => {
      try {
        // check internet connection
        if (netInfo.isConnected !== null && !netInfo.isConnected) throw {code: 'INTERNET_CONNECTION_ERROR'}
        // ...

        // validate data
        const validationSchema = Yup.object().shape({
          phoneNumber: Yup.string()
            .required('Please enter a phone number.')
            .test('starts-nine', 'Please enter a valid phone number.', (val) => val.charAt(0) == '9')
            .min(10, 'Please enter a valid phone number.'),
          email: Yup.string()
            .email('Please enter a valid email.')
        })

        await validationSchema.validate({phoneNumber, email})
        // ...

        // check if phone already exists
        const userQuery_phone = query(collection(fireDb, 'users'), where('phone_number', '==', `+63${phoneNumber}`))
        const querySnapshot_phone = await getDocs(userQuery_phone)

        if (!querySnapshot_phone.empty) throw {code: 'PHONE_ALREADY_EXISTS'}
        // ...

        // check if email already exists
        const userQuery_email = query(collection(fireDb, 'users'), where('email', '==', email))
        const querySnapshot_email = await getDocs(userQuery_email)

        if (!querySnapshot_email.empty) throw {code: 'EMAIL_ALREADY_EXISTS'}
        // ...

        // compile data
        const userData = {
          address: {
            id: route.params.city.id,
            city: route.params.city.city,
            province: route.params.city.province,
            neigborhood: route.params.neigborhood,
            street_address: route.params.streetAddress,
            island_group: route.params.city.islandGroup,
          },
          first_name: route.params.firstName,
          last_name: route.params.lastName,
          phone_number: `+63${phoneNumber}`,
          account_verification: 'UNVERIFIED'
        }

        if (email) userData['email'] = email
        
        setUserFinalData(userData)
        // ...

        // create user firebase auth
        const res = await signInWithPhoneNumber(fireAuth, `+63${phoneNumber}`, reCaptchaVerifier.current)
        setConfirmationResult(res)
        // ...

        setShowOTPVerificationModal(true)
      } catch (err) {
        
        // no internet
        if (err.code == 'INTERNET_CONNECTION_ERROR') return setShowDisconnectionNotice(true)

        // Validation error
        if (err.name == 'ValidationError') return setErrorMessage(err.errors[0])

        // phone number already exists
        if (err.code == 'PHONE_ALREADY_EXISTS') return setErrorMessage('Phone number already exists.')

        // email already exists
        if (err.code == 'EMAIL_ALREADY_EXISTS') return setErrorMessage('Email already exists.')

        // Firebase recaptcha error
        if (err.code == 'ERR_FIREBASE_RECAPTCHA_CANCEL') return setErrorMessage('reCaptcha required')

        setErrorMessage('Something went wrong please try again later.')
        console.error(err.message)
      } finally {
        setIsAppLoading(false)
      }
    }, 1000)
  }

  const onOTPVerificationVerify = async (code) => {
    setIsAppLoading(true)
    setShowOTPVerificationModal(false)
    
    try {
      // check internet connection
      if (netInfo.isConnected !== null && !netInfo.isConnected) throw {code: 'INTERNET_CONNECTION_ERROR'}
      // ...

      // verify 
      const res = await confirmationResult.confirm(code)
      // ...

      // save user data to firestore
      await setDoc(doc(fireDb, 'users', res.user.uid), userFinalData)
      // ...

      // update user auth info
      await updateProfile(res.user, {
        displayName: `${userFinalData.first_name} ${userFinalData.last_name}`,
        phoneNumber: userFinalData.phone_number
      })

      if (userFinalData.email) await updateEmail(res.user, userFinalData.email)
      // ...

    } catch (err) {
      // no internet
      if (err.code == 'INTERNET_CONNECTION_ERROR') return setNoInternetModalShown(true)

      // incorrect otp
      if (err.code === 'auth/invalid-verification-code') return setErrorMessage('Incorrect OTP please try again')

      // otp expired
      if (err.code == 'auth/code-expired') return setErrorMessage('OTP Expired. Please try again.')
      
      setErrorMessage('Something went wrong please try again later.')
      console.error(err.message)
    } finally {
      setIsAppLoading(false)
    }
  }

  const onOTPVerificationCancelled = () => {
    setShowOTPVerificationModal(false)
    setErrorMessage('OTP Verification is required.')
  }

  const onOTPVerificationCodeResend = () => {
    setShowOTPVerificationModal(false)
    onRegisterBottonPressed()
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
          onSubmit={(otp) => onOTPVerificationVerify(otp)}
          onResendCode={onOTPVerificationCodeResend}
          onCancel={onOTPVerificationCancelled}
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