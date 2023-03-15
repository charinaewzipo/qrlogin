import uuidv4 from "@sentry/utils/uuidv4"
import { fetchGetUser } from "./user"

const fetchLogin = (requestData: ILogin): Promise<IResponse<{ accessToken: string, user: IUser }>> => {
    return fetchGetUser().then((userResponse) => {
        return {
            ...userResponse,
            data: {
                accessToken: uuidv4(),
                user: userResponse.data
            }
        }
    })
}

export {
    fetchLogin
}