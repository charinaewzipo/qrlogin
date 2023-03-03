interface IUser {
    name: string
    role: string
}

interface IUserStoreState {
    isLoading: boolean
    error?: any
    user: IUser
}