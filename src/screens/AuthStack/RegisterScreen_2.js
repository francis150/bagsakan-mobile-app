import {useState, useRef} from 'react'
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View, Image, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import * as Yup from 'yup'

import {Colors, Fonts, Layout} from '../../constants/Values'
import { StackHeader } from '../../components/Headers'
import { LoadingModal } from '../../components/Modals'
import { InputSelect, InputText } from '../../components/Inputs'
import { PrimaryButton } from '../../components/Buttons'


const RegisterScreen_2 = ({navigation, route}) => {

    const [errorMessage, setErrorMessage] = useState('') // Something went wrong please try again.
    const [isAppLoading, setIsAppLoading] = useState(false)

    const [city, setCity] = useState({text: ''})
    const [neigborhood, setNeigborhood] = useState('')
    const neigborhoodInput = useRef()
    const [streetAddress, setStreetAddress] = useState('')
    const streetAddressInput = useRef()
    
    const onRootViewPressed = () => {
        neigborhoodInput.current.blur()
        streetAddressInput.current.blur()
    }

    const onNextButtonPressed = () => {
        Keyboard.dismiss()
        setIsAppLoading(true)
        setErrorMessage('')

        setTimeout(async () => {
            try {
                // validate
                const validationSchema = Yup.object().shape({
                    city: Yup.object().shape({
                        id: Yup.string()
                            .required('Please enter your city or municipality.'),
                    }),
                    streetAddress: Yup.string()
                        .required('Please enter your street address, phone no., or landmarks.'),
                    neigborhood: Yup.string()
                        .required('Please enter your barangay.'),
                })

                await validationSchema.validate({streetAddress, neigborhood, city})

                // navigate
                navigation.navigate('RegisterScreen_3', {...route.params, city, neigborhood, streetAddress})
            } catch (err) {
                if (err.name == 'ValidationError') return setErrorMessage(err.errors[0])

                setErrorMessage('Something went wrong. Please contact support.')
                return console.error(err.message)
            } finally {
                setIsAppLoading(false)
            }
        }, 1000)
    }

  return (
    <TouchableWithoutFeedback onPress={onRootViewPressed}>
        <View style={styles.container}>

            <LoadingModal
                visible={isAppLoading}
            />

            <StackHeader
                onBack={() => navigation.goBack()}
                suffixText={'2/3'}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps={'handled'}
                    overScrollMode={'never'}
                    contentInsetAdjustmentBehavior={'always'}
                >

                    <Image
                        style={styles.logo}
                        source={require('../../assets/images/bare-logo.png')}
                    />

                    <Text 
                        style={styles.titleText}
                    >Add your primary address</Text>

                    <Text
                        style={styles.errorMessage}
                    >{errorMessage}</Text>

                    <InputSelect
                        style={styles.inputText}
                        placeholder={'City or municipality'}
                        value={city.text}
                        onChangeText={(item) => setCity(item)}
                        dataFile={'ph-places'}
                        onSubmitEditing={() => setTimeout(() => { neigborhoodInput.current.focus() }, 500)}
                    />

                    <InputText
                        style={styles.inputText}
                        placeholder={'Barangay'}
                        value={neigborhood}
                        onChangeText={(val) => setNeigborhood(val)}
                        ref={neigborhoodInput}
                        returnKeyType={'next'}
                        onSubmitEditing={() => streetAddressInput.current.focus()}
                        blurOnSubmit={false}
                        autoCapitalize={'words'}
                    />

                    <InputText
                        style={styles.lastInputText}
                        placeholder={'Street, house no., landmarks'}
                        value={streetAddress}
                        onChangeText={(val) => setStreetAddress(val)}
                        ref={streetAddressInput}
                        onSubmitEditing={() => Keyboard.dismiss()}
                        returnKeyType={'done'}
                        autoCapitalize={'words'}
                    />

                    <PrimaryButton
                        onPress={onNextButtonPressed}
                        text={'Next'}
                    />

                </ScrollView>
            </KeyboardAvoidingView>

        </View>
    </TouchableWithoutFeedback>
  )
}

export default RegisterScreen_2

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
    logo: {
        height: 50,
        width: 31.54,
        marginBottom: 40,
    },
    titleText: {
        fontFamily: Fonts.semibold,
        fontSize: 22,
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