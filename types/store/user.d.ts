interface IUserStoreState {
    error?: any
    isLoading: boolean
    isInitialized: boolean,
    isAuthenticated: boolean,
    user: IUser
}