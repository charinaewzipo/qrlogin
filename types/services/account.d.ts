interface IAccountUser {
    id: string
    name: string
    email: string
    permission: PERMISSION
    studentID: string
    supervisorName: string
    creditLimit: number
    bookLimit: number
    phone: string
    expiredate: string
    status: STATUS
    department?:string
    major?: string
}
type IAccountUserStatus = 'Active' | 'Inactive' | 'Locked' |'Pending'
type IAccountUserPermission = 'Admin' | 'Finance' | 'Supervisor' | 'User'
