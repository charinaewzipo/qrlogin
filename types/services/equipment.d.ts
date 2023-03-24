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
