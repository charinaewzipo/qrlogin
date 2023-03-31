interface IV1QueyGetBookingMeRead {
    startTime?: timestamp
    endTime?: timestamp
    search?: string
    eqId?: number
    bookStatus: string
}

interface IV1RespGetBookingMeRead {
    eqId: number
    eqCreateBy: number
    eqStatus: string
    eqCode: string
    eqName: string
    eqBrand: string
    eqModel: string
    eqDescription: string
    eqPictures: Array<IV1EquipmentPicture>
    eqCreatedAt: timestamp
    eqUpdatedAt: timestamp
    bookId: number
    bookOwner: number
    bookAdvisor: number
    bookStatus: string
    eqPrices: Array<IV1EquipmentPrice>
    eqpriceSubTotal: number
    payOt: number
    payDiscount: number
    payFees: number
    payTotal: number
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
    eqpCreatedAt: timestamp
    eqpUpdatedAt: timestamp
    eqSubPrice: Array<IV1EquipmentSubPrice>
}

interface IV1EquipmentSubPrice {
    eqSubpId: number
    eqSubpChecked: string
    eqSubpName: string
    eqSubpDescription: string
    eqSubpUnitPrice: number
    eqSubpUnitPer: string
    eqSubpQuantity: number
    eqSubpTotal: number
    eqSubpCreatedAt: timestamp
    eqSubpUpdatedAt: timestamp
}
interface IV1TablePayments {
    payId: number
    payBookId: number
    payQuotationPicture: string
    payInvoicePicture: string
    payReceiptPicture: string
    paySlipPicture: string
    payQrPicture: string
    payQrExpiry: timestamp
    payQrRef1: string
    payQrRef2: string
    payOt: number
    payDiscount: number
    payFees: number
    payRemark: string
    payBillingAddress: string
    payReceiptNumber: string
    payDateTime: timestamp
    payAmount: number
    payCreatedAt: timestamp
    payUpdatedAt: timestamp
}
