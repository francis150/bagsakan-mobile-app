import {useState, useRef} from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'
import { loadSecurityPreferences } from '../../../redux/UserPreferencesSlice'

import {Colors, Layout, Fonts} from '../../../constants/Values'
import { StackHeader } from '../../../components/Headers'
import { InputText } from '../../../components/Inputs'
import { PrimaryButton } from '../../../components/Buttons'

const ChangePINScreen = ({navigation}) => {

  const [errorMessage, setErrorMessage] = useState('')

  const securityPreferencesData = useSelector(state => state.userPreferencesState.securityPreferences)

  const [oldPIN, setOldPIN] = useState('')
  const [newPIN, setNewPIN] = useState('')
  const [newPINRetype, setNewPINRetype] = useState('')

  const oldPINInput = useRef()
  const newPINInput = useRef()
  const newPINRetypeInput = useRef()

  const onSaveChangesPressed = () => {

  }

  /**
   * NOTE Brain not working try reading this https://firebase.google.com/docs/auth/web/manage-users#re-authenticate_a_user
   */

  return (
    <View style={styles.container}>

      <StackHeader
        title={'Change PIN'}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps={'handled'}
        overScrollMode={'never'}
      >

        <Text style={styles.errorMessage}>{errorMessage}</Text>

        <Text style={styles.label}>Old PIN</Text>
        
        <InputText
          style={styles.lastInputText}
          prefixIcon={'lock'}
          placeholder={'Old 6-digit PIN'}
          ref={oldPINInput}
          value={oldPIN}
          onChangeText={(val) => setOldPIN(val)}
          returnKeyType={'next'}
          keyboardType={'number-pad'}
          onSubmitEditing={() => newPINInput.current.focus()}
          blurOnSubmit={false}
          protectedEntry
          maxLength={6}
        />

        <Text style={styles.label}>New PIN</Text>
        
        <InputText
          style={styles.inputText}
          prefixIcon={'lock'}
          placeholder={'New 6-digit PIN'}
          ref={newPINInput}
          value={newPIN}
          onChangeText={(val) => setNewPIN(val)}
          returnKeyType={'next'}
          keyboardType={'number-pad'}
          onSubmitEditing={() => newPINRetypeInput.current.focus()}
          blurOnSubmit={false}
          protectedEntry
          maxLength={6}
        />

        <InputText
          style={styles.lastInputText}
          prefixIcon={'lock'}
          placeholder={'Re-type 6-digit PIN'}
          ref={newPINRetypeInput}
          value={newPINRetype}
          onChangeText={(val) => setNewPINRetype(val)}
          returnKeyType={'done'}
          keyboardType={'number-pad'}
          protectedEntry
          maxLength={6}
        />

      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          style={styles.primarButton}
          disabled={newPIN.length < 6 || newPINRetype.length < 6}
          text={'Save changes'}
          onPress={onSaveChangesPressed}
        />
      </View>

    </View>
  )
}

export default ChangePINScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultWhite
  },
  content: {
    paddingTop: 20,
    paddingHorizontal: Layout.defaultHorizontalPadding
  },
  errorMessage: {
    marginBottom: 10,
    fontFamily: Fonts.semibold,
    fontSize: 14,
    color: Colors.errorColor,
    alignSelf: 'center',
    textAlign: 'center'
  },
  label: {
    fontFamily: Fonts.semibold,
    fontSize: 14,
    color: Colors.defaultBlack,
    opacity: .5,
    marginBottom: 20
  },
  inputText: {
    marginBottom: 15
  },
  lastInputText: {
    marginBottom: 20
  },
  footer: {
    paddingHorizontal: Layout.defaultHorizontalPadding,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: Colors.defaultWhite,
    elevation: 10,
    shadowColor: Colors.defaultBlack,
    shadowOffset: {width: 0, height: -4},
  }
})