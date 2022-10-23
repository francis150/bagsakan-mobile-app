import { ScrollView, StyleSheet, Text, View, Switch } from 'react-native'
import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadNotificationPreferences } from '../../../redux/UserPreferencesSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {Colors, Layout, Fonts} from '../../../constants/Values'
import {StackHeader} from '../../../components/Headers'

const NotificationsSettingsScreen = ({navigation}) => {

  const dispatch = useDispatch()
  
  const notificationPreferencesData = useSelector(state => state.userPreferencesState.notificationPreferences)
  const [notificationPreferences, setNotificationPreferences] = useState(notificationPreferencesData)

  const saveAndBack = async () => {
    try {
      await AsyncStorage.setItem('@notification_preferences', JSON.stringify(notificationPreferences))
      dispatch(loadNotificationPreferences())
    } catch (err) {
      console.error('NotificationSettingsScreen.js/saveAndBack', err.code, err.message)
    } finally {
      navigation.goBack()
    }
  }

  return (
    <View style={styles.container}>

      <StackHeader
        onBack={saveAndBack}
        title={'Notifications'}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps={'handled'}
        overScrollMode={'never'}
      >

        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>General Notifications</Text>
          <Switch
            trackColor={{ false: Colors.placeholderColor, true: Colors.accentColor }}
            thumbColor={Colors.defaultWhite}
            ios_backgroundColor={Colors.iosSwitchBackground}
            onValueChange={() => setNotificationPreferences({...notificationPreferences, general_notifications: !notificationPreferences.general_notifications})}
            value={notificationPreferences.general_notifications}
          />
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>Sound</Text>
          <Switch
            trackColor={{ false: Colors.placeholderColor, true: Colors.accentColor }}
            thumbColor={Colors.defaultWhite}
            ios_backgroundColor={Colors.iosSwitchBackground}
            onValueChange={() => setNotificationPreferences({...notificationPreferences, sound: !notificationPreferences.sound})}
            value={notificationPreferences.sound}
          />
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>Vibration</Text>
          <Switch
            trackColor={{ false: Colors.placeholderColor, true: Colors.accentColor }}
            thumbColor={Colors.defaultWhite}
            ios_backgroundColor={Colors.iosSwitchBackground}
            onValueChange={() => setNotificationPreferences({...notificationPreferences, vibration: !notificationPreferences.vibration})}
            value={notificationPreferences.vibration}
          />
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>Messages</Text>
          <Switch
            trackColor={{ false: Colors.placeholderColor, true: Colors.accentColor }}
            thumbColor={Colors.defaultWhite}
            ios_backgroundColor={Colors.iosSwitchBackground}
            onValueChange={() => setNotificationPreferences({...notificationPreferences, messages: !notificationPreferences.messages})}
            value={notificationPreferences.messages}
          />
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>Order Updates</Text>
          <Switch
            trackColor={{ false: Colors.placeholderColor, true: Colors.accentColor }}
            thumbColor={Colors.defaultWhite}
            ios_backgroundColor={Colors.iosSwitchBackground}
            onValueChange={() => setNotificationPreferences({...notificationPreferences, order_updates: !notificationPreferences.order_updates})}
            value={notificationPreferences.order_updates}
          />
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>Subscribed Products</Text>
          <Switch
            trackColor={{ false: Colors.placeholderColor, true: Colors.accentColor }}
            thumbColor={Colors.defaultWhite}
            ios_backgroundColor={Colors.iosSwitchBackground}
            onValueChange={() => setNotificationPreferences({...notificationPreferences, subscribed_products: !notificationPreferences.subscribed_products})}
            value={notificationPreferences.subscribed_products}
          />
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>Subscribed Store</Text>
          <Switch
            trackColor={{ false: Colors.placeholderColor, true: Colors.accentColor }}
            thumbColor={Colors.defaultWhite}
            ios_backgroundColor={Colors.iosSwitchBackground}
            onValueChange={() => setNotificationPreferences({...notificationPreferences, subscribed_store: !notificationPreferences.subscribed_store})}
            value={notificationPreferences.subscribed_store}
          />
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>Promos & Discounts</Text>
          <Switch
            trackColor={{ false: Colors.placeholderColor, true: Colors.accentColor }}
            thumbColor={Colors.defaultWhite}
            ios_backgroundColor={Colors.iosSwitchBackground}
            onValueChange={() => setNotificationPreferences({...notificationPreferences, promos_discounts: !notificationPreferences.promos_discounts})}
            value={notificationPreferences.promos_discounts}
          />
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>App Updates</Text>
          <Switch
            trackColor={{ false: Colors.placeholderColor, true: Colors.accentColor }}
            thumbColor={Colors.defaultWhite}
            ios_backgroundColor={Colors.iosSwitchBackground}
            onValueChange={() => setNotificationPreferences({...notificationPreferences, app_updates: !notificationPreferences.app_updates})}
            value={notificationPreferences.app_updates}
          />
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>Tips</Text>
          <Switch
            trackColor={{ false: Colors.placeholderColor, true: Colors.accentColor }}
            thumbColor={Colors.defaultWhite}
            ios_backgroundColor={Colors.iosSwitchBackground}
            onValueChange={() => setNotificationPreferences({...notificationPreferences, tips: !notificationPreferences.tips})}
            value={notificationPreferences.tips}
          />
        </View>

      </ScrollView>

    </View>
  )
}

export default NotificationsSettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultWhite
  },
  content: {
    paddingTop: 20,
    paddingHorizontal: Layout.defaultHorizontalPadding
  },
  itemContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemText: {
    color: Colors.defaultBlack,
    fontFamily: Fonts.semibold,
    fontSize: 16
  },
})