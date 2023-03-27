type TBookStatus =
    | 'PENDING'
    | 'CONFIRM'
    | 'WATTING_FOR_PAYMENT'
    | 'WATTING_FOR_PAYMENT_CONFIRM'
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
    eqStatus: STATUS_Equipment
    eqCode: string
    eqName: string
    eqBrand: string
    eqModel: string
    eqDescription: string
    eqPictures: IV1EquipmentPictures[]
    eqCreatedAt: string
    eqUpdatedAt: string
    eqPrices: IV1EquipmentPrice[]
    eqPriceSubTotal: number
    bookId: number
    bookOwner: number
    bookAdvisor: number
    bookStatus: TBookStatus
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
    eqSubPrice: IV1EquipmentSubPrice[]
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