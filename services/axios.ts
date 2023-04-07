import axios, {
    AxiosRequestConfig,
    AxiosInstance,
    AxiosError,
    AxiosResponse,
    AxiosResponseTransformer,
    AxiosRequestTransformer,
    AxiosRequestHeaders,
} from 'axios'
import { API_URL } from '@ku/constants/config'
import transformer from '@ku/utils/transformer'
import { get, isEmpty } from 'lodash';

const transformResponse: AxiosResponseTransformer = (data) => transformer.snakeToCamelcaseTransform(JSON.parse(data));
const transformRequest: AxiosRequestTransformer  = (data) =>
  JSON.stringify(transformer.camelToSnakecaseTransform(data));

  const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
    // const contentTypes = !isEmpty(get(config, 'headers.Content-Type', ''))
    //     ? get(config, 'headers.Content-Type', '')
    //     : 'application/json'
    const configure: AxiosRequestConfig = {
        ...config,
        url: config.url?.replace(/([^:])(\/\/)/g, '$1/'),
        transformResponse,
        transformRequest,
        // params: isEmpty(config.params) ? {} : transformer.camelToSnakecaseTransform(config.params),
        // headers: {
        //     ...config.headers,
        //     ['Content-Type']: contentTypes,
        // },
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

axiosInstance.defaults.headers.common['Accept'] = 'application/json'
axiosInstance.defaults.headers.common.token = "U2FsdGVkX18SCQi6NdV6mJYacEMplhMDSbr83ezGJKw=";
axiosInstance.defaults.headers['Content-Type'] = "application/json";

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