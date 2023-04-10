declare interface IResponse<T = any> {
    data: T
    code: number
    status: number
    devMessage: string
}

declare interface IPagination<T> {
    page: number
    limit: number
    total: number
    dataList: T[]
}

declare interface IQueryPagination {
    page?: number
    limit?: number
}
