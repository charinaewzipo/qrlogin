import { createContext, useEffect, useCallback, useReducer, useState } from 'react'
import CryptoJS from 'crypto-js'
import { ENCRYPTED_REMEMBER_KEY } from '@ku/constants/config'
import userReducer, {
    initialState,
    getUser,
    login as loginViaRedux,
    logout as logoutViaRedux,
} from '@ku/redux/user'
import { get } from 'lodash'

const REMEMBER_KEY = 'kusec-user'
const setRemember = async (loginData: ILogin) => {
    if (loginData.remember) {
        const encryptData = [
            loginData.remember ? 'yes' : 'no',
            CryptoJS.AES.encrypt(loginData.email, ENCRYPTED_REMEMBER_KEY).toString(),
            CryptoJS.AES.encrypt(loginData.password, ENCRYPTED_REMEMBER_KEY).toString(),
        ]
        const loginJsonString = JSON.stringify(encryptData)
        await localStorage.setItem(REMEMBER_KEY, loginJsonString)
    } else {
        await localStorage.removeItem(REMEMBER_KEY)
    }
}

const extractLoginData = (): ILogin => {
    const loginData = typeof window !== 'undefined' ? localStorage.getItem(REMEMBER_KEY) : ''
    if (loginData) {
        const loginJSONFromString = JSON.parse(loginData) || []
        const isRememberString = get(loginJSONFromString, '0', 'no')
        const isRemember = isRememberString === 'yes'
        if (isRemember) {
            const rawEmailData = get(loginJSONFromString, '1', '')
            const rawPwdData = get(loginJSONFromString, '2', '')
            const email = CryptoJS.AES.decrypt(rawEmailData, ENCRYPTED_REMEMBER_KEY).toString(
                CryptoJS.enc.Utf8
            )
            const pwd = CryptoJS.AES.decrypt(rawPwdData, ENCRYPTED_REMEMBER_KEY).toString(
                CryptoJS.enc.Utf8
            )

            return {
                email: email || '',
                password: pwd || '',
                remember: true,
            }
        }
    }
    return {
        email: '',
        password: '',
        remember: false,
    }
}

interface AuthContextProps {
    isAuthenticated: boolean
    isInitialized: boolean
    user: IUser
    loginData: ILogin | null
    login: (loginData: ILogin) => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextProps | null>(null)

type AuthProviderProps = {
    children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [state, dispatch] = useReducer(userReducer, initialState)
    const [loginData, setLoginData] = useState(null)

    const initialize = useCallback(async () => {
        const loginData = extractLoginData()
        setLoginData(loginData)
        await getUser(dispatch)
    }, [])

    useEffect(() => {
        initialize()
    }, [initialize])

    // LOGIN
    const login = async (loginData: ILogin) => {
        setRemember(loginData)
        loginViaRedux(dispatch, loginData)
    }

    // LOGOUT
    const logout = async () => {
        logoutViaRedux(dispatch)
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: true,
                isInitialized: true,
                user: state.user,
                loginData: loginData,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
