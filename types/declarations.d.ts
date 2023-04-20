declare namespace NodeJS {
    interface ProcessEnv {
        NX_API_URL: string
        NX_ENCRYPTED_REMEMBER_KEY: string
        NX_PAYMENT_BILLER_ID: string
        NX_PAYMENT_REF_1: string
        NX_PAYMENT_REF_2: string
        NX_PAYMENT_COMP_CODE: string
    }
}
