import {useState, useRef} from 'react'
import { Image, Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import {useNetInfo} from '@react-native-community/netinfo'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import * as Yup from 'yup'

import {fireApp, fireAuth, fireDb} from '../../config/Firebase'
import { signInWithPhoneNumber } from 'firebase/auth'
import {collection, query, where, getDocs} from 'firebase/firestore'

import {Colors, Fonts, Layout} from '../../constants/Values'
import { StackHeader } from '../../components/Headers'
import {OTPVerificationModal, MessageModal, LoadingModal} from '../../components/Modals'
import {Link, PrimaryButton} from '../../components/Buttons'
import { InputText } from '../../components/Inputs'

const LoginScreen = ({navigation}) => {

    const [errorMessage, setErrorMessage] = useState('') // Something went wrong please try again.
    const [isAppLoading, setIsAppLoading] = useState(false)

    const [showOTPVerification, setShowOTPVerification] = useState(false)
    const [confirmationResult, setConfirmationResult] = useState(null)

    const netInfo = useNetInfo()
    const [showDisconnectionNotice, setShowDisconnectionNotice] = useState(false)

    const [phoneNumber, setPhoneNumber] = useState('')
    const phoneNumberInput = useRef()

    const reCaptchaVerifier = useRef()

    const onLoginButtonPressed = () => {
        Keyboard.dismiss()
        setErrorMessage('')
        setIsAppLoading(true)

        setTimeout(async () => {
            try {
                // check internet connection
                if (netInfo.isConnected !== null && !netInfo.isConnected) throw {code: 'INTERNET_CONNECTION_ERROR'}
                // ...

                // validate data
                const validationSchema = Yup.object().shape({
                    phoneNumber: Yup.string()
                        .required('Please enter your phone number.')
                        .test('starts-nine', 'Please enter a valid phone number.', (val) => val.charAt(0) == '9')
                        .min(10, 'Please enter a valid phone number.')
                })

                await validationSchema.validate({phoneNumber})
                // ...

                // check if phone number exists
                const userQuery = query(collection(fireDb, 'users'), where('phone_number', '==', `+63${phoneNumber}`))
                const querySnapshot = await getDocs(userQuery)

                if (querySnapshot.empty) throw {code: 'PHONE_NUMBER_NOT_FOUND'}
                // ...

                // singin to firebase auth
                const res = await signInWithPhoneNumber(fireAuth, `+63${phoneNumber}`, reCaptchaVerifier.current)
                setConfirmationResult(res)
                // ...

                // show OTP modal
                setShowOTPVerification(true)
            } catch (err) {
                // no internet connection
                if (err.code == 'INTERNET_CONNECTION_ERROR') return setShowDisconnectionNotice(true)

                // validation error
                if (err.name == 'ValidationError') return setErrorMessage(err.errors[0])

                // phone number does not exist
                if (err.code == 'PHONE_NUMBER_NOT_FOUND') return setErrorMessage('Phone number not found.')

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
        setShowOTPVerification(false)
        setIsAppLoading(true)

        try {
            // check internet connection
            if (netInfo.isConnected !== null && !netInfo.isConnected) throw {code: 'INTERNET_CONNECTION_ERROR'}
            // ...

            // verify code
            await confirmationResult.confirm(code)
        } catch (err) {
            
            // no internet connection
            if (err.code == 'INTERNET_CONNECTION_ERROR') return setShowDisconnectionNotice(true)

            // incorrect otp
            if (err.code === 'auth/invalid-verification-code') return setErrorMessage('Incorrect OTP please try again')

            // otp expired
            if (err.code == 'auth/code-expired') return setErrorMessage('OTP Expired. Please try again.')

            setErrorMessage('Something went wrong please try again.')
            console.error(err.message)
        } finally {
            setIsAppLoading(false)
        }
    }

    const onOTPVerificationCancelled = () => {
        setShowOTPVerification(false)
        setErrorMessage('OTP Verification is required.')
    }

    const onOTPVerificationCodeResend = () => {
        setShowOTPVerification(false)
        onLoginButtonPressed()
    }

    const onRegisterTextPressed = () => {
        setIsAppLoading(true)

        setTimeout(() => {
            navigation.navigate('RegisterScreen_1')
            setIsAppLoading(false)
        }, 1000)
    }

    const onHelpTextPressed = () => {
        console.log('Help text pressed...')
    }

  return (
    <TouchableWithoutFeedback
    onPress={() => phoneNumberInput.current.blur()} >
        <View
        style={styles.container} >

            <LoadingModal
                visible={isAppLoading} 
            />

            <OTPVerificationModal
                visible={showOTPVerification}
                title={'Verify your login'}
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
            onBack={() => console.log('Back pressed')} />
            
            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps={'handled'}
                overScrollMode={'never'} 
            >

                <Image
                    style={styles.logo}
                    source={require('../../assets/images/bare-logo.png')} 
                />

                <Text
                    style={styles.titleText} 
                >Login to your account</Text>

                <Text
                    style={styles.errorMessage}
                >{errorMessage}</Text>

                <InputText 
                    style={styles.inputText}
                    prefixIcon={'smartphone'}
                    prefixText={'+63'}
                    placeholder={'Phone number'}
                    value={phoneNumber}
                    onChangeText={(val) => setPhoneNumber(val)}
                    maxLength={10}
                    keyboardType={'phone-pad'}
                    ref={phoneNumberInput}
                    onSubmitEditing={() => setErrorMessage('')}
                />
                
                <PrimaryButton
                    style={styles.primaryButton}
                    text={'Login'}
                    onPress={onLoginButtonPressed}
                />

                <View 
                    style={styles.registerGroupContainer}
                >
                    <Text style={styles.registerGroupText}>Don't have an account?</Text>
                    <Link style={styles.registerText} text={'Register'} onPress={onRegisterTextPressed} />
                </View>

                <Link
                    style={styles.helpText}
                    text={'Having trouble logging in?'}
                    onPress={onHelpTextPressed}
                />

            </ScrollView>

        </View>
    </TouchableWithoutFeedback>
  )
}

export default LoginScreen

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
        marginBottom: 40
    },
    primaryButton: {
        marginBottom: 40
    },
    registerGroupContainer: {
        flexDirection: 'row',
        marginBottom: 40
    },
    registerGroupText: {
        color: Colors.defaultBlack,
        fontFamily: Fonts.regular,
        fontSize: 14,
    },
    registerText: {
        marginLeft: 5
    },
})