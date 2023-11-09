import React from 'react'

const LoginContext = React.createContext({
  userName: '',
  updateUser: () => {},
  passWord: '',
  updatePassword: () => {},
})

export default LoginContext
