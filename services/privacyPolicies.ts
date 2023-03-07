const fetchGetPrivacyPolicies = (): Promise<IResponse<IPrivacyPolicy>> => {
    return Promise.resolve({
        code: 200,
        message: 'OK',
        data: { privacyPolicies: '', createdAt: '', updatedAt: '' }
    })
}

export {
    fetchGetPrivacyPolicies
}