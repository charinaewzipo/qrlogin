import { API_URL } from "@ku/constants/config";
import transformer from "@ku/utils/transformer";
import axios from "./axios";
import endpoint from "@ku/constants/endpoint";

//EQ1.POST: api/v1/equipment/create
const fetchPostEquipmentCreate = (
    query: IV1PostEquipmentCreate
): Promise<IAPIResponse<IV1RespPostEquipmentCreate>> => {
    return Promise.resolve({ code: 200, devMessage: 'OK', data: [] as any })
}
//EQ2.GET: api/v1/equipment/read
const fetchGetEquipmentRead = (
    query: IV1QueryPagination & IV1QueryGetEquipmentRead
): Promise<IAPIResponse<IV1Pagination<IV1PostEquipmentRead>>> => {
    return axios.get(`${endpoint.equipmentRead}${transformer.urlSearchParams(query)}`);
}
//EQ3.POST: api/v1/equipment/update
const fetchPostEquipmentUpdate = (
    query: IV1PostEquipmentRead
): Promise<IAPIResponse<IV1PostEquipmentRead>> => {
    return Promise.resolve({ code: 200, devMessage: 'OK', data: [] as any })
}
//EQ4.POST: api/v1/equipment/delete
const fetchPostEquipmentDelete = (
    query: IV1PostEquipmentDelete
): Promise<IAPIResponse<IV1RespPostEquipmentDelete>> => {
    return Promise.resolve({ code: 200, devMessage: 'OK', data: [] as any })
}
//EQ9.GET: api/v1/equipment/unavailable
const fetchGetEquipmentUnavailable = (
    query: IV1GetEquipmentUnavailable
): Promise<IAPIResponse<IV1RespUnavaliableEquipments>> => {
    return Promise.resolve({ code: 200, devMessage: 'OK', data: [] as any })
}
//EQ10.POST: api/v1/equipment/unavailable/create
const fetchPostEquipmentUnavailableCreate = (
    query: IV1PostEquipmentUnavailableCreate
): Promise<IAPIResponse<IV1RespPostEquipmentUnavailableCreate>> => {
    return Promise.resolve({ code: 200, devMessage: 'OK', data: [] as any })
}
//EQ11.POST: api/v1/equipment/unavailable/delete
const fetchPostEquipmentUnavailableDelete = (
    query: IV1PostEquipmentUnavailableDelete
): Promise<IAPIResponse<IV1RespPostEquipmentUnavailableDelete>> => {
    return Promise.resolve({ code: 200, devMessage: 'OK', data: [] as any })
}

//EQ12.GET: api/v1/equipment/unavailable/schedule
const fetchGetUnAvailableSchedule = (
    query: IV1QueryGetEquipmentUnavailableSchedule & IV1QueryPagination
): Promise<IAPIResponse<IV1Pagination<IV1RespGetEquipmentUnavailableSchedule>>> => {
    return Promise.resolve({ code: 200, devMessage: 'OK', data: [] as any })
} //EQ13.GET: api/v1/equipment/unavailable/schedule/stats
const fetchGetUnAvailableScheduleStats = (): Promise<
    IAPIResponse<IV1RespGetEquipmentUnavailableStatsSchedule>
> => {
    return Promise.resolve({ code: 200, devMessage: 'OK', data: [] as any })
}
export {
    fetchPostEquipmentCreate,
    fetchGetEquipmentRead,
    fetchPostEquipmentUpdate,
    fetchPostEquipmentDelete,
    fetchGetUnAvailableSchedule,
    fetchGetUnAvailableScheduleStats,
    fetchGetEquipmentUnavailable,
    fetchPostEquipmentUnavailableCreate,
    fetchPostEquipmentUnavailableDelete,
}
