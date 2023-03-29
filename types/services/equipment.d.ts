interface IV1PostEquipmentCreate {
    eqStatus: string
    eqCode: string
    eqName: string
    eqBrand: string
    eqModel: string
    eqDescription: string
    eqPicture: Array<IV1EquipmentPicture>
    eqAvascheDays: Array<string>
    eqAvascheTimes: Array<number>
    eqTypePerson: Array<IV1EquipmentTypePerson>
}

interface IV1RespPostEquipmentCreate {
    eqId: number
}

interface IV1PostEquipmentRead {
    eqId: string
    eqStatus: string
    eqCode: string
    eqName: string
    eqBrand: string
    eqModel: string
    eqDescription: string
    eqPicture: Array<IV1EquipmentPicture>
    eqCreatedAt: timestamp
    eqUpdatedAt: timestamp
    eqAvascheDays: Array<string>
    eqAvascheTimes: Array<number>
    eqTypePerson: Array<IV1EquipmentTypePerson>
}

interface IV1PostEquipmentDelete {
    eqId: number
}

interface IV1RespPostEquipmentDelete {
    eqId: number
}

interface IV1EquipmentPicture {
    eqpicLink: string
    eqpicSort: number
}
interface IV1EquipmentTypePerson {
    eqpscheTypePerson: string
    eqsches: Array<IV1EquipmentSchemaPrice>
}

interface IV1EquipmentSchemaPrice {
    eqpscheSubOption: string | null
    eqpscheChecked: string
    eqpscheName: string
    eqpscheDescription: string | null
    eqpscheUnitPrice: number
    eqpscheUnitPer: string | null
    eqsubsches: Array<IV1EquipmentSubSchemaPrice> | null
}

interface IV1EquipmentSubSchemaPrice {
    eqsubpscheChecked: string
    eqsubpscheName: string
    eqsubpscheDescription: string | null
    eqsubpscheUnitPrice: number
    eqsubpscheUnitPer: string
}

interface IV1QueryGetEquipmentRead {
    eqId: string
    eqStatus: string
    eqSearch: string
    eqSortName: boolean
    eqSortCode: boolean
}
