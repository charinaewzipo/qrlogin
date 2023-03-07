import uuidv4 from "@sentry/utils/uuidv4"

const fetchLogin = (requestData: ILogin): Promise<IResponse<{ accessToken: string, user: IUser }>> => {
    return new Promise((resolve, reject) => {
        const response: IResponse<{ accessToken: string, user: IUser }> = {
            code: 200000,
            message: `OK`,
            data: {
                accessToken: uuidv4(),
                user: {
                    name: requestData.email,
                    role: 'member'
                }
            }
        }
        resolve(response)
    })
}

export {
    fetchLogin
}