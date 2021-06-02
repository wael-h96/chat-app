const initialState = {
    allUsers: [],
    currentUser: {},
}

const onlineUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'user-loggedin':
            return { ...state, currentUser: action.user }
        case 'fetch-users':
            return { ...state, allUsers: action.users }
        default:
            return state;
    }
}

export default onlineUsersReducer