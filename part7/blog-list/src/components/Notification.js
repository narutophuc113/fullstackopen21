import React from 'react'
import { useSelector } from 'react-redux'
import { notification, Space } from 'antd'

const Notification = () => {
  const notificationState = useSelector(state => state.notification)
  console.log('NOTIFIFCATION', notificationState)

  const openNotification=() => {
    const args={
      message: notificationState.type ,
      description: notificationState.message
    }
    console.log(args)
    if (notificationState.type === 'success') {
      notification.success(args)
    } else {
      notification.error(args)
    }
  }

  if (notificationState === null) {
    notification.destroy()
    return null
  }

  return (
    <Space>
      {openNotification()}
      {/*<div className={notificationState.type}>*/}
      {/*  {notificationState.message}*/}
      {/*</div>*/}
    </Space>
  )
}


export default Notification