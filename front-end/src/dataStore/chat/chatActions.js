import * as api from '../../utils'

export const sendMessage = (message, user1, user2) => async dispatch => {

    const date = new Date()
    const mins = date.getMinutes()
    const hours = date.getHours()
    const year = date.getFullYear()

    const newMessage = {
        message,
        from: user1,
        time: `${hours}:${mins}--${year}`,
    }

    try {
        const serverResponse = await api.post("/chat", { newMessage, user1, user2 })
        dispatch({ type: "send-message", message: newMessage })
    } catch (error) {
        console.log(error)
    }
}

export const getChat = async (user1, user2) => {

    try {
        
        const serverResponse = await api.get(`/chat/get-chat/${user1}/${user2}`)
        return serverResponse

    } catch (error) {
        console.log(error)
    }
}

