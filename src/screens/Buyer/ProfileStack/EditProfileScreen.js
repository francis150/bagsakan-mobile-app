import {useState, useRef} from 'react'
import { TouchableOpacity, ImageBackground, StyleSheet, Text, View, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { useNetInfo } from '@react-native-community/netinfo'
import Icon from '@expo/vector-icons/Feather'

import {Colors, Fonts, Layout, Assets} from '../../../constants/Values'
import { StackHeader } from '../../../components/Headers'
import { LoadingModal } from '../../../components/Modals'
import { LoadingPlaceholder } from '../../../components/Placeholders'
import DividerLine from '../../../components/DividerLine'
import { InputText, InputSelect } from '../../../components/Inputs'
import { PrimaryButton } from '../../../components/Buttons'

const EditProfileScreen = ({navigation}) => {

  const [isAppLoading, setIsAppLoading] = useState(false)
  const currentUser = useSelector(state => state.currentUserState.data)
  const netInfo = useNetInfo()

  if (!currentUser) return (<LoadingPlaceholder />)

  const originalData = {
    firstName: currentUser.first_name,
    lastName: currentUser.last_name,
    city: {
      id: currentUser.address.id,
      city: currentUser.address.city,
      text: currentUser.address.province ? `${currentUser.address.city} - ${currentUser.address.province}` : currentUser.address.city,
      island_group: currentUser.address.island_group,
    },
    neigborhood: currentUser.address.neigborhood,
    streetAddress: currentUser.address.street_address,
  }
  if (currentUser.email_address) originalData['email'] = currentUser.email_address
  if (currentUser.address.province) originalData.city['province'] = currentUser.address.province
  
  const [dataChanges, setDataChanges] = useState(originalData)

  const firstNameInput = useRef()
  const lastNameInput = useRef()
  const neigborhoodInput = useRef()
  const streetAddressInput = useRef()
  const emailAddressInput = useRef()

  const onUpdateButtonPressed = () => {
    console.log('Update profile')
  }

  navigation.addListener('')

  return (
    <View style={styles.container}>

      <LoadingModal visible={isAppLoading}/>

      <StackHeader
        onBack={() => navigation.goBack()}
        title={'Edit Profile'}
      />

      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        overScrollMode='never'
        keyboardShouldPersistTaps={'handled'}
      >

        <ImageBackground
          style={styles.profilePicturePreview}
          imageStyle={{borderRadius: 150}}
          source={currentUser.photo_url ? {uri: currentUser.photo_url.primary} : Assets.avatarPlaceholder}
        >
          <TouchableOpacity style={styles.editProfilePictureIcon} activeOpacity={.8} onPress={() => navigation.navigate('ProfileStack/EditProfilePictureScreen')}>
            <Icon name={'edit'} size={20} color={Colors.accentColor} />
          </TouchableOpacity>
        </ImageBackground>

        <DividerLine style={styles.dividerLine}/>

        <Text style={styles.label}>Name</Text>

        <InputText
          style={styles.inputText}
          placeholder={'First name'}
          value={dataChanges.firstName}
          onChangeText={(val) => setDataChanges({...dataChanges, firstName: val})}
          returnKeyType={'done'}
          ref={firstNameInput}
        />

        {/* <InputText
          style={styles.lastInputText}
          placeholder={'Last name'}
          value={lastName}
          onChangeText={val => setLastName(val)}
          returnKeyType={'done'}
          ref={lastNameInput}
        />

        <Text style={styles.label}>Address</Text>

        <InputSelect
          style={styles.inputText}
          placeholder={'City or municipality'}
          value={city.text}
          onChangeText={(item) => setCity(item)}
          dataFile={'ph-places'}
        />

        <InputText
          style={styles.inputText}
          placeholder={'Barangay'}
          value={neigborhood}
          onChangeText={(val) => setNeigborhood(val)}
          ref={neigborhoodInput}
          returnKeyType={'done'}
        />

        <InputText
          style={styles.lastInputText}
          placeholder={'Street, house no., landmarks'}
          value={streetAddress}
          onChangeText={(val) => setStreetAddress(val)}
          ref={streetAddressInput}
          returnKeyType={'done'}
        />
        
        <Text style={styles.label}>Contact</Text>
        
        <InputText
          style={styles.lastInputText}
          prefixIcon={'mail'}
          placeholder={'Email address (Optional)'}
          value={emailAddress}
          onChangeText={(val) => setEmailAddress(val)}
          ref={emailAddressInput}
          returnKeyType={'done'}
          keyboardType={'email-address'}
          info={'The email address is not required but this will be very useful in retrieving your account.'}
        /> */}

      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          style={styles.updateButton}
          text={'Update'}
          onPress={onUpdateButtonPressed}
        />
      </View>

    </View>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Layout.defaultHorizontalPadding,
  },
  profilePicturePreview: {
    marginTop: 20,
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20
  },
  editProfilePictureIcon: {
    backgroundColor: Colors.accentColorLight,
    width: 30,
    height: 30,
    padding: 5,
    borderRadius: 5,
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  dividerLine: {
    marginBottom: 20
  },
  label: {
    fontFamily: Fonts.semibold,
    fontSize: 14,
    color: Colors.defaultBlack,
    opacity: .5,
    marginBottom: 20
  },
  inputText: {
    marginBottom: 15
  },
  lastInputText: {
    marginBottom: 20
  },
  footer: {
    paddingHorizontal: Layout.defaultHorizontalPadding,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: Colors.defaultWhite,
    elevation: 10,
    shadowColor: Colors.defaultBlack,
    shadowOffset: {width: 0, height: -4},
  }
})