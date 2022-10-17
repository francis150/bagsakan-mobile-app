import { configureStore } from '@reduxjs/toolkit'

import CurrentUserSlice from './CurrentUserSlice'
import UserPreferencesSlice from './UserPreferencesSlice'

export const store = configureStore({
  reducer: {
    currentUserState: CurrentUserSlice,
    userPreferencesState: UserPreferencesSlice
  },
})