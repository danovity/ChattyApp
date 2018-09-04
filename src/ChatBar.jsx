import React, { Component } from "react";

export default class ChatBar extends Component {
  render() {
    const userName = this.props.currentUser ? this.props.currentUser : "";
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={userName}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}
