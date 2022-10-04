import {useState, useRef, useEffect} from 'react'
import { TouchableOpacity, ImageBackground, StyleSheet, Text, View, ScrollView, Keyboard } from 'react-native'
import { useSelector } from 'react-redux'
import { useNetInfo } from '@react-native-community/netinfo'
import Icon from '@expo/vector-icons/Feather'
import * as Yup from 'yup'

import { fireDb, fireAuth } from '../../../config/Firebase'
import {collection, query, where, getDocs, doc, updateDoc, deleteField } from 'firebase/firestore'
import { updateProfile, updateEmail } from 'firebase/auth'

import {Colors, Fonts, Layout, Assets} from '../../../constants/Values'
import { StackHeader } from '../../../components/Headers'
import { LoadingModal, MessageModal } from '../../../components/Modals'
import { LoadingPlaceholder } from '../../../components/Placeholders'
import DividerLine from '../../../components/DividerLine'
import { InputText, InputSelect } from '../../../components/Inputs'
import { PrimaryButton } from '../../../components/Buttons'

const EditProfileScreen = ({navigation}) => {

  const [isAppLoading, setIsAppLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const currentUser = useSelector(state => state.currentUserState.data)
  const netInfo = useNetInfo()
  const [isUpdatedButtonDisabled, setIsUpdatedButtonDisabled] = useState(true)
  const [showDisconnectionNotice, setShowDisconnectionNotice] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  if (!currentUser) return (<LoadingPlaceholder />)

  // structure original data
  const initialData = {
    firstName: currentUser.first_name,
    lastName: currentUser.last_name,
    city__id: currentUser.address.id,
    city__city: currentUser.address.city,
    city__text: currentUser.address.province ? `${currentUser.address.city} - ${currentUser.address.province}` : currentUser.address.city,
    city__islandGroup: currentUser.address.island_group,
    neigborhood: currentUser.address.neigborhood,
    streetAddress: currentUser.address.street_address,
  }
  if (currentUser.email) initialData['email'] = currentUser.email
  if (currentUser.address.province) initialData['city__province'] = currentUser.address.province
  // ...
  
  const [originalData, setOriginalData] = useState(initialData)
  const [dataChanges, setDataChanges] = useState(originalData)

  const firstNameInput = useRef()
  const lastNameInput = useRef()
  const neigborhoodInput = useRef()
  const streetAddressInput = useRef()
  const emailAddressInput = useRef()
  const scrollView = useRef()
  
  // listen for dataChanges
  useEffect(() => {
    setIsUpdatedButtonDisabled(isDataEqual(originalData, dataChanges))
    setErrorMessage('')
  }, [originalData, dataChanges])
  
  const onUpdateButtonPressed = () => {
    Keyboard.dismiss()
    setIsAppLoading(true)
    setErrorMessage('')

    setTimeout(async () => {
      try {
        // check internet connection
        if (netInfo.isConnected !== null && !netInfo.isConnected) throw {code: 'INTERNET_CONNECTION_ERROR'}
        // ...

        // validate data
        const validationSchema = Yup.object().shape({
          firstName: Yup.string()
            .required('Please enter your last name.')
            .matches(/^[aA-zZ\s]+$/, 'Please enter a valid last name.')
            .max(40, 'Please enter a valid last name'),
          lastName: Yup.string()
            .required('Please enter your first name.')
            .matches(/^[aA-zZ\s]+$/, 'Please enter a valid first name.')
            .max(40, 'Please enter a valid first name'),
          city__id: Yup.string()
            .required('Please enter your city or municipality.'),
          neigborhood: Yup.string()
            .required('Please enter your barangay.'),
          streetAddress: Yup.string()
            .required('Please enter your street address, phone no., or landmarks.'),
          email: Yup.string()
            .email('Please enter a valid email.')
        })

        await validationSchema.validate(dataChanges)
        // ...

        // check if email already in use
        if (originalData.email !== dataChanges.email) {
          const userQuery = query(collection(fireDb, 'users'), where('email', '==', dataChanges.email))
          const querySnapshot = await getDocs(userQuery)

          if (!querySnapshot.empty) throw {code: 'EMAIL_ALREADY_EXISTS'}
        }
        // ...

        // structure data for db
        const updates = {
          first_name: dataChanges.firstName,
          last_name: dataChanges.lastName,
          address: {
            id: dataChanges.city__id,
            city: dataChanges.city__city,
            neigborhood: dataChanges.neigborhood,
            street_address: dataChanges.streetAddress,
            island_group: dataChanges.city__islandGroup,
            province: dataChanges.city__province ? dataChanges.city__province : deleteField()
          },
          email: dataChanges.email ? dataChanges.email : deleteField()
        }
        // ...

        // update user in db
        const userRef = doc(fireDb, 'users', currentUser.id)
        await updateDoc(userRef, updates)
        // ...

        // update user auth profile
        await updateProfile(fireAuth.currentUser, {
          displayName: `${updates.first_name} ${updates.last_name}`,
        })
        if (dataChanges.email) await updateEmail(fireAuth.currentUser, updates.email)
        // ...

        // success action
        setOriginalData(dataChanges)
        setShowSuccessModal(true)
        
      } catch (err) {

        // no internet connection
        if (err.code == 'INTERNET_CONNECTION_ERROR') return setNoInternetModalShown(true)

        // invalid data
        if (err.name == 'ValidationError') return setErrorMessage(err.errors[0])

        // email already exists
        if (err.code == 'EMAIL_ALREADY_EXISTS') return setErrorMessage('Email already exists.')

        setErrorMessage('Something went wrong please try again later.')
        console.error('EditProfileScreen.js', err.code, err.message)
      } finally {
        setIsAppLoading(false)
        scrollView.current.scrollTo({y: 0, animated: true})
      }
    }, 1000)
  }

  const isDataEqual = (data1, data2) => {
    const data1Keys = Object.keys(data1)
    const data2Keys = Object.keys(data2)

    if (data1Keys.length !== data2Keys.length) return false

    for (let dataKey of data1Keys) {
      if (data1[dataKey] !== data2[dataKey]) return false
    }

    return true
  }

  return (
    <View style={styles.container}>

      <LoadingModal visible={isAppLoading}/>

      <MessageModal
        visible={showDisconnectionNotice}
        title={'No internet connection 😱'}
        message={'It looks like you have a slow or no internet connection. Please check your internet connection and try again.'}
        onOkay={() => setShowDisconnectionNotice(false)}
      />
      
      <MessageModal
        visible={showSuccessModal}
        title={'Info Updated 🎉'}
        message={'You have successfully updated your profile info.'}
        okayText={'Okay!'}
        onOkay={() => setShowSuccessModal(false)}
      />

      <StackHeader
        onBack={() => navigation.goBack()}
        title={'Edit Profile'}
      />

      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        overScrollMode='never'
        keyboardShouldPersistTaps={'handled'}
        ref={scrollView}
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

        <Text style={styles.errorMessage}>{errorMessage}</Text>

        <Text style={styles.label}>Name</Text>

        <InputText
          style={styles.inputText}
          placeholder={'First name'}
          value={dataChanges.firstName}
          onChangeText={(val) => setDataChanges({...dataChanges, firstName: val})}
          returnKeyType={'next'}
          ref={firstNameInput}
          onSubmitEditing={() => lastNameInput.current.focus()}
          blurOnSubmit={false}
        />

        <InputText
          style={styles.lastInputText}
          placeholder={'Last name'}
          value={dataChanges.lastName}
          onChangeText={val => setDataChanges({...dataChanges, lastName: val})}
          returnKeyType={'done'}
          ref={lastNameInput}
        />

        <Text style={styles.label}>Address</Text>

        <InputSelect
          style={styles.inputText}
          placeholder={'City or municipality'}
          value={dataChanges.city__text}
          onChangeText={(item) => {
            const data = {
              city__id: item.id,
              city__city: item.city,
              city__text: item.text,
              city__islandGroup: item.islandGroup,
            }
            if (item.province) data['city__province'] = item.province

            setDataChanges({...dataChanges, ...data})
          }}
          dataFile={'ph-places'}
        />

        <InputText
          style={styles.inputText}
          placeholder={'Barangay'}
          value={dataChanges.neigborhood}
          onChangeText={(val) => setDataChanges({...dataChanges, neigborhood: val})}
          ref={neigborhoodInput}
          returnKeyType={'next'}
          onSubmitEditing={() => streetAddressInput.current.focus()}
          blurOnSubmit={false}
        />

        <InputText
          style={styles.lastInputText}
          placeholder={'Street, house no., landmarks'}
          value={dataChanges.streetAddress}
          onChangeText={(val) => setDataChanges({...dataChanges, streetAddress: val})}
          ref={streetAddressInput}
          returnKeyType={'next'}
          onSubmitEditing={() => emailAddressInput.current.focus()}
          blurOnSubmit={false}
        />
        
        <Text style={styles.label}>Contact</Text>
        
        <InputText
          style={styles.lastInputText}
          prefixIcon={'mail'}
          placeholder={'Email address (Optional)'}
          value={dataChanges.email}
          onChangeText={(val) => setDataChanges({...dataChanges, email: val})}
          ref={emailAddressInput}
          returnKeyType={'done'}
          keyboardType={'email-address'}
          info={'The email address is not required but this will be very useful in retrieving your account.'}
        />

      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          disabled={isUpdatedButtonDisabled}
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
    marginBottom: 10
  },
  errorMessage: {
    marginBottom: 10,
    fontFamily: Fonts.semibold,
    fontSize: 14,
    color: Colors.errorColor,
    alignSelf: 'center',
    textAlign: 'center'
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