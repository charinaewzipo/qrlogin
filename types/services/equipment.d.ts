declare type IEquipmentStatus = 'Available' | 'Unavailable' | 'Temporary Unavailable'
declare type IEquipmentStatusDetail = 'Finish' | 'Pending' 
interface IEquipmentUser {
    id: string
    name: string
    createdAt: string
    lastestUpdate: string
    cover:string
    status: IEquipmentStatus
} 

interface IEquipmentSchedule{
    id: string
    activeDate:string
    time:string
    createBy:string
    createAt:string
    status:IEquipmentStatusDetail
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
