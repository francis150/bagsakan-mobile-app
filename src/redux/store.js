import { configureStore } from '@reduxjs/toolkit'

import CurrentUserSlice from './CurrentUserSlice'

export const store = configureStore({
  reducer: {
    currentUserState: CurrentUserSlice
  },
})