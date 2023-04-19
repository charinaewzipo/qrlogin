interface IV1PostMemberCreate {
    uTitle: string;
    uFirstname: string;
    uSurname: string;
    uAddress: string;
    uPhoneNumber: string;
    authEmail: string;
    authPassword: string;
    authAccountStatus: TAccountStatus;
    authPermission: TPermission;
    uiTypePerson: TTypeOfPerson;
    uiDepartment: string | null;
    uiCardPicture: string | null;
    uiPersonPicture: string | null;
    uiPosition: string | null;
    uiAdvisorCode: string | null;
    uiStudentId: string | null;
    uiCardExpireDate: string | null;
    uiCreditLimit: number;
    uiBookingLimit: number;
  }
  interface IV1RespPostMemberCreate {
    uId: number;
    authId: number;
    uiId: number;
  }
  interface IV1QueryGetMemberRead {
    authPermission: string;
    authEmail: string;
    uiStudentId: string | null;
    fullName: string;
    authAccountStatus: string;
  }
  interface IV1RespGetMemberRead {
    uId: number;
    uTitle: string;
    uFirstName: string;
    uSurname: string;
    uAddress: string;
    uPhoneNumber: string;
    authId: number;
    authEmail: string;
    authAccountStatus: string;
    authIsPdpaAccept: boolean;
    authIsVerifyEmail: boolean;
    authIsAdvisorApprove: boolean;
    authAdvisorStatus: string;
    authPermission: string;
    uiId: number;
    uiTypePerson: string;
    uiDepartment: string | null;
    uiPosition: string | null;
    uiStudentId: string | null;
    uiCardExpireDate: Date | null;
    uiCardPicture: string | null;
    uiPersonPicture: string | null;
    uiAdvisorCode: string | null;
    uiAdvisorId: number;
    uiAdvisorName: string;
    uiCreditLimit: number;
    uiCreditUsed: number;
    uiBookingLimit: number;
    uiBookingUsed: number;
  }
  interface IV1PostMemberUpdate {
    uId: number;
    uTitle: string;
    uFirstName: string;
    uSurname: string;
    uAddress: string;
    uPhoneNumber: string;
    authEmail: string;
    authPassword: string;
    authAccountStatus: string;
    authPermission: string;
    uiTypePerson: string;
    uiDepartment: string | null;
    uiCardPicture: string | null;
    uiCardExpireDate: Date | null;
    uiStudentId: string | null;
    uiPersonPicture: string | null;
    uiPosition: string | null;
    uiAdvisorCode?: string | null;
    uiCreditLimit: number;
    uiBookingLimit: number;
  }
  interface IV1RespPostMemberUpdate{
    uId: number;
  }
  interface IV1PostMemberDelete{
    uId: number;
  }
  interface IV1RespGetMemberStatusStats {
    memberCountAll: number;
    memberCountActive: number;
    memberCountInactive: number;
    memberCountLocked: number;
  }
  