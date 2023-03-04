const fetchGetUser = () => {
    return Promise.resolve({ name: 'username', role: 'admin' })
}

export {
    fetchGetUser
}