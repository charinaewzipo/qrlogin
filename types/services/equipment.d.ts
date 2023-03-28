declare type STATUS_Equipment = 'Available' | 'Unavailable' | 'Temporary Unavailable'
interface IEquipmentUser {
    id: string
    name: string
    createdAt: string
    lastestUpdate: string
    cover: string
    status: STATUS_Equipment
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
