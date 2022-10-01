import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from '@expo/vector-icons/Feather'
import {forwardRef, useState} from 'react'
import {Colors, Fonts} from '../../constants/Values'

const InputText = forwardRef(({
    style,
    prefixIcon,
    placeholder,
    value,
    onChangeText,
    maxLength,
    info,
    keyboardType,
    returnKeyType,
    onSubmitEditing,
    blurOnSubmit,
    prefixText,
    protectedEntry
}, ref) => {

    const [isFocused, setIsFocused] = useState(false)
    const [isProtected, setIsProtected] = useState(protectedEntry)

  return (
    <View
    style={style}>

      <View style={[styles.inputContainer, {
        borderColor: isFocused ? Colors.accentColor : Colors.inputBackground
      }]}>
    
        {
            prefixIcon ? 
            <Icon
            style={styles.prefixIcon}
            name={prefixIcon}
            size={20}
            color={ isFocused ? Colors.accentColor : value ? Colors.defaultBlack : Colors.placeholderColor } />
            : null
        }

        {
            prefixText ?
            <Text style={[
                styles.prefixText, 
                {color: isFocused || value ? Colors.defaultBlack : Colors.placeholderColor}
            ]}>{prefixText}</Text>
            : null
        }

        <TextInput
            style={styles.inputText}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            selectionColor={Colors.defaultBlack}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            maxLength={maxLength}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={blurOnSubmit}
            ref={ref}
            secureTextEntry={isProtected}
            placeholderTextColor={Colors.placeholderColor}
        />

        {
            protectedEntry ?
            <TouchableOpacity
            style={styles.suffixIcon}
            activeOpacity={.7}
            onPress={() => setIsProtected(!isProtected)}>
                <Icon 
                    name={ isProtected ? 'eye' : 'eye-off' }
                    size={20} 
                    color={ isFocused ? Colors.accentColor : value ? Colors.defaultBlack : Colors.placeholderColor }
                />
            </TouchableOpacity>
            : null
        }

      </View>

        {
            info ?
            <Text style={[
                styles.infoText, 
                {color: isFocused ? Colors.defaultBlack : Colors.placeholderColor}
            ]}>{info}</Text>
            : null
        }

    </View>
  )
})

export default InputText

const styles = StyleSheet.create({
    container: {
        width:'100%',
    },
    inputContainer: {
        backgroundColor: Colors.inputBackground,
        flexDirection: 'row',
        height: 53,
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 5
    },
    prefixIcon: {
        marginRight: 10
    },
    prefixText: {
        marginRight: 5,
        fontFamily: Fonts.semibold,
        fontSize: 16
    },
    inputText: {
        flex: 1,
        fontFamily: Fonts.semibold,
        fontSize: 16,
    },
    suffixIcon: {
        marginLeft: 10,
    },
    infoText: {
        fontFamily: Fonts.regular,
        fontSize: 12,
    },
})