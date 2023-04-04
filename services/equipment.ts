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
    return Promise.resolve({ code: 200, devMessage: 'OK', data: [] as any })
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

//EQ5.POST: api/v1/equipment/maintenance/create
const fetchPostEquipmentMaintenanceCreate = (
    query: IV1PostEquipmentDelete
): Promise<IAPIResponse<IV1RespPostEquipmentDelete>> => {
    return Promise.resolve({ code: 200, devMessage: 'OK', data: [] as any })
}

//EQ6.GET: api/v1/equipment/maintenance/read
const fetchPostEquipmentMaintenanceRead = (
    query: IV1QueryGetEquipmentMaintenanceRead
): Promise<IAPIResponse<IV1Pagination<IV1GetEquipmentMaintenanceRead>>> => {
    return Promise.resolve({
        code: 200,
        devMessage: 'OK',
        data: {
            page: 1,
            limit: 10,
            total: 2,
            dataList: [
                {
                    eqId: 1,
                    eqmtnId: 101,
                    eqmtnDescription: 'Oil Change',
                    eqmtnCost: 50.0,
                    eqmtnDate: '2022-04-01',
                    eqmtnCreatedAt: '2022-04-02T10:00:00Z',
                    eqmtnUpdatedAt: '2022-04-02T12:00:00Z',
                    eqmtnPicLink:
                        'https://media-cdn.bnn.in.th/209499/MacBook_Pro_13-inch_Space_Gray_1.jpg',
                    eqmtnPicCreatedAt: '2022-04-02T11:00:00Z',
                    eqmtnPicUpdatedAt: '2022-04-02T11:30:00Z',
                },
                {
                    eqId: 2,
                    eqmtnId: 102,
                    eqmtnDescription: 'Tire Rotation',
                    eqmtnCost: 30.0,
                    eqmtnDate: '2022-06-15',
                    eqmtnCreatedAt: '2022-06-16T09:00:00Z',
                    eqmtnUpdatedAt: '2022-06-16T10:00:00Z',
                    eqmtnPicLink:
                        'https://media-cdn.bnn.in.th/209499/MacBook_Pro_13-inch_Space_Gray_1.jpg',
                    eqmtnPicCreatedAt: '2022-06-16T09:30:00Z',
                    eqmtnPicUpdatedAt: '2022-06-16T09:45:00Z',
                },
                {
                    eqId: 3,
                    eqmtnId: 103,
                    eqmtnDescription: 'Brake Pad Replacement',
                    eqmtnCost: 150.0,
                    eqmtnDate: '2022-08-10',
                    eqmtnCreatedAt: '2022-08-11T14:00:00Z',
                    eqmtnUpdatedAt: '2022-08-11T16:00:00Z',
                    eqmtnPicLink:
                        'https://media-cdn.bnn.in.th/209499/MacBook_Pro_13-inch_Space_Gray_1.jpg',
                    eqmtnPicCreatedAt: '2022-08-11T15:00:00Z',
                    eqmtnPicUpdatedAt: '2022-08-11T15:30:00Z',
                },
            ],
            totalRecord: 2,
        },
    })
}

//EQ7.POST: api/v1/equipment/maintenance/Update
const fetchPostEquipmentMaintenanceUpdate = (
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
    fetchPostEquipmentMaintenanceRead,
    fetchGetUnAvailableSchedule,
    fetchGetUnAvailableScheduleStats,
    fetchGetEquipmentUnavailable,
    fetchPostEquipmentUnavailableCreate,
    fetchPostEquipmentUnavailableDelete,
}
