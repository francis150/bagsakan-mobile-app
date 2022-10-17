import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadNotificationPreferences = createAsyncThunk(
    'userPreferences/loadNotificationPreferences',
    async () => {
        try {
            // Notification preferences
            const notificationPreferences = await AsyncStorage.getItem('@notification_preferences')

            if (notificationPreferences !== null) {
                return JSON.parse(notificationPreferences)
            } else {
                const defaultNotifPreferences = {
                    general_notifications: true,
                    sound: true,
                    vibration: false,
                    messages: true,
                    order_updates: true,
                    subscribed_products: true,
                    subscribed_store: false,
                    promos_discounts: true,
                    app_updates: false,
                    tips: false,
                }

                await AsyncStorage.setItem('@notification_preferences', JSON.stringify(defaultNotifPreferences))

                const currentValue = await AsyncStorage.getItem('@notification_preferences')
                return JSON.parse(currentValue)
            } 
        } catch (err) {
            console.error('UserPreferencesSlice.js/loadNotificationPreferences', err.code, err.message)
        }
    }
)

export const loadSecurityPreferences = createAsyncThunk(
    'userPreferences/loadSecurityPreferences',
    async () => {
        try {
            // Securty preferences
            const securityPreferences = await AsyncStorage.getItem('@security_preferences')

            if (securityPreferences !== null) {
                return JSON.parse(securityPreferences)
            } else {
                const defaultSecurityPreferences = {
                    remember_me: true,
                    face_id: false,
                    fingerprint_id: false,
                    enable_pin: false
                }

                await AsyncStorage.setItem('@security_preferences', JSON.stringify(defaultSecurityPreferences))

                const currentValue = await AsyncStorage.getItem('@security_preferences')
                return JSON.parse(currentValue)
            }
        } catch (err) {
            console.error('UserPreferencesSlice.js/loadSecurityPreferences', err.code, err.message)
        }
    }
)


const initialState = {
    notificationPreferences: null,
    securityPreferences: null
}

export const UserPreferencesSlice = createSlice({
    name: 'userPreferences',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(loadNotificationPreferences.fulfilled, (state, action) => {
            state.notificationPreferences = action.payload
        }),
        builder.addCase(loadSecurityPreferences.fulfilled, (state, action) => {
            state.securityPreferences = action.payload
        })
    }
})

export default UserPreferencesSlice.reducer