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
}
type STATUS = 'Active' | 'Inactive' | 'Locked'
type PERMISSION = 'Admin' | 'Finance' | 'Supervisor' | 'User'
