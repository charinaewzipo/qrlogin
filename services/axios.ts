import axios, {
    AxiosRequestConfig,
    AxiosInstance,
    AxiosError,
    AxiosResponse,
    AxiosRequestHeaders,
} from 'axios'
import { API_URL } from '@ku/constants/config'
import transformer from '@ku/utils/transformer'
const transformResponse = transformer.camelToSnakecaseTransform
const transformRequest = (data) => JSON.stringify(transformer.snakeToCamelcaseTransform(data))

const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const configure: AxiosRequestConfig = {
        ...config,
        headers: {
            ...config.headers,
        } as AxiosRequestHeaders,
        transformResponse,
        transformRequest,
        url: config.url?.replace(/([^:])(\/\/)/g, '$1/'),
    }
    return configure
}

const responseInterceptor = (response: AxiosResponse<IResponse>): any => {
    const successResponse = transformer.response(response)
    return successResponse
}

const handleRequestError = (error: any) => {
    return Promise.reject(error)
}

const handleResponseError = (error: AxiosError<IResponse>): Promise<IResponse> => {
    const errorResponse = transformer.response(error)
    // Handle error modal here
    return Promise.reject(errorResponse)
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 6000,
})

axiosInstance.interceptors.request.use(requestInterceptor, handleRequestError)
axiosInstance.interceptors.response.use(responseInterceptor, handleResponseError)
axiosInstance.defaults.headers.common.token = 'U2FsdGVkX1/wL3FsoaDkGDWstgA874r0P0vfhZHLvRw='
export const TOKEN_KEY = 'kusec-accesstoken'
export const setSession = async (accessToken: string | null) => {
    if (accessToken) {
        await localStorage.setItem(TOKEN_KEY, accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        await localStorage.removeItem(TOKEN_KEY)
        delete axios.defaults.headers.common.Authorization
    }
}

console.info('Configurated service.')
export default axiosInstance
