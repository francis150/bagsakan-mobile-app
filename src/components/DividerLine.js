import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

import {Colors} from '../constants/Values'

const DividerLine = ({style}) => {
  return (
    <View style={[styles.line, style]}>
        <Text>asdf</Text>
    </View>
  )
}

export default DividerLine

const styles = StyleSheet.create({
    line: {
        height: .5,
        width: '100%',
        backgroundColor: Colors.defaultBlack,
        opacity: .1
    }
})