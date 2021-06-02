import * as api from '../../utils'

export const userLoggedIn = async (user) => {
    try {

        const serverResponse = await api.post('/users/login', user)
        return serverResponse

    } catch (error) {
        console.log(error)
    }
}

export const userLoggedOut = async (user) => {
    try {
        const serverResponse = await api.post('/users/logout', user)
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllUsers = async () => {

    try {

        const serverResponse = await api.get('/users')
        return serverResponse

    } catch (error) {
        console.log(error)
    }
}

export const blockUser = async (userWantsToBlock, userToBeBlocked, whatToDo) => {
    try {
        const serverResponse = await api.post("/users/block", { userWantsToBlock, userToBeBlocked, whatToDo })
        return serverResponse
    } catch (error) {
        console.log(error)
    }
}