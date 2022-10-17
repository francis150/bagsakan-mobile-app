import {useState} from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'
import { loadSecurityPreferences } from '../../../redux/UserPreferencesSlice'

import {Colors, Layout, Fonts} from '../../../constants/Values'
import { StackHeader } from '../../../components/Headers'

const ChangePINScreen = ({navigation}) => {

  const securityPreferencesData = useSelector(state => state.userPreferencesState.securityPreferences)
  const [PIN, setPIN] = useState(securityPreferencesData.pin ?? null)

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
      ></ScrollView>

    </View>
  )
}

export default ChangePINScreen

const styles = StyleSheet.create({})