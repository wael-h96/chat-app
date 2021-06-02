import React, { Component } from 'react'
import { connect } from 'react-redux'
import BottomPane from './BottomPane'
import '../CSS/MainPaneCSS.css';
import { socket } from './CombinedComponent'
import { getChat } from '../dataStore/chat/chatActions'

class MainPane extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

        socket.on("message-sent", () => {

            getChat(this.props.currentUser.email, this.props.chatWith)
                .then(chat => chat.json())
                .then(chat => {
                    this.props.clearPrevChat()
                    this.props.updateChat(chat)
                })
        })
    }

    render() {
        return (
            <div className="chat">

                <div className="chat-header">
                    <h3>You are chatting with {this.props.chatWith}</h3>
                </div>

                <div className="chat-body">

                    {/* this one outputs the prev chat between the two users */}

                    {this.props.prevChat.map((message, index) =>

                        < div
                            className={message.from === this.props.currentUser.email ? "chat-div right" : "chat-div left"}
                            key={index} >
                            <h4>{message.message}</h4>
                            <p className="date">{message.time}</p>
                        </div>
                    )}

                    {/* this one adds the current sended message */}
                    {this.props.currentMessage.map((message, index) =>
                        <div
                            className={message.from === this.props.currentUser.email ? "chat-div right" : "chat-div left"}
                            key={index}>
                            <h4>{message.message}</h4>
                            <p className="date">{message.time}</p>
                        </div>
                    )}
                </div>

                {
                    this.props.blockedUsers.indexOf(this.props.chatWith) === -1 ?

                        this.props.chatWith.length > 0 &&
                        <div className="text-area">
                            <BottomPane user1={this.props.user1} />
                        </div>
                        :
                        <div><h3>This user is blocked so you cant chat with...</h3></div>

                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentMessage: state.chat.chatList,
        chatWith: state.chat.activateChatWith,
        prevChat: state.chat.prevChat,
        blockedUsers: state.users.currentUser.blockedUsers,
        currentUser: state.users.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateChat: (chat) => dispatch({ type: "get-chat", chat }),
        clearPrevChat: () => dispatch({ type: "clear-chatList" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPane);

