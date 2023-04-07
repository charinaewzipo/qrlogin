// interface IResponse<T = any> {
//   message: string
//   code: number
//   data: T
// }
interface IV1QueryPagination {
  page: number;
  limit: number;
}

interface IV1Pagination<T> {
  page: number;
  limit: number;
  total: number;
  dataList: T[];
  totalRecord: number;
}
declare interface IAPIResponse<T = any> {
  data: T;
  code: number;
  devMessage: string;
  status?: number;
}
