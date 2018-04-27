// tslint:disable:typedef
// tslint:disable:no-empty
// tslint:disable:no-trailing-whitespace
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IChannelState } from "./reducer";
import { channelsActionCreators } from "./actions";
import TextInput from "../../components/TextBox/TextInput";
import uuidv4 = require("uuid/v4");
// import * as socketIOClient from "socket.io-client";

import { chatActionCreators } from "../ChatPage/actions";
import { IChatState } from "../ChatPage/reducer";

type ChannelsProps = IChannelState & {
  chat: IChatState;
  actions: typeof channelsActionCreators;
  chatAction: typeof chatActionCreators;
};

// socket EndPoint
// const endPoint = "http://localhost:8081";
// const socket = socketIOClient(endPoint);

class Channels extends React.Component<ChannelsProps, {}> {
  componentDidMount() {
    this.props.actions.channelRequestAllChannels();
  }
  componentDidUpdate() {
    this.props.socket.on("FetchLatestChannels", (listChannels) => {
      this.props.actions.channelReceivedFromSocketAllChannels(listChannels);
    });
  }
  public render() {
    return (
      <div className="left_menu">
        <div>
          <ul>{this.renderChannels()}</ul>
        </div>
        {this.addChannel()}
      </div>
    );
  }
  renderChannels(listChannels?) {
    if(listChannels===undefined) {
      listChannels = this.props.allChannels;
    } 
    const newList= listChannels.map((item, index) => (
        <li key={item.id} id="name" value={item.name.toString()} onClick={() => {
          this.props.actions.channelFieldChanged(
            "selectedChannelIndex",
            index
          );
          this.props.chatAction.chatRequestChatByChannelName(item.name);
        }}>
          <a href="#"> {item.name}</a>
        </li>
      ));
      return newList;
  }
  addChannel() {
    return (
      // <!--The Modal -- >
      <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog">
          {
            // <!-- Modal content-->
          }
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Channel</h4>
              <button
                id="btnclose"
                type="button"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <TextInput
                TextboxType="text"
                TextboxId="name"
                label="Channel Name"
                TextBoxClass="form-control"
                validationMessage="Channel name cannot be empty."
                Placeholder="Enter channel name"
                TextboxValue={this.props.name}
                ChangeInput={(fieldName: string, value: string) =>
                  this.props.actions.channelFieldChanged(fieldName, value)
                }
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                style={{cursor:this.props.name===""? "not-allowed":""}}
                onClick={() => {
                  if (this.props.name !== "") {
                    let channelObj = {
                      name: this.props.name,
                      id: uuidv4(),
                      private: false,
                      between: []
                    };
                    this.props.actions.channelAddChannel(channelObj);
                  }
                  this.props.actions.channelResetValues();
                  this.closeAddChannelModal();
                }}  
                disabled={this.props.name===""?true:false}
              >
                Save{" "}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Cancel{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  private closeAddChannelModal() {
    var btnclose = document.getElementById("btnclose");
    if (btnclose != null) {
      btnclose.click();
    }
  }
}

const mapStateToProps = state => {
  return {
    ...state.channels,
    chat: { ...state.chat }
  };
};

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators({ ...channelsActionCreators }, dispatch),
  chatAction: bindActionCreators({ ...chatActionCreators }, dispatch)
}))(Channels) as any;
