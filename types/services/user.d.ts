interface IUser {
    uId: number
    uTitle: string
    uFirstname: string
    uSurname: string
    uAddress: string
    uPhoneNumber: string
    authId: number
    authEmail: string
    authAccountStatus: TAccountStatus
    authAccountExpireDate: string | Date | null
    authIsPdpaAccept: boolean
    authIsVerifyEmail: boolean
    authIsAdvisorApprove: boolean
    authAdvisorStatus: TAdcisorApprovalStatus
    authPermission: TPermission
    uiId: number
    uiTypePerson: TTypeOfPerson
    uiDepartment: string
    uiPosition: string
    uiStudentId: string
    uiCardExpireDate: string | Date | null
    uiCardPicture: string
    uiPersonPicture: string
    uiAdvisorCode: string
    uiAdvisorId: number
    uiCreditLimit: number
    uiBookingLimit: number
}