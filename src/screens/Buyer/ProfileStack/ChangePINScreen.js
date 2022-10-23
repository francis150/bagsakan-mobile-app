import {useEffect, useState, useRef} from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'

import { Colors, Layout, Fonts, } from '../../../constants/Values'
import { LoadingModal, MessageModal } from '../../../components/Modals'
import { StackHeader } from '../../../components/Headers'
import { InputPIN } from '../../../components/Inputs'

const ChangePINScreen = ({navigation}) => {

  const [errorMessage, setErrorMessage] = useState('')
  const [isScreenLoading, setIsScreenLoading] = useState(false)
  const [showDisconnectionNotice, setShowDisconnectionNotice] = useState(false)

  const currentUser = useSelector(state => state.currentUserState.data)

  const [currentPIN, setCurrentPIN] = useState('')
  const [newPIN1, setNewPIN1] = useState('')
  const [newPIN2, setNewPIN2] = useState('')

  return (
    <View style={styles.container}>

      <LoadingModal visible={isScreenLoading}/>

      <MessageModal
        visible={showDisconnectionNotice}
        title={'No internet connection 😱'}
        message={'It looks like you have a slow or no internet connection. Please check your internet connection and try again.'}
        onOkay={() => setShowDisconnectionNotice(false)}
      />

      <StackHeader
        onBack={() => navigation.goBack()}
        title={currentUser.pin ? 'Change PIN' : 'Setup PIN'}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps={'always'}
        overScrollMode={'never'}
      >

        <Text style={styles.errorMessage}>{errorMessage}</Text>

        <Text style={styles.label}>Current PIN</Text>

        <InputPIN
          style={{marginBottom: 60}}
          value={currentPIN}
          onChangeText={val => setCurrentPIN(val)}
        />

        <Text style={styles.label}>New PIN</Text>

        <InputPIN
          style={{marginBottom: 40}}
          value={newPIN1}
          onChangeText={val => setNewPIN1(val)}
        />

        <Text style={styles.label}>Re-enter new PIN</Text>

        <InputPIN
          value={newPIN2}
          onChangeText={val => setNewPIN2(val)}
        />

      </ScrollView>

    </View>
  )
}

export default ChangePINScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingHorizontal: Layout.defaultHorizontalPadding,
    paddingVertical: 80,
    backgroundColor: 'coral'
  },
  errorMessage: {
    marginBottom: 20,
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
})