import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from '@expo/vector-icons/Feather'
import {Colors, Layout, Fonts} from '../../constants/Values'

const StackHeader = ({title, onBack, suffixText}) => {
  return (
    <View 
    style={styles.container}>

        <TouchableOpacity
        activeOpacity={.7}
        onPress={onBack}>
          <Icon
            name={'arrow-left'}
            size={30}
            color={Colors.defaultBlack} 
          />
        </TouchableOpacity>
        
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.suffixText}>{suffixText}</Text>
    </View>
  )
}

export default StackHeader

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.defaultHorizontalPadding
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    textAlign: 'center',
    color: Colors.defaultBlack
  },
  suffixText: {
    width: 30,
    fontFamily: Fonts.semibold,
    color: Colors.defaultBlack,
    fontSize: 16,
    textAlign: 'right'
  },
})