import {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { Feather } from '@expo/vector-icons'

import {fireAuth} from '../../../config/Firebase'
import {signOut} from 'firebase/auth'

import {Colors, Fonts, Layout, Assets} from '../../../constants/Values'
import {LoadingPlaceholder} from '../../../components/Placeholders/'
import {ModeSwitchButton, ProfileOrStoreMenuItem} from '../../../components/Buttons'
import DividerLine from '../../../components/DividerLine'
import {ConfirmationModal, LoadingModal} from '../../../components/Modals/'

const ProfileStackScreen = ({navigation}) => {

  const [isAppLoading, setIsAppLoading] = useState(false)
  const currentUser = useSelector(state => state.currentUserState.data)
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false)

  const onLogoutConfirm = () => {
    setShowLogoutConfirmation(false)
    setIsAppLoading(true)

    setTimeout(async () => {
      try {
        await signOut(fireAuth)
      } catch (err) {
        console.error('ProfileStackScreen.js', err.code, err.message)
      } finally {
        setIsAppLoading(false)
      }
    }, 1000)
  }

  if (!currentUser) return (<LoadingPlaceholder/>)

  return (
    <View style={styles.container}>
      
      <ConfirmationModal
        visible={showLogoutConfirmation}
        title={'Logout'}
        message={'Are you sure you want to log out?'}
        onConfirm={onLogoutConfirm}
        confirmButtonText={'Yes, Logout'}
        onCancel={() => setShowLogoutConfirmation(false)}
      />

      <LoadingModal visible={isAppLoading} />
      
      <View style={styles.profileInfoContainer}>
        <Image style={styles.profileInfoImage} source={currentUser.photo_url ? {uri: currentUser.photo_url.thumbnail} : Assets.avatarPlaceholder}/>
        <View style={styles.profileInfoTextContainer}>
          <Text style={styles.profileInfoName}>{`${currentUser.first_name} ${currentUser.last_name}`}</Text>
          <Text style={styles.profileInfoPhone}>{currentUser.phone_number}</Text>
        </View>
      </View>
      
      <ModeSwitchButton 
        style={styles.modeSwitchButton}
        to={currentUser.store_id ? 'store' : 'store-setup'} 
        onPress={() => console.log('Mode switch...')}
      />

      <DividerLine />

      <ScrollView
        overScrollMode='never'
        contentContainerStyle={styles.profileMenuContainer}
        keyboardShouldPersistTaps={'handled'}
      >
        
        <ProfileOrStoreMenuItem
          icon={(<Feather name="user" size={20} color={Colors.defaultBlack} />)}
          primaryText={'Edit Profile'}
          onPress={() => navigation.navigate('ProfileStack/EditProfileScreen')}
        />

        <ProfileOrStoreMenuItem
          icon={(<Feather name="bell" size={20} color={Colors.defaultBlack} />)}
          primaryText={'Notifications'}
          onPress={() => navigation.navigate('ProfileStack/NotificationsSettingsScreen')}
        />

        <ProfileOrStoreMenuItem
          icon={(<Feather name={'shield'} size={20} color={Colors.defaultBlack}/>)}
          primaryText={'Security'}
          onPress={() => console.log('Security...')}
        />

        <ProfileOrStoreMenuItem
          primaryText={'Account Verification'}
          icon={(<Feather name="check-circle" size={20} color={Colors.defaultBlack} />)}
          extraText={currentUser.account_verification == 'VERIFIED' ? 'Verified' : currentUser.account_verification == 'PENDING' ? 'Pending' : 'Unverified'}
          extraTextColor={currentUser.account_verification == 'VERIFIED' ? Colors.accentColor : currentUser.account_verification == 'PENDING' ? Colors.placeholderColor : Colors.errorColor}
          onPress={() => console.log('Verification...')}
        />

        <ProfileOrStoreMenuItem
          icon={(<Feather name={'lock'} size={20} color={Colors.defaultBlack}/>)}
          primaryText={'Privacy Policy'}
          onPress={() => console.log('Privacy Policy...')}
        />

        <ProfileOrStoreMenuItem
          icon={(<Feather name={'help-circle'} size={20} color={Colors.defaultBlack}/>)}
          primaryText={'Help Center'}
          onPress={() => console.log('Help Center...')}
        />

        <ProfileOrStoreMenuItem
          icon={(<Feather name={'users'} size={20} color={Colors.defaultBlack}/>)}
          primaryText={'Invite Friends'}
          onPress={() => console.log('Invite Friends...')}
        />

        <ProfileOrStoreMenuItem
          icon={(<Feather name={'log-out'} size={20} color={Colors.errorColor}/>)}
          primaryText={'Logout'}
          primaryColor={Colors.errorColor}
          onPress={() => setShowLogoutConfirmation(true)}
        />

      </ScrollView>

    </View>
  )
}

export default ProfileStackScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.defaultHorizontalPadding
  },
  profileInfoContainer: {
    height: 80,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  profileInfoImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
  },
  profileInfoTextContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  profileInfoName: {
    fontFamily: Fonts.semibold,
    color: Colors.defaultBlack,
    fontSize: 20,
    marginBottom: 3
  },
  profileInfoPhone: {
    color: Colors.defaultBlack,
    opacity: .5,
    fontFamily: Fonts.regular,
    fontSize: 16
  },
  modeSwitchButton: {
    marginVertical: 20
  },
  profileMenuContainer: {
    paddingVertical: 20
  }
})