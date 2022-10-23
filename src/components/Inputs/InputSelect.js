import {useState, useRef, useEffect} from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import Icon from '@expo/vector-icons/Feather'

import {Colors, Fonts, Layout} from '../../constants/Values'
import InputText from './InputText'
import {StackHeader} from '../Headers'
import LoadingPlaceholder from '../Placeholders/LoadingPlaceholder'

import StaticData from '../../assets/data'

const InputSelect = ({style, prefixIcon, prefixText, placeholder, value, dataFile, onChangeText, onSubmitEditing}) => {

  const [showModal, setShowModal] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const [listData, setListData] = useState(null)
  const [dataSliceLimit, setDataSliceLimit] = useState(50)

  const [primaryValue, setPrimaryValue] = useState(value)
  const searchInput = useRef()

  useEffect(() => {

    const rawData = StaticData(dataFile)

    const filteredData = primaryValue
      ? rawData.filter(({text}) => text.toLocaleLowerCase().includes(primaryValue.toLocaleLowerCase()))
      : rawData

    setListData(filteredData.slice(0, dataSliceLimit))

  }, [dataSliceLimit, primaryValue])
  

  const onInputSelectPressed = () => {
    setShowModal(true)
    setIsFocused(true)
    
    setTimeout(() => {
      searchInput.current.focus()
    }, 500);
  }

  const onItemPressed = (item) => {
    setPrimaryValue(item.text)
    onChangeText(item)
    setShowModal(false)
    setIsFocused(false)
    if (onSubmitEditing) onSubmitEditing()
  }

  const onBackButtonPressed = () => {
    setPrimaryValue(value)
    setShowModal(false)
    setIsFocused(false)
  }

  return (
    <View 
      style={[styles.container, style]}>
      
      <TouchableOpacity
        style={[styles.inputSelectContainer, {
          borderColor: isFocused ? Colors.accentColor : Colors.inputBackground
        }]}
        activeOpacity={.9}
        onPress={onInputSelectPressed}
      >
        
        {
          prefixIcon ? 
          <Icon
            style={styles.inputSelectIcon}
            name={prefixIcon}
            size={20}
            color={isFocused ? Colors.accentColor : value ? Colors.defaultBlack : Colors.placeholderColor}
          />
          : null
        }

        {
          prefixText ?
          <Text style={[styles.inputSelectPrefixText, {
            color: isFocused || value ? Colors.defaultBlack : Colors.placeholderColor
          }]}
          >{prefixText}</Text>
          : null
        }

        <Text 
          numberOfLines={1} 
          style={[styles.inputSelect, {
            color: value ? Colors.defaultBlack : Colors.placeholderColor
          }]}
        >{ value ? value : placeholder}</Text>

      </TouchableOpacity>

      <Modal
        visible={showModal}
        animationType={'slide'}
      >
        <View
          style={styles.modalContainer}
        >

          <StackHeader
            onBack={onBackButtonPressed}
            title={'Search places'} 
          />

          <View
            style={styles.modalContent}
          >

            <InputText
              style={styles.searchInput}
              prefixIcon={'search'}
              placeholder={placeholder}
              ref={searchInput}
              value={primaryValue}
              onChangeText={(val) => setPrimaryValue(val)}
            />

            {
              listData ? 
              <View
                style={styles.listContainer}
              >
                <FlashList
                  data={listData}
                  estimatedItemSize={50}
                  onEndReached={() => setDataSliceLimit(dataSliceLimit + 50)}
                  onEndReachedThreshold={1}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps={'handled'}
                  overScrollMode={'never'}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.listItemContainer}
                      activeOpacity={.5}
                      onPress={() => onItemPressed(item)}
                    >
                      <Text style={styles.listItemText}>{item.text}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
              : 
              <View style={styles.loaderContainer}>
                <LoadingPlaceholder />
              </View>
            }

          </View>

        </View>
      </Modal>
      
    </View>
  )
}

export default InputSelect

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputSelectContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.inputBackground,
    height: 58,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1
  },
  inputSelectIcon: {
    marginRight: 10
  },
  inputSelectPrefixText: {
    fontFamily: Fonts.semibold,
    fontSize: 16,
    marginRight: 5
  },
  inputSelect: {
    flex: 1,
    fontFamily: Fonts.semibold,
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.defaultWhite,
    marginTop: Platform.OS == 'ios' ? 22 : 0,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: Layout.defaultHorizontalPadding,
    paddingTop: 20
  },
  searchInput: {
    marginBottom: 15,
  },
  listContainer: {
    flex: 1,
  },
  listItemContainer: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  listItemText: {
    color: Colors.defaultBlack,
    fontFamily: Fonts.semibold,
    fontSize: 16
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})