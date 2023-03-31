//BK2.GET: api/v1/booking/me/read
const fetchGetBookingMeRead = (
    query: IV1QueyGetBookingMeRead & IV1QueryPagination
): Promise<IAPIResponse<IV1Pagination<IV1RespGetBookingMeRead & IV1TablePayments>>> => {
    return Promise.resolve({ code: 200, devMessage: 'OK', data: [] as any })
}

export { fetchGetBookingMeRead }
