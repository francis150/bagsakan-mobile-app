import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import {useState, useEffect, useRef, forwardRef} from 'react'
import * as Yup from 'yup'
import { Colors } from '../../constants/Values'

const InputPIN = forwardRef(({style, value, onChangeText, onSubmitEditing}, ref) => {

    const [isFocused, setIsFocused] = useState(false)
    const hiddenInput = ref ?? useRef()

    const onContainerPress = () => {
        hiddenInput.current.focus()
    }

  return (
    <TouchableWithoutFeedback onPress={onContainerPress}  >
        <View style={[styles.container, style]}>

            <TextInput
                maxLength={4}
                value={value}
                onChangeText={val => { if ( val == '' || /^\d+$/.test(val)) onChangeText(val) }}
                ref={hiddenInput}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                keyboardType={'numeric'}
                style={{opacity: 0, position: 'absolute'}}
                onSubmitEditing={onSubmitEditing}
            />
        
            <View style={[styles.inputWrapper, {borderColor: isFocused ? Colors.accentColor : Colors.inputBackground }]}>
                {value.length > 0 ? <View style={styles.dot}/> : null}
            </View>

            <View style={[styles.inputWrapper, {borderColor: isFocused ? Colors.accentColor : Colors.inputBackground }]}>
                {value.length > 1 ? <View style={styles.dot}/> : null}
            </View>

            <View style={[styles.inputWrapper, {borderColor: isFocused ? Colors.accentColor : Colors.inputBackground }]}>
                {value.length > 2 ? <View style={styles.dot}/> : null}
            </View>

            <View style={[styles.inputWrapper, {marginRight: 0, borderColor: isFocused ? Colors.accentColor : Colors.inputBackground}]}>
                {value.length > 3 ? <View style={styles.dot}/> : null}
            </View>

        </View>
    </TouchableWithoutFeedback>
  )
})

export default InputPIN

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    inputWrapper: {
        backgroundColor: Colors.inputBackground,
        height: 59,
        flex: 1,
        marginRight: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.accentColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dot: {
        height: 15,
        width: 15,
        backgroundColor: Colors.defaultBlack,
        borderRadius: 15
    }
})