const fetchGetPrivacyPolicies = (): Promise<IResponse<IPrivacyPolicy>> => {
    /* @ts-ignore */
    return Promise.resolve({
        code: 200,
        message: 'OK',
        data: { privacyPolicies: '', createdAt: '', updatedAt: '' }
    })
}

export {
    fetchGetPrivacyPolicies
}