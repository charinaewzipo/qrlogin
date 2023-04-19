interface ISupervisor {
    code: string
    name: string
    email: string
    pic: string
}

interface IV1PostAdvisorRead {
    uiAdvisorCode: string | null
}

interface IV1RespPostAdvisorRead {
    uiPersonPicture: string | null
    uiTypePerson: string
    uiDepartment: string | null
    uTitle: string
    uFirstname: string
    uSurname: string
    authEmail: string
}