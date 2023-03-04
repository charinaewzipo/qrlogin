import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import { isEmpty, get } from 'lodash'
import { API_URL } from '@ku/constants/config'

const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const contentTypes = !isEmpty(get(config, 'headers.Content-Type', '')) ? get(config, 'headers.Content-Type', '') : 'application/json'
    const configure: AxiosRequestConfig = {
        ...config,
        url: config.url?.replace(/([^:])(\/\/)/g, '$1/')
    }
    return configure
}

const handleRequestError = (error: any) => {
    return Promise.reject(error)
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 6000,
})

axiosInstance.interceptors.request.use(requestInterceptor, handleRequestError)

export const setSession = async (accessToken: string | null) => {
    if (accessToken) {
        await localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        await localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

console.info('Configurated service.')
export default axiosInstance