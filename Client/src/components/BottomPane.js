import React, { Component } from "react"
import { connect } from 'react-redux'
import { sendMessage } from '../dataStore/chat/chatActions';
import '../CSS/BottomPaneCSS.css'

class BottomPane extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentMessage: ""
        }
    }

    handleSendMessage() {
        this.props.sendMessage(this.state.currentMessage, this.props.user1, this.props.chatWith)
        this.setState({ currentMessage: "" })
    }

    render() {


        return (
            <div className="main-div">
                <input
                    className="input-style"
                    type="text"
                    placeholder="Enter text..."
                    value={this.state.currentMessage}
                    onChange={e => this.setState({ currentMessage: e.target.value })} />

                <button className="btn-style" onClick={() => this.handleSendMessage()}>Send</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendMessage: (message, user1, user2) => dispatch(sendMessage(message, user1, user2))
    }
}

const mapStateToProps = state => {
    return {
        chatWith: state.chat.activateChatWith,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomPane);
