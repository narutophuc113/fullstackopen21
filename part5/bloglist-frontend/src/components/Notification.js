import React,{ useImperativeHandle ,useState } from 'react'

const Notification=React.forwardRef((props, ref) => {
  const [notification, setNotification] = useState(null)
  const [type, setType] = useState('')

  const showNotification=(type, message) => {
    setType(type)
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useImperativeHandle(ref,() => {
    return{
      showNotification
    }
  })

  if(notification===null){
    return null
  }

  return(
    <div className={type}>
      {notification}
    </div>
  )
})

Notification.displayName='Notification'

export default Notification