import {useState, createRef} from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import {useNetInfo} from '@react-native-community/netinfo'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'

import {fireApp} from '../../config/Firebase'

import {Colors, Fonts, Layout} from '../../constants/Values'
import { StackHeader } from '../../components/Headers'
import {OTPVerificationModal, MessageModal, LoadingModal} from '../../components/Modals'
import {Link, PrimaryButton} from '../../components/Buttons'
import { InputText } from '../../components/Inputs'

const LoginScreen = () => {

    const netInfo = useNetInfo()
    const [errorMessage, setErrorMessage] = useState('') // Something went wrong please try again.
    const [isAppLoading, setIsAppLoading] = useState(false)

    const [showOTPVerification, setShowOTPVerification] = useState(false)
    const [showDisconnectionNotice, setShowDisconnectionNotice] = useState(false)

    const [phoneNumber, setPhoneNumber] = useState('')
    const phoneNumberInput = createRef()

    const reCaptchaVerifier = createRef()

    const onLoginButtonPressed = () => {
        console.log('Login button pressed')
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
                onSubmit={(otp) => console.log(`OTP: ${otp}`)}
                onResendCode={() => console.log('Resend OTP')}
                onCancel={() => {'OTP Canceled'}} 
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
                    <Link style={styles.registerText} text={'Register'} />
                </View>

                <Link
                    style={styles.helpText}
                    text={'Having trouble logging in?'}
                    onPress={() => console.log('Help text pressed')}
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