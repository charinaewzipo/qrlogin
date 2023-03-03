const fetchGetSupervisor = (code: string) => {
  // return Promise.resolve({ name: 'kornner', email: '123@gmail.com', code: '123456' }, 1000)
  console.log('fetch sup');
  let output = {}
  if (code === '123456') {
    output = {
      name: 'test sensei1',
      email: '123@gmail.com',
      code: '200',
      pic: 'https://via.placeholder.com/150',
    }
  } else if (code === '111111') {
    output = {
      name: 'sensei test2',
      email: '111111@gmail.com',
      code: '200',
      pic: 'https://via.placeholder.com/150',
    }
  } else {
    output = { code: '500' }
  }
  return new Promise((resolve) =>
      setTimeout(
          () =>
              resolve(output),
          1000
      )
  )
}

export {
  fetchGetSupervisor
}