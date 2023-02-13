interface IUser {
    name: string
}

interface IUserStoreState {
    isLoading: boolean
    error?: any
    user: IUser
}