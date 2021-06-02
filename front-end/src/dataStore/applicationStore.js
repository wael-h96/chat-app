import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension'
import chatReducer from './chat/chatReducer';
import onlineUsersReducer from './users/onlineUsersReducer'

const applicationStore = createStore(
    combineReducers(
        {
            chat: chatReducer,
            users: onlineUsersReducer,
        }
    ),
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default applicationStore;