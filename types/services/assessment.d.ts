interface IAssessment {
    id: string
    assessmentDateFrom: string
    assessmentDateTo: string
    name: string
    link: string
    status: 'Active' | 'Inactive'
}

interface IAssessmentParticipation {
    id: string
    name: string
    email: string
    position: string
    department: string
    accountExpiry: string
    assessDate: string
    status: 'Done' | 'Pending'
}