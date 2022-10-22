import {useState} from 'react'
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loadSecurityPreferences } from '../../../redux/UserPreferencesSlice'

import {Colors, Layout, Fonts} from '../../../constants/Values'
import { StackHeader } from '../../../components/Headers'
import { SecondaryButton } from '../../../components/Buttons'

const SecuritySettingsScreen = ({navigation}) => {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUserState.data)

  const securityPreferencesData = useSelector(state => state.userPreferencesState.securityPreferences)
  const [securityPreferences, setSecurityPreferences] = useState(securityPreferencesData)  

  const saveAndBack = async () => {
    try {
      await AsyncStorage.setItem('@security_preferences', JSON.stringify(securityPreferences))
      dispatch(loadSecurityPreferences())
    } catch (err) {
      console.error('SecuritySettingsScreen.js/saveAndBack', err.code, err.message)
    } finally {
      navigation.goBack()
    }
  }

  const onPINToggle = (val) => {
    if (val && !currentUser.pin) return navigation.navigate('ProfileStack/ChangePINScreen')
    setSecurityPreferences({...securityPreferences, enable_pin: !securityPreferences.enable_pin})
  }

  return (
    <View style={styles.container}>

      <StackHeader
        title={'Security'}
        onBack={saveAndBack}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps={'handled'}
        overScrollMode={'never'}
      >

        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>Remember me</Text>
          <Switch
            trackColor={{false: Colors.placeholderColor, true: Colors.accentColor}}
            thumbColor={Colors.defaultWhite}
            ios_backgroundColor={Colors.iosSwitchBackground}
            onValueChange={() => setSecurityPreferences({...securityPreferences, remember_me: !securityPreferences.remember_me})}
            value={securityPreferences.remember_me}
          />
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>Face ID</Text>
          <Switch
            trackColor={{false: Colors.placeholderColor, true: Colors.accentColor}}
            thumbColor={Colors.defaultWhite}
            ios_backgroundColor={Colors.iosSwitchBackground}
            onValueChange={() => setSecurityPreferences({...securityPreferences, face_id: !securityPreferences.face_id})}
            value={securityPreferences.face_id}
          />
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>Fingerprint ID</Text>
          <Switch
            trackColor={{false: Colors.placeholderColor, true: Colors.accentColor}}
            thumbColor={Colors.defaultWhite}
            ios_backgroundColor={Colors.iosSwitchBackground}
            onValueChange={() => setSecurityPreferences({...securityPreferences, fingerprint_id: !securityPreferences.fingerprint_id})}
            value={securityPreferences.fingerprint_id}
          />
        </View>
        
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>4-digit PIN</Text>
          <Switch
            trackColor={{false: Colors.placeholderColor, true: Colors.accentColor}}
            thumbColor={Colors.defaultWhite}
            ios_backgroundColor={Colors.iosSwitchBackground}
            onValueChange={onPINToggle}
            value={securityPreferences.enable_pin}
          />
        </View>

        <SecondaryButton
          style={styles.changePINButton}
          text={currentUser.pin ? 'Change PIN' : 'Setup PIN'}
          onPress={() => console.log('Change PIN')}
          disabled={!securityPreferences.enable_pin}
        />

      </ScrollView>

    </View>
  )
}

export default SecuritySettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultWhite
  },
  content: {
    paddingTop: 20,
    paddingHorizontal: Layout.defaultHorizontalPadding
  },
  itemContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemText: {
    color: Colors.defaultBlack,
    fontFamily: Fonts.semibold,
    fontSize: 16
  },
  changePINButton: {
    marginTop: 20
  }
})