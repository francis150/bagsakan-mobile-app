import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Colors, Fonts } from '../constants/Values'

const LoadingPlaceholder = () => {
  return (
    <View 
        style={styles.container}
    >
      
      <ActivityIndicator
      color={Colors.placeholderColor}
      size={16} />

      <Text style={styles.text}>Loading...</Text>
    </View>
  )
}

export default LoadingPlaceholder

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignContent: 'center'
    },
    text: {
        marginLeft: 10,
        color: Colors.placeholderColor,
        fontFamily: Fonts.regular,
        fontSize: 16
    }
})