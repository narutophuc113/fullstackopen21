import React from 'react'
import { useState } from 'react'
import { login } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { Form, Input, Button } from 'antd'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async () => {
    console.log(username, password)

    dispatch(login({ username, password }))
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Form onFinish={handleLogin}>
        <Form.Item label={'Username'} rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input type="text" value={username} name={'Username'}
            onChange={({ target }) => setUsername(target.value)}/>
        </Form.Item>
        <Form.Item label={'Password'} rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input type="password" value={password} name={'Password'}
            onChange={({ target }) => setPassword(target.value)}/>
        </Form.Item>
        <Button htmlType={'submit'} type={'primary'}>login</Button>
      </Form>
    </div>
  )
}

export default LoginForm