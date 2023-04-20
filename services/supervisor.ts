const fetchGetSupervisor = (code: string): Promise<IResponse<ISupervisor>> => {
  console.log('fetch sup');
  let output = { 
    code: 500,
    message: 'OK',
    data: {
      code: '',
      name: '',
      email: '',
      pic: '',
    }
  }
  if (code === '123456') {
    output = {
      code: 200,
      message: 'OK',
      data: {
        code: '123456',
        name: 'test sensei1',
        email: '123@gmail.com',
        pic: 'https://via.placeholder.com/150',
      }
    }
  } else if (code === '111111') {
    output = {
      code: 200,
      message: 'OK',
      data: { 
        code: '111111',
        name: 'sensei test2',
        email: '111111@gmail.com',
        pic: 'https://via.placeholder.com/150',
      }
    }
  }
  return new Promise((resolve) =>
  
      setTimeout(
          () =>
          /* @ts-ignore */
              resolve(output),
          1000
      )
  )
}

export {
  fetchGetSupervisor
}