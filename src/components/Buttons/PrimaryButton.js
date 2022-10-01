import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from '@expo/vector-icons/Feather'

import { Colors, Fonts } from '../../constants/Values'

const PrimaryButton = ({style, icon, text, onPress}) => {
  return (
    <TouchableOpacity 
    activeOpacity={.9}
    style={[styles.container, style]}>
        
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

export default PrimaryButton

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.accentColor,
        height: 55,
        borderRadius: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {width: 6, height: 6},
        shadowColor: Colors.accentColor,
        elevation: 20
    },
    icon: {
        marginRight: 10
    },
    text: {
        fontFamily: Fonts.semibold,
        fontSize: 16,
        color: Colors.defaultWhite
    },
})