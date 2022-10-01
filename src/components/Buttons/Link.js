import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {Colors, Fonts} from '../../constants/Values'

const Link = ({text, onPress, style}) => {
  return (
    <TouchableOpacity
    style={style}
    activeOpacity={.5}
    onPress={onPress} >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Link

const styles = StyleSheet.create({
    text: {
        fontFamily: Fonts.bold,
        fontSize: 14,
        color: Colors.accentColor
    }
})