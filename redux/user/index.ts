import { createSlice } from '@reduxjs/toolkit'
import { dispatch } from '..'
import { fetchGetUser } from '@unfinity/services/user'

const initialState: IUserStoreState = {
    isLoading: false,
    error: null,
    user: {
        name: ''
    }
}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        startLoadingAction(state) {
            state.isLoading = true
        },
        hasErrorAction(state, action) {
            state.isLoading = false
            state.error = action.payload
        },
        getUserAction(state, action) {
            state.isLoading = false
            state.user = action.payload
        }
    }
})

export default slice.reducer
export const { startLoadingAction, hasErrorAction, getUserAction } = slice.actions

export const getUser = () => async () => {
    dispatch(slice.actions.startLoadingAction())
    try {
        const response = await fetchGetUser()
        dispatch(slice.actions.getUserAction(response))
    } catch (error) {
        console.log('error: ', error)
        dispatch(slice.actions.hasErrorAction(error))
    }
}