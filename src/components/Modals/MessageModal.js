import React from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'

import { Colors, Fonts, Layout } from '../../constants/Values'
import { PrimaryButton } from '../Buttons'
import DividerLine from '../DividerLine'

const MessageModal = ({visible, title, message, onOkay, okayText}) => {
  return (
    <Modal
    visible={visible}
    transparent={true}
    animationType={'fade'}>
      <View style={styles.backgroundOverlay}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <PrimaryButton
          text={okayText ?? 'Got it!'}
          onPress={onOkay} />
        </View>
      </View>
    </Modal>
  )
}

export default MessageModal

const styles = StyleSheet.create({
  backgroundOverlay: {
    flex: 1,
    backgroundColor: Colors.modalOverlayBackground,
    padding: Layout.defaultHorizontalPadding,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    width: '100%',
    backgroundColor: Colors.defaultWhite,
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 10,
    alignItems: 'center'
  },
  title: {
    color: Colors.defaultBlack,
    fontFamily: Fonts.semibold,
    fontSize: 22,
    marginBottom: 20,
  },
  message: {
    color: Colors.defaultBlack,
    fontFamily: Fonts.regular,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20
  },

})