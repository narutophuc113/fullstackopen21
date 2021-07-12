let timeoutID

export const setNotification = (message, timeout = 5) => {
    return async dispatch => {
        clearTimeout(timeoutID)
        dispatch({
            type: 'SET_NOTIFICATION',
            data: message
        })
        timeoutID = await setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION'
            })
        }, timeout * 1000)

    }
}

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION': {
            return action.data
        }
        case 'HIDE_NOTIFICATION': {
            return null
        }
        default:
            return state
    }
}

export default notificationReducer