import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {Feather, MaterialIcons } from '@expo/vector-icons'

import {Colors, Fonts} from '../../constants/Values'

const ModeSwitchButton = ({style, to, onPress, disabled}) => {
  return (
    <TouchableOpacity
      style={[styles.container, {opacity: disabled ? .5 : 1}, style]}
      activeOpacity={.9}
      onPress={onPress}
      disabled={disabled}
    >
      {
        to == 'profile' ?
        <Feather style={styles.prefixIcon} name={'user'} size={20} color={Colors.accentColor} />
        : <MaterialIcons style={styles.prefixIcon} name="storefront" size={20} color={Colors.accentColor} />
      }

      <Text style={styles.text}>{to == 'store' ? 'Switch to store' : to == 'store-setup' ? 'Start selling now!' : 'Switch to profile'}</Text>

      <Feather style={styles.suffixIcon} name={'refresh-cw'} size={20} color={Colors.accentColor} />
    </TouchableOpacity>
  )
}

export default ModeSwitchButton

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.accentColorLight,
    height: 55,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 50,
  },
  prefixIcon: {
    marginRight: 10
  },
  text: {
    flex: 1,
    fontFamily: Fonts.semibold,
    fontSize: 16,
    color: Colors.accentColor
  },
  suffixIcon: {
    marginLeft: 10
  },
})