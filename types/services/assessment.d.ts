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

interface IBooking {
    id: string
    no: string
    name: string
    equipement: string
    bookingDate: string
    time: string
    requestDate: string
    paymentDate: string
    price: string
    status: IBookingStatus
}

type IBookingStatus = 'Pending' | 'Confirm' | 'Waiting for payment' | 'Finish'