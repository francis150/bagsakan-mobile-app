import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from '@expo/vector-icons/Feather'
import {forwardRef, useState, useRef} from 'react'
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
    protectedEntry,
    autoCapitalize
}, ref) => {

    const [isFocused, setIsFocused] = useState(false)
    const [isProtected, setIsProtected] = useState(protectedEntry)

    const inputRef = ref ?? useRef()

  return (
    <TouchableOpacity
        style={[{width: '100%'}, style]}
        activeOpacity={1}
        onPress={() => inputRef.current.focus()}
    >
    <View>

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
            ref={inputRef}
            secureTextEntry={isProtected}
            placeholderTextColor={Colors.placeholderColor}
            autoCorrect={false}
            autoCapitalize={autoCapitalize}
        />

        {
            protectedEntry && value > 0 ?
            <TouchableOpacity
            style={styles.suffixIcon}
            activeOpacity={.7}
            onPress={() => setIsProtected(!isProtected)}>
                <Icon 
                    name={ isProtected ? 'eye' : 'eye-off' }
                    size={20} 
                    color={ isFocused ? Colors.accentColor : Colors.placeholderColor }
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
    </TouchableOpacity>
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
        height: 58,
        width: '100%',
        borderWidth: 1,
        borderRadius: 15,
        alignItems: 'center',
        paddingLeft: 20,
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
        fontSize: 18,
        marginRight: 20,
    },
    suffixIcon: {
        height: '100%',
        paddingRight: 20,
        justifyContent: 'center',
    },
    infoText: {
        fontFamily: Fonts.regular,
        fontSize: 12,
        marginTop: 5
    },
})