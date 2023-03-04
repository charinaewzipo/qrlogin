import { AnyAction, createSlice } from '@reduxjs/toolkit'
import { fetchGetUser } from '@ku/services/user'
import { fetchLogin } from '@ku/services/auth'
import { setSession } from '@ku/services/axios'
import { Dispatch } from 'react'

export const initialState: IUserStoreState = {
    isLoading: false,
    error: null,
    isInitialized: false,
    isAuthenticated: false,
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
            state.isInitialized = true
            state.isAuthenticated = false
            state.error = action.payload
        },
        getUserAction(state, action) {
            state.isLoading = false
            state.isInitialized = true
            state.isAuthenticated = true
            state.user = action.payload
        },
        loginSuccessAction(state, action) {
            state.user = action.payload
            state.isLoading = false
            state.isAuthenticated = true
        },
        clearSessionAction(state) {
            state.isLoading = false
            state.isInitialized = true
            state.isAuthenticated = false
            state.user = null
        },
    }
})

export default slice.reducer
export const { startLoadingAction, hasErrorAction, getUserAction, loginSuccessAction, clearSessionAction } = slice.actions

export const login = async (dispatch: Dispatch<AnyAction>, { remember, ...reuqestData }: ILogin) => {
    dispatch(startLoadingAction())
    try {
        const { data } = await fetchLogin(reuqestData)
        const accessToken = data.accessToken
        const userData = data.user
        if (accessToken) {
            await setSession(accessToken)
            dispatch(loginSuccessAction(userData))
        } else {
            dispatch(clearSessionAction())
        }
    } catch (error) {
        console.log('error: ', error)
        dispatch(hasErrorAction(error))
    }
}

export const getUser = async (dispatch: Dispatch<AnyAction>) => {
    dispatch(startLoadingAction())
    try {
        const accessToken =
            typeof window !== 'undefined' ? localStorage.getItem('accessToken') : ''

        if (accessToken) {
            await setSession(accessToken)
            const { data } = await fetchGetUser()
            dispatch(getUserAction(data))
        } else {
            dispatch(clearSessionAction())
        }
    } catch (error) {
        console.log('error: ', error)
        dispatch(hasErrorAction(error))
    }
}

export const logout = async (dispatch: Dispatch<AnyAction>) => {
    dispatch(clearSessionAction())
    await setSession(null)
}
