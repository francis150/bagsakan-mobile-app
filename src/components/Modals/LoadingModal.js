import React from 'react'
import { StyleSheet, Text, View, Modal, ActivityIndicator } from 'react-native'

import { Colors, Fonts } from '../../constants/Values'

const LoadingModal = ({visible}) => {
  return (
    <Modal
    visible={visible}
    transparent={true}
    animationType={'fade'}>
      <View style={styles.backgroundOverlay}>
        <View style={styles.contentContainer}>
          <ActivityIndicator
          animating={visible}
          color={Colors.accentColor}
          size={50} />
          <Text
          style={styles.text} >Just a second...</Text>
        </View>
      </View>
    </Modal>
  )
}

export default LoadingModal

const styles = StyleSheet.create({
  backgroundOverlay: {
    flex: 1,
    backgroundColor: Colors.modalOverlayBackground,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    backgroundColor: Colors.defaultWhite,
    padding: 40,
    borderRadius: 10,
    alignItems: 'center'
  },
  text: {
    marginTop: 20,
    color: Colors.defaultBlack,
    fontFamily: Fonts.regular,
    fontSize: 16
  }
})