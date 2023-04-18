type TBookStatus =
    | 'PENDING'
    | 'CONFIRM'
    | 'WAITING_FOR_PAYMENT'
    | 'WAITING_FOR_PAYMENT_CONFIRM'
    | 'CANCELED'
    | 'FINISH'

interface IV1TablePayments {
    payId: number
    payBookId: number
    payQuotationPicture: string
    payInvoicePicture: string
    payReceiptPicture: string
    paySlipPicture: string
    payQrPicture: string
    payQrExpiry: string
    payQrRef1: string
    payQrRef2: string
    payOt: number
    payDiscount: number
    payFees: number
    payTotal: number
    payRemark: string
    payBillingAddress: string
    payReceiptNumber: string
    payDateTime: string
    payAmount: number
    payCreatedAt: string
    payUpdatedAt: string
}

interface IV1RespGetBookingMeRead {
    eqId: number
    eqCreateBy: number
    eqStatus: IEquipmentStatus
    eqCode: string
    eqName: string
    eqBrand: string
    eqModel: string
    eqDescription: string
    eqPictures: IV1EquipmentPictures[]
    eqCreatedAt: string
    eqUpdatedAt: string
    bookId: number
    bookOwner: number
    bookAdvisor: number
    bookStatus: TBookStatus
    bookCreatedAt: string
    eqRtimDays: string
    eqRtimTimes: number[]
    eqPrices: IV1EquipmentPrice[]
    eqPriceSubTotal: number
    payOt: number
    payDiscount: number
    payFees: number
    payTotal: number
}

interface IV1EquipmentPictures {
    eqpicLink: string
    eqpicSort: number
}

interface IV1EquipmentPrice {
    eqpId: number
    eqpEqId: number
    eqpTypePerson: string
    eqpSubOption: string
    eqpChecked: string
    eqpIsChecked: boolean
    eqpName: string
    eqpDescription: string
    eqpQuantity: number
    eqpTotal: number
    eqpUnitPrice: number
    eqpUnitPer: string
    eqpCreatedAt: string
    eqpUpdatedAt: string
    eqsubPrice: IV1EquipmentSubPrice[]
}

interface IV1EquipmentSubPrice {
    eqsubpId: number
    eqsubpChecked: string
    eqsubpName: string
    eqsubpDescription: string
    eqsubpUnitPrice: number
    eqsubpUnitPer: string
    eqsubpQuantity: number
    eqsubpTotal: number
    eqsubpCreatedAt: string
    eqsubpUpdatedAt: string
}

interface IV1PostBookingPayments {
    bookId: number
    paySlipPicture: string
    payRemark: string
    payBillingAddress: string
    payDateTime: string
    payAmount: number
}
interface IV1QueyGetBookingMeRead {
    startTime?: string
    endTime?: string
    search?: string
    eqId?: number
    bookStatus: string
}

interface IV1PostBookingCreate {
    eqId: number
    eqPrices: IV1BookingEquipmentPrice[]
    eqRtimDays: string
    eqRtimTimes: number[]
    payRemark: string
    payBillingAddress: string
    payMethod: TPaymentMethod
}

interface IV1BookingEquipmentPrice {
    eqpscheId: number
    eqpscheIsChecked: boolean
    eqpQuantity: number
    eqsubPrice: IV1BookingEquipmentSubPrice[] | null
}

interface IV1BookingEquipmentSubPrice {
    eqsubpscheId: number
    eqsubpIsChecked: boolean
    eqsubpQuantity: number
}

type TPaymentMethod = '' | 'CASH__BANK_TRANSFER_QR_CODE' | 'DEBIT_DEPARTMENT'
