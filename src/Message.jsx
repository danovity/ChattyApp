import React, { Component } from "react";

export default class Message extends Component {
  render() {
    const message = this.props.message;
    if (message.type === "incomingNotification") {
      return <div className="message system">{message.content}</div>;
    } else {
      return (
        <div className="message">
          <span className="message-username">{message.username}</span>
          <span className="message-content">{message.content}</span>
        </div>
      );
    }
  }
}
