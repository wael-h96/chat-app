import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector, useDispatch } from 'react-redux';
import { getChat } from '../dataStore/chat/chatActions'
import { blockUser } from '../dataStore/users/userActions'
import { socket } from './CombinedComponent'
import { fetchAllUsers } from '../dataStore/users/userActions'
import '../CSS/leftPaneCSS.css';


const LeftPane = () => {


    const { user, isAuthenticated } = useAuth0()
    const allUsers = useSelector(state => state.users.allUsers)
    const blockedUsers = useSelector(state => state.users.currentUser.blockedUsers)
    const dispatch = useDispatch()

    useEffect(() => {
        socket.on("users-list-update", () => {
            fetchAllUsers()
                .then(users => users.json())
                .then(users => dispatch({ type: "fetch-users", users }))
        })
    }, [])

    const activateChat = (e) => {
        const id = e.target.parentNode.id
        dispatch({ type: "clear-prev-state" })
        dispatch({ type: "activate-chat", userToChat: allUsers[id].email })
        getChat(user.email, allUsers[id].email)
            .then(res => res.json())
            .then(res => { dispatch({ type: "get-chat", chat: res }) })
    }

    const handleUserBlocking = (e) => {
        const id = e.target.parentNode.parentNode.id
        const whatToDo = e.target.innerHTML
        blockUser(user.email, allUsers[id].email, whatToDo)
            .then(res => res.json())
            .then(res => dispatch({ type: "user-loggedin", user: res }))
    }

    return (
        <div>
            {isAuthenticated &&
                <div className="leftPane">
                    <div className="leftPane-header">
                        <h2>{user.email}</h2>
                    </div>
                    <br />
                    <hr />
                    <div className="leftPane-chats" >
                        {allUsers.length === 0 &&
                            <h2>There are no users yet!</h2>
                        }
                        {allUsers.map((theUser, index) =>
                        (
                            theUser.email !== user.email &&
                            theUser.blockedUsers.indexOf(user.email) === -1 &&
                            <div className="sidebar-users"
                                key={index}
                                id={index}>

                                <div style={blockedUsers.indexOf(theUser.email) === -1 ?
                                    { cursor: "pointer" } :
                                    { pointerEvents: "none", backgroundColor: "grey" }}
                                    onClick={activateChat}>
                                    {/* This button for starting a chat */}
                                    <button style={{ pointerEvents: "none" }}>
                                        <h3>{theUser.email}</h3>
                                        {
                                            blockedUsers.indexOf(theUser.email) === -1 ?
                                                <h6>{theUser.online ? "Online" : "Offline"}</h6> :
                                                <h6>Blocked</h6>
                                        }
                                    </button>
                                </div>
                                <div>
                                    {/* This button is for block/unblock a user */}
                                    <button
                                        className="btn btn-danger"
                                        onClick={handleUserBlocking}>
                                        {
                                            blockedUsers.indexOf(theUser.email) !== -1 ?
                                                "Unblock" : "Block"
                                        }
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}
export default LeftPane;
