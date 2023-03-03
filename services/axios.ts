import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import { isEmpty, get } from 'lodash'
import { API_URL } from '@ku/constants/config'

const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const contentTypes = !isEmpty(get(config, 'headers.Content-Type', '')) ? get(config, 'headers.Content-Type', '') : 'application/json'
    const configure: AxiosRequestConfig = {
        ...config,
        headers: {
            ...config.headers,
            ['Content-Type']: contentTypes,
        },
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

// TODO:
export const setSession = (accessToken: string | null) => {
    if (accessToken) {
        axiosInstance.defaults.headers["Authorization"] = `Bearer ${accessToken}`
    } else {
        delete axiosInstance.defaults.headers["Authorization"];
    }
}

console.info('Configurated service.')
export default axiosInstance