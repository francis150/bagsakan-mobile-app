import {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import NetInfo from '@react-native-community/netinfo'

import {LoadingPlaceholder, NoInternetPlaceholder} from '../../../components/Placeholders/'

const ProfileStackScreen = () => {

  const currentUser = useSelector(state => state.currentUserState.data)

  return (
    <View>
      <Text>{JSON.stringify(currentUser)}</Text>
    </View>
  )
}

export default ProfileStackScreen

const styles = StyleSheet.create({})