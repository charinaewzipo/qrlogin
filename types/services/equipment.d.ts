interface IV1PostEquipmentCreate {
    eqStatus: string
    eqCode: string
    eqName: string
    eqBrand: string
    eqModel: string
    eqDescription: string
    eqPicture: Array<IV1EquipmentPicture>
    eqAvascheDays: Array<string>
    eqAvascheTimes: Array<number>
    eqTypePerson: Array<IV1EquipmentTypePerson>
}

interface IV1RespPostEquipmentCreate {
    eqId: number
}

interface IV1PostEquipmentRead {
    eqId: string
    eqStatus: string
    eqCode: string
    eqName: string
    eqBrand: string
    eqModel: string
    eqDescription: string
    eqPicture: Array<IV1EquipmentPicture>
    eqCreatedAt: timestamp
    eqUpdatedAt: timestamp
    eqAvascheDays: Array<string>
    eqAvascheTimes: Array<number>
    eqTypePerson: Array<IV1EquipmentTypePerson>
}

interface IV1PostEquipmentDelete {
    eqId: number
}

interface IV1RespPostEquipmentDelete {
    eqId: number
}

interface IV1EquipmentPicture {
    eqpicLink: string
    eqpicSort: number
}
interface IV1EquipmentTypePerson {
    eqpscheTypePerson: string
    eqsches: Array<IV1EquipmentSchemaPrice>
}

interface IV1EquipmentSchemaPrice {
    eqpscheSubOption: string | null
    eqpscheChecked: string
    eqpscheName: string
    eqpscheDescription: string | null
    eqpscheUnitPrice: number
    eqpscheUnitPer: string | null
    eqsubsches: Array<IV1EquipmentSubSchemaPrice> | null
}

interface IV1EquipmentSubSchemaPrice {
    eqsubpscheChecked: string
    eqsubpscheName: string
    eqsubpscheDescription: string | null
    eqsubpscheUnitPrice: number
    eqsubpscheUnitPer: string
}

interface IV1QueryGetEquipmentRead {
    eqId?: string
    eqStatus?: string
    eqSearch?: string
    eqSortName?: boolean
    eqSortCode?: boolean
}
interface IV1QueryGetEquipmentUnavailableSchedule {
    startTime?: timestamp
    endTime?: timestamp
    status?: string
}

interface IV1RespGetEquipmentUnavailableSchedule {
    equnavascheId: number
    equnavascheCreatedByName: string
    equnavascheDays: timestamp
    equnavascheTimes: Array<number>
    equnavascheStatus: string
    equnavascheCreatedAt: timestamp
    equnavascheUpdatedAt: timestamp
}

interface IV1RespGetEquipmentUnavailableStatsSchedule {
    upcomingCount: number
    finishCount: number
}
interface IV1GetEquipmentUnavailable {
    eqId: number
    months: number
    years: number
}

interface IV1RespUnavaliableEquipments {
    eqDate: Object<key, Array<number>>
}

interface IV1PostEquipmentUnavailableCreate {
    date: timestamp
    times: Array<number>
    eqId: Array<number>
    status?: string
}

interface IV1RespPostEquipmentUnavailableCreate {
    equnavascheId: number
}

interface IV1PostEquipmentUnavailableDelete {
    equnavascheId: number
}

interface IV1RespPostEquipmentUnavailableDelete {
    equnavascheId: number
}

interface IV1QueryGetEquipmentMaintenanceRead {
    eqId?: number
    eqmtnId?: number
    eqmtnDate?: string
    eqmtnCreatedAt?: string
}

interface IV1GetEquipmentMaintenanceRead {
    eqId: number
    eqmtnId: number
    eqmtnDescription: string
    eqmtnCost: number
    eqmtnDate: string
    eqmtnCreatedAt: string
    eqmtnUpdatedAt: string
    eqmtnPicLink: string
    eqmtnPicCreatedAt: string
    eqmtnPicUpdatedAt: string
}

type TTypeOfChecked = '' | 'FIXED' | 'DEFAULT' | 'UNCHECK' | 'OPTIONAL'
type TSubOptionType = '' | 'ONLY_ONE' | 'AT_LEAST_ONE'