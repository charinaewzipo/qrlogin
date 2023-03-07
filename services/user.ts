const fetchGetUser = (): Promise<IResponse<IUser>> => {
    return Promise.resolve({
        code: 200,
        message: 'OK',
        data: { name: 'username', role: 'admin' }
    })
}

export {
    fetchGetUser
}