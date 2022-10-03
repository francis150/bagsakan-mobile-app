import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Colors, Fonts } from '../../constants/Values'

const LoadingPlaceholder = () => {
  return (
    <View style={styles.container}>
      <View 
        style={styles.innerContainer}
      >
        
        <ActivityIndicator
        color={Colors.placeholderColor}
        size={16} />

        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  )
}

export default LoadingPlaceholder

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerContainer: {
    flexDirection: 'row',
    alignContent: 'center'
  },
    text: {
    marginLeft: 10,
    color: Colors.defaultBlack,
    fontFamily: Fonts.regular,
    fontSize: 16
  }
})