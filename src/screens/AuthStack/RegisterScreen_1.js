import {useState, createRef} from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View, Keyboard } from 'react-native'
import {useNetInfo} from '@react-native-community/netinfo'

import {Colors, Fonts, Layout} from '../../constants/Values'
import { StackHeader } from '../../components/Headers'
import {Link, PrimaryButton} from '../../components/Buttons'
import { InputText } from '../../components/Inputs'
import { LoadingModal } from '../../components/Modals'

const RegisterScreen_1 = ({navigation}) => {

  const [errorMessage, setErrorMessage] = useState('') // Something went wrong please try again.
  const [isAppLoading, setIsAppLoading] = useState(false)
  
  const [firstName, setFirstName] = useState('')
  const firstNameInput = createRef()
  const [lastName, setLastName] = useState('')
  const lastNameInput = createRef()

  const onRootViewPressed = () => {
    firstNameInput.current.blur()
    lastNameInput.current.blur()
  }

  const onNextButtonPressed = () => {

  }
  
  return (
    <TouchableWithoutFeedback
      onPress={onRootViewPressed}
    >
      <View
        style={styles.container}
      >
        
        <LoadingModal
          visible={isAppLoading} 
        />

        <StackHeader
          onPress={() => navigation.goBack()}
          suffixText={'1/3'}
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

          <Text 
            style={styles.titleText}
          >Create your account</Text>

          <Text
            style={styles.errorMessage}
          >{errorMessage}</Text>

          <InputText
            style={styles.inputText}
            placeholder={'First name'}
            value={firstName}
            onChangeText={(val) => setFirstName(val)}
            ref={firstNameInput}
            returnKeyType={'next'}
            onSubmitEditing={() => lastNameInput.current.focus()}
            blurOnSubmit={false}
          />

          <InputText
            style={styles.lastInputText}
            placeholder={'Last name'}
            value={lastName}
            onChangeText={(val) => setLastName(val)}
            ref={lastNameInput}
            returnKeyType={'done'}
            onSubmitEditing={() => Keyboard.dismiss()}
          />

          <PrimaryButton
            style={styles.primaryButton}
            text={'Next'}
            onPress={onNextButtonPressed}
          />

          <View
            style={styles.loginGroupContainer}
          >
            <Text style={styles.loginGroupText} >Already have an account?</Text>
            <Link style={styles.loginText} onPress={() => navigation.goBack()} text={'Login'} />
          </View>

        </ScrollView>

      </View>
    </TouchableWithoutFeedback>
  )
}

export default RegisterScreen_1

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
  },
  primaryButton: {
    marginBottom: 40
  },
  loginGroupContainer: {
    flexDirection: 'row'
  },
  loginGroupText: {
    color: Colors.defaultBlack,
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
  loginText: {
    marginLeft: 5
  }
})