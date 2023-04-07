import messages from '@ku/constants/response';
import { AxiosError, AxiosResponse } from 'axios';
import { camelCase, snakeCase, keys, isEmpty, get, map } from 'lodash'

const isArray = (array: any) => Array.isArray(array)

const isObject = (object: any) => object === Object(object) && !isArray(object) && typeof object !== 'function';

const snakeToCamelcaseTransform = (data: any): { [name: string]: any } | [] => {
  if (isObject(data)) {
    const objectData = data as { [name: string]: any }
    const newObject: { [name: string]: any } = {}
    keys(objectData).forEach((key) => {
      newObject[camelCase(key)] = snakeToCamelcaseTransform(objectData[key]);
    })
    return newObject
  } else if (isArray(data)) {
    const arrayData = data as []
    const newArray = arrayData.map((i) => snakeToCamelcaseTransform(i))
    return newArray
  }
  return data
}

const camelToSnakecaseTransform = (data: any): { [name: string]: any } | [] => {
  if (isObject(data)) {
    const objectData = data as { [name: string]: any }
    const newObject: { [name: string]: any } = {}
    keys(objectData).forEach((key) => {
      newObject[snakeCase(key)] = camelToSnakecaseTransform(objectData[key]);
    })
    return newObject
  } else if (isArray(data)) {
    const arrayData = data as []
    const newArray = arrayData.map((i) => camelToSnakecaseTransform(i))
    return newArray
  }
  return data
}

const response = (response: AxiosError<IResponse> | AxiosResponse<IResponse>): IResponse => {
  if (isEmpty(get(response, 'response', {}))) {
    // Succes case
    const axiosResponse = response as AxiosResponse<IResponse>
    const status: number = get(axiosResponse, 'status', 0)
    const messageCode: number = get(axiosResponse, 'data.code', status)
    const data: any = snakeToCamelcaseTransform(get(axiosResponse, 'data.data', {}))
    return {
      code: messageCode,
      status,
      devMessage: get(messages, messageCode, messages[200]),
      data,
    }
  } else {
    // Error case
    const axiosResponse = response as AxiosError<IResponse>
    const status: number = get(axiosResponse, 'response.status', Number(get(response, 'code', 0)))
    const messageCode: number = get(axiosResponse, 'response.data.code', status)
    const data: any = get(
      axiosResponse,
      'response.data.data',
      get(
        axiosResponse,
        'response.statusText',
        get(axiosResponse, 'message', 0)
      )
    )
    return {
      code: messageCode,
      data,
      status,
      devMessage: get(axiosResponse, 'response.data.devMessage', messages[0]),
    }

  }
}

const urlSearchParams = <T = any>(data: T): string => {
  const snakeCaseData = camelToSnakecaseTransform(data)
  const dataKeys = keys(snakeCaseData) || []
  const params = new URLSearchParams()
  map(dataKeys, (key) => {
    const queryValue = get(snakeCaseData, key, '')
    if (queryValue) {
      params.append(key, queryValue)
    }
    else {
      params.append(key, queryValue)
    }
  })

  if (params.toString()) {
    return `?${params.toString()}`
  }
  return ''
}


const queryToObject = (query: string): any => {
  const urlParams = new URLSearchParams(query)
  const entity = Object.fromEntries(urlParams as any)
  return entity
}

const random = (length: number) => {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let str = '';
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
};


const transformer = {
  snakeToCamelcaseTransform,
  camelToSnakecaseTransform,
  response,
  urlSearchParams,
  queryToObject,
  random,
}
export default transformer
