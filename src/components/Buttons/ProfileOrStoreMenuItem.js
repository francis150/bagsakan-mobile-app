import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

import {Colors, Fonts} from '../../constants/Values'

const ProfileOrStoreMenuItem = ({style, primaryText, primaryColor, icon, extraText, extraTextColor, onPress}) => {
  return (
    <TouchableOpacity
        style={[styles.container, style]}
        activeOpacity={.5}
        onPress={onPress}
    >
        <View style={styles.prefixIcon}>{icon}</View>

        <Text
            style={[styles.primarytext, {
                color: primaryColor ?? Colors.defaultBlack
            }]}
        >{primaryText}</Text>

        {
            extraText ? <Text style={[styles.extraText, {color: extraTextColor ?? Colors.defaultBlack}]}>{extraText}</Text> : null
        }

        <Feather style={styles.chevronIcon} name="chevron-right" size={20} color={primaryColor ?? Colors.defaultBlack} />
    </TouchableOpacity>
  )
}

export default ProfileOrStoreMenuItem

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    prefixIcon: {
        marginRight: 10
    },
    primarytext: {
        flex: 1,
        fontFamily: Fonts.semibold,
        fontSize: 16
    },
    extraText: {
        marginLeft: 10,
        fontFamily: Fonts.semibold,
        fontSize: 14
    },
    chevronIcon: {
        marginLeft: 5
    },
})