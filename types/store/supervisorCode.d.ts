interface ISupervisor {
    code: string
    name: string
    email: string
    pic: string
}

interface ISupervisorStoreState {
    isLoading: boolean
    error?: any
    supervisor: ISupervisor
}