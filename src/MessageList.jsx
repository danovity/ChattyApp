import React, { Component } from "react";
import Message from "./Message.jsx";
export default class MessageList extends Component {
  render() {
    const printMessages = this.props.messages.map((cur, i) => {
      return <Message key={i} message={cur} />;
    });
    return (
      <div>
        <div className="messages">{printMessages}</div>
      </div>
    );
  }
}
