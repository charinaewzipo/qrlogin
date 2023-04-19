const fetchGetUser = (): Promise<IResponse<IUser>> => {
    /* @ts-ignore */
    return Promise.resolve({
        code: 200,
        message: 'OK',
        data: {
            uId: 1,
            uTitle: 'Mr.',
            uFirstname: 'Carlota',
            uSurname: 'Monteiro',
            uAddress: '112/321 moo 14 BKK',
            uPhoneNumber: '0864433453',
            authId: 2,
            authEmail: 'carlota.mon@mail.com',
            authAccountStatus: 'ACTIVE',
            authAccountExpireDate: new Date().toISOString(),
            authIsPdpaAccept: true,
            authIsVerifyEmail: true,
            authIsAdvisorApprove: true,
            authAdvisorStatus: 'APPROVE',
            authPermission: 'SUPERVISOR',
            uiId: 3,
            uiTypePerson: 'SCIKU_STUDENT_STAFF',
            uiDepartment: 'Dept. of information technology',
            uiPosition: 'Ph.D. student',
            uiStudentId: '',
            uiCardExpireDate: new Date().toISOString(),
            uiCardPicture: 'https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_4.jpg',
            uiPersonPicture: 'https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_5.jpg',
            uiAdvisorCode: 'AB5432CD',
            uiAdvisorId: 3,
            uiCreditLimit: 15000,
            uiBookingLimit: 3,
        }
    })
}

export {
    fetchGetUser
}