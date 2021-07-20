import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../reducers/userReducer'
import { Menu, Button, Space, Col, Row } from 'antd'

const Header = () => {
  const [currentMenu, setCurrentMenu] = useState('blogs')
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(clearUser())
  }

  const handleClickMenu = (event) => {
    console.log(event.key)
    setCurrentMenu(event.key)
  }

  return (
    <div>
      <Row>
        <Col span={18}>
          <Menu theme={'dark'} onClick={handleClickMenu} selectedKeys={currentMenu} mode={'horizontal'}>
            <Menu.Item key={'blogs'}>
              <Link to={'/blogs'}>blogs </Link>
            </Menu.Item>
            <Menu.Item key={'users'}>
              <Link to={'/users'}>users </Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={6}>
          <Space align={'center'} style={{ float: 'right', color:'white' }}>
            <strong>{user.username}</strong> logged in <Button type={'primary'} onClick={handleLogout}>logout</Button>
          </Space>
        </Col>
      </Row>
    </div>
  )
}
export default Header