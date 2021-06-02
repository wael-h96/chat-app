const initialState = {
    chatList: [],
    activateChatWith: "",
    prevChat: []

}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case "send-message":
            return { ...state, chatList: [...state.chatList, action.message] }
        case "activate-chat":
            return { ...state, activateChatWith: action.userToChat }
        case "get-chat":
            return { ...state, prevChat: action.chat }
        case "clear-prev-state":
            return { chatList: [], activateChatWith: "", prevChat: [] }
        case "clear-chatList":
            return { ...state, chatList: [] }
        default:
            return state;
    }
}

export default chatReducer;