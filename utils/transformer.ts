import { camelCase, snakeCase, keys, split, head, last, get, map, includes } from 'lodash'

const isArray = (array: any) => Array.isArray(array)

const isObject = (object: any) => object === Object(object) && !isArray(object) && typeof object !== 'function';

const snakecaseTransform = (data: any): { [name: string]: any } | [] => {
  if (isObject(data)) {
    const objectData = data as { [name: string]: any }
    const newObject: { [name: string]: any } = {}
    keys(objectData).forEach((key) => {
      newObject[snakeCase(key)] = snakecaseTransform(objectData[key]);
    })
    return newObject
  } else if (isArray(data)) {
    const arrayData = data as []
    const newArray = arrayData.map((i) => snakecaseTransform(i))
    return newArray
  }
  return data
}

const urlSearchParams = <T = any>(data: T): string => {
  const transformedData = snakecaseTransform(data)

  const dataKeys = keys(transformedData) || []
  const params = new URLSearchParams()
  map(dataKeys, (key) => {
    const queryValue = get(transformedData, key, '')
    if (queryValue) {
      params.append(key, queryValue)
    }
  })

  if (params.toString()) {
    return `?${params.toString()}`
  }
  return ''
}

const transformer = {
  urlSearchParams
}
export default transformer

