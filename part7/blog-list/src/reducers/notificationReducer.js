const timeout = 3000
let timeoutID

export const setNotification = ({ type, message }) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch(
      {
        type: 'SET_NOTIFICATION',
        data: {
          type, message
        }
      }
    )
    timeoutID = await setTimeout(() => {
      dispatch(
        {
          type: 'HIDE_NOTIFICATION'
        }
      )
    }, timeout)
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION': {
    return action.data
  }
  case 'HIDE_NOTIFICATION':
    return null
  default:
    return state
  }
}

export default notificationReducer