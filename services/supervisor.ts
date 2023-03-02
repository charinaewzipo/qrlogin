const fetchGetSupervisor = () => {
  // return Promise.resolve({ name: 'kornner', email: '123@gmail.com', code: '123456' }, 1000)
  return new Promise((resolve) =>
      setTimeout(
          () =>
              resolve({
                  name: 'kornner',
                  email: '123@gmail.com',
                  code: '123456',
                  pic: 'https://via.placeholder.com/150',
              }),
          1000
      )
  )
}

export {
  fetchGetSupervisor
}