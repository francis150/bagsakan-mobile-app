import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: null
}

export const CurrentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setCurrentUserData: (state, action) => {
            state.data = action.payload
            console.log('Current user state changed...')
        }
    }
})

export const {setCurrentUserData} = CurrentUserSlice.actions

export default CurrentUserSlice.reducer