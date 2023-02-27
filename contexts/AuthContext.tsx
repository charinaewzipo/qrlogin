import { createContext, useEffect, useCallback, useState } from 'react'
// utils
import axios from '@ku/services/axios'
import { LOGIN_PATH } from '@ku/constants/routes'
import { dispatch } from '@ku/redux'
import { getUser } from '@ku/redux/user'

// ----------------------------------------------------------------------
const setSession = (accessToken: string | null) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
        window.location.href = LOGIN_PATH
    }
}

interface AuthContextProps {
    isAuthenticated: boolean
    isInitialized: boolean
    user: IUser
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextProps | null>(null)

// ----------------------------------------------------------------------

type AuthProviderProps = {
    children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated , setisAuthenticated ] = useState(false)
    const initialize = useCallback(async () => {
        try {
            const accessToken =
                typeof window !== 'undefined' ? localStorage.getItem('accessToken') : ''

            // You may checked valid token
            if (accessToken) {
                setSession(accessToken)

                // TODO: Add get user data here
                // const response = await axios.get('/api/account/my-account');
                // const { user } = response.data;

                // dispatch({
                //     type: Types.INITIAL,
                //     payload: {
                //         isAuthenticated: true,
                //         user,
                //     },
                // });
            } else {
                // dispatch({
                //     type: Types.INITIAL,
                //     payload: {
                //         isAuthenticated: false,
                //         user: null,
                //     },
                // });
            }
        } catch (error) {
            console.error(error)
            // dispatch({
            //     type: Types.INITIAL,
            //     payload: {
            //         isAuthenticated: false,
            //         user: null,
            //     },
            // });
        }
    }, [])

    useEffect(() => {
        initialize()
    }, [initialize])

    // LOGIN
    const login = async (email: string, password: string) => {
        // const response = await axios.post('/api/account/login', {
        //     email,
        //     password,
        // });
        // const { accessToken, user } = response.data;
        // setSession(accessToken);
        dispatch(getUser());
        setisAuthenticated(true)
    }

    // LOGOUT
    const logout = async () => {
        setSession(null)
        // dispatch({
        //     type: Types.LOGOUT,
        // });
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: isAuthenticated,
                isInitialized: true,
                user:{role:'',name:''},
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
