import {useState, useEffect} from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { useNetInfo } from '@react-native-community/netinfo'
import * as ImagePicker from 'expo-image-picker'
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'

import {fireStorage, fireDb} from '../../../config/Firebase'
import { ref, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage'
import {doc, updateDoc, deleteField } from 'firebase/firestore'

import {Colors, Fonts, Layout, Assets} from '../../../constants/Values'
import { StackHeader } from '../../../components/Headers'
import { ConfirmationModal, LoadingModal, MessageModal } from '../../../components/Modals'
import { Link, PrimaryButton, SecondaryButton } from '../../../components/Buttons'

const EditProfilePictureScreen = ({navigation}) => {

  const currentUser = useSelector(state => state.currentUserState.data)
  const [isAppLoading, setIsAppLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showDisconnectionNotice, setShowDisconnectionNotice] = useState(false)
  const [showImageRemovalConfirmation, setShowImageRemovalConfirmation] = useState(false)
  const [updateButtonDisabled, setUpdateButtonDisabled] = useState(true)
  const [removeButtonDisabled, setRemoveButtonDisabled] = useState(false)
  const netInfo = useNetInfo()

  if (!currentUser) return (<LoadingPlaceholder />)

  const [imageUri, setImageUri] = useState(currentUser.photo_url ? currentUser.photo_url.primary : null)

  useEffect(() => {
    setTimeout(() => {
      chooseImage()
    }, 500);
  }, [])
  

  useEffect(() => {
    setUpdateButtonDisabled((currentUser.photo_url && currentUser.photo_url.primary == imageUri) || (currentUser.photo_url == imageUri))
    setRemoveButtonDisabled(!imageUri)
  }, [imageUri])
  

  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  }

  const onUpdateButtonPressed = () => {
    setIsAppLoading(true)

    setTimeout( async () => {
      try {
        const fireDbRef = doc(fireDb, 'users', currentUser.id)
        const primaryRef = ref(fireStorage, `users/${currentUser.id}/profile_picture/primary.jpg`)
        const thumbnailRef = ref(fireStorage, `users/${currentUser.id}/profile_picture/thumbnail.jpg`)

        // check internet connection
        if (netInfo.isConnected !== null && !netInfo.isConnected) throw {code: 'INTERNET_CONNECTION_ERROR'}
        // ...

        // check if image is removed to delete in storage
        if (currentUser.photo_url && imageUri == null) {
          // remove from storage
          await deleteObject(primaryRef)
          await deleteObject(thumbnailRef)
          
          // // remove urls from firestore
          await updateDoc(fireDbRef, {photo_url: deleteField()})

          return navigation.goBack()
        }
        // ..
        
        // resize images
        let primaryImage = await manipulateAsync(imageUri, [{resize: {height: 900, width: 900}}], {format: SaveFormat.JPEG})
        let thumbnailImage = await manipulateAsync(imageUri, [{resize: {height: 150, width: 150}}], {format: SaveFormat.JPEG})
        // ...

        // get blobs
        primaryImage = await fetch(primaryImage.uri)
        primaryImage = await primaryImage.blob()
        thumbnailImage = await fetch(thumbnailImage.uri)
        thumbnailImage = await thumbnailImage.blob()
        // ...
        
        // upload to firebase storage
        await uploadBytes(primaryRef, primaryImage)
        await uploadBytes(thumbnailRef, thumbnailImage)
        // ...
        
        // update firestore photo_url
        const primaryUrl = await getDownloadURL(primaryRef)
        const thumbnailUrl = await getDownloadURL(thumbnailRef)

        await updateDoc(fireDbRef, {photo_url: {
          primary: primaryUrl,
          thumbnail: thumbnailUrl
        }})
        // ...

        // success action
        navigation.goBack()

      } catch (err) {

        // no internet connection
        if (err.code == 'INTERNET_CONNECTION_ERROR') return setShowDisconnectionNotice(true)
        
        setErrorMessage('Something went wrong please try again later.')
        console.error('EditProfilePictureScreen.js', err.code, err.message)
      } finally {
        setIsAppLoading(false)
      }
    }, 1000)
  }

  return (
    <View style={styles.container}>

      <LoadingModal visible={isAppLoading} />

      <MessageModal
        visible={showDisconnectionNotice}
        title={'No internet connection 😱'}
        message={'It looks like you have a slow or no internet connection. Please check your internet connection and try again.'}
        onOkay={() => setShowDisconnectionNotice(false)}
      />

      <ConfirmationModal
        visible={showImageRemovalConfirmation}
        title={'Remove Image 😱'}
        message={'Are you sure you want to remove your current profile picture?'}
        onConfirm={() => {
          setImageUri(null)
          setShowImageRemovalConfirmation(false)
        }}
        confirmButtonText={'Yes, remove'}
        onCancel={() => setShowImageRemovalConfirmation(false)}
      />
      
      <StackHeader
        onBack={() => navigation.goBack()}
        title={'Edit Profile Picture'}
      />

      <View style={styles.content}>
        
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        
        <Image
          style={styles.imagePreview}
          source={imageUri ? {uri: imageUri} : Assets.avatarPlaceholder}
        />

        <Link
          style={styles.chooseImageText}
          text={'Choose an image'}
          onPress={chooseImage}
        />

      </View>

      <View style={styles.footer}>

        <SecondaryButton
          style={styles.removButton}
          text={'Remove'}
          onPress={() => setShowImageRemovalConfirmation(true)}
          disabled={removeButtonDisabled}
        />

        <PrimaryButton
          style={styles.updateButton}
          text={'Save changes'}
          onPress={onUpdateButtonPressed}
          disabled={updateButtonDisabled}
        />

      </View>

    </View>
  )
}

export default EditProfilePictureScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultWhite
  },
  content: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: Layout.defaultHorizontalPadding,
    alignItems: 'center'
  },
  errorMessage:{
    marginBottom: 40,
    fontFamily: Fonts.semibold,
    fontSize: 14,
    color: Colors.errorColor,
    alignSelf: 'center',
    textAlign: 'center'
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 40,
  },
  footer: {
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    paddingHorizontal: Layout.defaultHorizontalPadding,
    backgroundColor: Colors.defaultWhite,
    elevation: 10,
    shadowColor: Colors.defaultBlack,
    shadowOffset: {width: 0, height: -4},
  },
  removButton: {
    flex: 1
  },
  updateButton: {
    marginLeft: 10,
    flex: 2
  },
})