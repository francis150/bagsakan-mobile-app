import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {Layout, Colors, Fonts} from '../../constants/Values'
import { PrimaryButton, SecondaryButton } from '../Buttons'

const ConfirmationModal = ({visible, title, message, onConfirm, confirmButtonText, onCancel, cancelButtonText}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType={'fade'}
    >
      <View style={styles.backgroundOverlay}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonsContainer}>
            <SecondaryButton style={styles.secondaryButton} text={cancelButtonText ?? 'Cancel'} onPress={onCancel} />
            <PrimaryButton style={styles.primaryButton} text={confirmButtonText ?? 'Okay'} onPress={onConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ConfirmationModal

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
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  primaryButton: {
    flex: 2,
    marginLeft: 10
  },
  secondaryButton: {
    flex: 2,
  }
})