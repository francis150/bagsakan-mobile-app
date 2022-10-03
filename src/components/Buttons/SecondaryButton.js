import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from '@expo/vector-icons/Feather'

import { Colors, Fonts } from '../../constants/Values'

const SecondaryButton = ({style, icon, text, onPress, disabled}) => {
  return (
    <TouchableOpacity 
    activeOpacity={.9}
    style={[styles.container, {opacity: disabled ? .5 : 1}, style]}
    onPress={onPress}
    disabled={disabled}>
        
        {
            icon ?
            <Icon 
            style={styles.icon}
            name={icon}
            size={20}
            color={Colors.defaultWhite} />
            : null
        }

        <Text style={styles.text} >{text}</Text>

    </TouchableOpacity>
  )
}

export default SecondaryButton

const styles = StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: Colors.accentColorLight,
      height: 55,
      borderRadius: 30,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      marginRight: 10
    },
    text: {
      fontFamily: Fonts.semibold,
      fontSize: 16,
      color: Colors.accentColor,
    },
})