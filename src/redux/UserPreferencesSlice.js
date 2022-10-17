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
        })
    }
})

export default UserPreferencesSlice.reducer