declare type STATUS_Equipment = 'Available' | 'Unavailable' | 'Temporary Unavailable'
interface IEquipmentUser {
    id: string
    name: string
    createdAt: string
    lastestUpdate: string
    cover:string
    status: STATUS_Equipment
} 

