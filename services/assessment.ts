import uuidv4 from "@sentry/utils/uuidv4"

const text = `แบบสำรวจการให้บริการของศูนย์เครื่องมือวิทยาศาสตร์ และความต้องการใช้เครื่องมือวิทยาศาสตร์ของคณะวิทยาศาสตร์ มหาวิทยาลัยเกษตรศาสตร์ ประจำปี 2564`

const mockData: IAssessment[] = [
    {
        id: uuidv4(),
        assessmentDateFrom: new Date().toISOString(),
        assessmentDateTo: new Date().toISOString(),
        link: `https://www.google.co.th`,
        name: text,
        status: 'Active'
    },
    {
        id: uuidv4(),
        assessmentDateFrom: new Date().toISOString(),
        assessmentDateTo: new Date().toISOString(),
        link: `https://www.google.co.th`,
        name: text,
        status: 'Inactive'
    },
    {
        id: uuidv4(),
        assessmentDateFrom: new Date().toISOString(),
        assessmentDateTo: new Date().toISOString(),
        link: `https://www.google.co.th`,
        name: text,
        status: 'Inactive'
    }
]

const fetchGetAssessments = (): Promise<IResponse<IAssessment[]>> => {
    /* @ts-ignore */
    return Promise.resolve({ code: 200, message: 'OK', data: mockData })
}

const mockPaticipationData: IAssessmentParticipation[] = [
    {
        id: '6051501001',
        name: 'Eleanor Pena',
        email: 'eleanor.user@mail.com',
        position: 'Master student',
        department: 'Information technology',
        accountExpiry: new Date().toString(),
        assessDate: new Date().toString(),
        status: 'Done',
    },
    {
        id: '6051501001',
        name: 'Eleanor Pena',
        email: 'eleanor.user@mail.com',
        position: 'Master student',
        department: 'Information technology',
        accountExpiry: new Date().toString(),
        assessDate: new Date().toString(),
        status: 'Done',
    },
    {
        id: '6051501001',
        name: 'Eleanor Pena',
        email: 'eleanor.user@mail.com',
        position: 'Master student',
        department: 'Information technology',
        accountExpiry: new Date().toString(),
        assessDate: new Date().toString(),
        status: 'Done',
    },
    {
        id: '6051501001',
        name: 'Eleanor Pena',
        email: 'eleanor.user@mail.com',
        position: 'Master student',
        department: 'Information technology',
        accountExpiry: new Date().toString(),
        assessDate: '',
        status: 'Pending',
    },
    {
        id: '6051501001',
        name: 'Eleanor Pena',
        email: 'eleanor.user@mail.com',
        position: 'Master student',
        department: 'Information technology',
        accountExpiry: new Date().toString(),
        assessDate: '',
        status: 'Pending',
    },
]
const fetchGetAssessmentPaticipation = (id: string): Promise<IResponse<IAssessmentParticipation[]>> => {
    /* @ts-ignore */
    return Promise.resolve({ code: 200, message: 'OK', data: mockPaticipationData })
}

export {
    fetchGetAssessments,
    fetchGetAssessmentPaticipation
}