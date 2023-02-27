import { createSlice } from '@reduxjs/toolkit'
import { dispatch } from '..'
import { fetchGetUser } from '@ku/services/user'

const initialState: IUserStoreState = {
    isLoading: false,
    error: null,
    user: {
        name: '',
        role: ''
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
        },
        getStateUser(state) {
            return state
        }
    }
})

export default slice.reducer
export const { startLoadingAction, hasErrorAction, getUserAction, getStateUser } = slice.actions

export const getUser = () => async () => {
    dispatch(startLoadingAction())
    try {
        const response = await fetchGetUser()
        setTimeout(() => {
            localStorage.setItem('dataUser', JSON.stringify({ ...response, isAuthenticated: true }));
            dispatch(getUserAction(response))
        }, 2000)
    } catch (error) {
        console.log('error: ', error)
        dispatch(hasErrorAction(error))
    }
}

export const getTodos = () => async () => {
    dispatch(getStateUser())
}


// export const getTodos = () => state.todos.items

// export const getStateUser = () => slice.getInitialState

// export const getStateUser = () => async () => slice.
