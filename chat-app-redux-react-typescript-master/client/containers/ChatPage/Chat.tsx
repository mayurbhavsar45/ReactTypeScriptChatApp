// tslint:disable:no-empty
// tslint:disable:no-trailing-whitespace
// tslint:disable:typedef
// tslint:disable:max-line-length
// tslint:disable:no-debugger
// tslint:disable:comment-format
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IChatState } from "./reducer";
import { chatActionCreators } from "./actions";
import TextInput from "../../components/TextBox/TextInput";
import TextArea from "../../components/TextArea/TextAreaInput";
import Channels from "../ChannelsPage/Channels";
import { IChannelState } from "../ChannelsPage/reducer";
import { channelsActionCreators } from "../ChannelsPage/actions";
import uuidv4 = require("uuid/v4");

// import * as socketIOClient from "socket.io-client";
// socket EndPoint
// const endPoint = "http://localhost:8081";
// const socket = socketIOClient(endPoint);

type ChatProps = IChatState & {
  channels: IChannelState;
  channelAction: typeof channelsActionCreators;
  actions: typeof chatActionCreators;
};

class Chat extends React.Component<ChatProps, {}> {
  componentDidMount() {
    if (
      localStorage.length === 0 &&
      localStorage.getItem("username") === null
    ) {
      window.location.href = "/";
    }
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.props.socket.on("FetchLatestMessageList", listMessages => {
      this.props.actions.chatReceiveChatByChannelNameFromSocket(listMessages);
    });
    this.scrollToBottom();
  }
  
scrollToBottom() {
  var messageListDiv = document.getElementById("messageList_div");
  // messageListDiv.scrollTop = 99999999999;  //working
  messageListDiv.scrollTop = messageListDiv.scrollHeight;
}
  public render() {
    return (
      <div>
        <div id="navigation-bar">{this.getChatNavbar()}</div>
        {this.getChatLayout()}
      </div>
    );
  }
  getChatNavbar() {
    let username = localStorage.getItem("username");
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <span className="navbar-brand">Welcome to chat application <p className="login-user-name">Logged in as <code>{username}</code></p>  </span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto" />
          <form className="form-inline my-2 my-lg-0">
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="button"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              Signout
            </button>
          </form>
        </div>
      </nav>
    );
  }

  getChatLayout() {
    
    let isDisabledTextArea = false;
    let selectedChannelIndex = this.props.channels.selectedChannelIndex;
    let channelName =
      selectedChannelIndex !== null
        ? this.props.channels.allChannels[selectedChannelIndex].name
        : "No channel selected";
    let messageList = this.props.messagesByChannelNameList;
    let bindMessages;
    if (channelName !== "No channel selected") {
      if (messageList.length > 0) {
        if (messageList[0].channelID === channelName) {
          isDisabledTextArea = false;
          bindMessages = messageList.map((item, index) => (
            // className={item.user.username===localStorage.getItem("username")?"pull-right":""}
            <li  key={item.id} className={item.user.username===localStorage.getItem("username")?"txt_right":"txt_left"}>
              <div className="content_style">
                <div>
                  <span className="usr_name">{item.user.username}</span>
                </div>
                <div className="messasge_txt">{item.text}</div>
                <div className="time_txt">{item.time}</div>
              </div>
            </li>
          ));
        } else {
          bindMessages = (            
              <h4>No users connected in {channelName}</h4>            
          );
          isDisabledTextArea = false;
        }
      } else {
        bindMessages = (          
            <h4>No Messages in the {channelName}</h4>            
        );
        isDisabledTextArea = false;
      }
    } else {
      bindMessages = (        
            <h4>Select a channel to start chatting... </h4>          
      );
      isDisabledTextArea = true;
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2 left_panel">
            <div className="add_chanel">
              <p>Channels</p>
              <button
                type="button"
                className="btn pull-right"                
                data-toggle="modal"
                data-target="#myModal"
              >
                <span className="fa fa-plus" />
              </button>
            </div>
            {/* render channel component here */}
            <Channels />
          </div>
          <div className="col-sm-10 chat-container">
            <div className="border head_txt" >
              Currently selected channel:{" "}
              <span>
                  <b>{channelName}</b>
                </span>              
            </div>
            <div id="messageList_div" className="border msg_txt" >
              <ul>
                {bindMessages}
              </ul>
            </div>
            <TextArea
              TextboxId="text"
              TextBoxClass="form-control msg-container-control"
              validationMessage="Enter Message."
              Placeholder="Type message here...."
              TextboxValue={this.props.text}
              disabled={isDisabledTextArea}
              // AutoFocus={true}
              ChangeInput={(fieldName: string, value: string) =>
                this.props.actions.chatFieldChanged(fieldName, value)
              }
              required={true}
              KeyPress={() => {
                if(this.props.text!=="") {
                if (channelName !== "No channel selected") {
                  let obj = {
                    id: uuidv4(),
                    channelID: channelName, // this.props.channelID,
                    text: this.props.text,
                    user: {
                      socketID: uuidv4(),
                      username: localStorage.getItem("username")
                    },
                    time:
                      new Date().toLocaleDateString() +
                      " " +
                      new Date().toLocaleTimeString()
                  };
                  this.props.actions.chatSendMessage(obj);
                }
              }
              }}
            />
          </div>
        </div>        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.chat,
    channels: { ...state.channels }
  };
};

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators({ ...chatActionCreators }, dispatch),
  channelAction: bindActionCreators({ ...channelsActionCreators }, dispatch)
}))(Chat) as any;
