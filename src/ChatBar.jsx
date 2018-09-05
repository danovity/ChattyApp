import React, { Component } from "react";

export default class ChatBar extends Component {
  constructor(props) {
    super();
    this.state = {
      currentUser: { name: "Anonymous" }
    };
  }

  _setCurrentUser = e => {
    console.log(e.target.value);
    this.setState({ currentUser: { name: e.target.value } });
  };

  render() {
    const userName = this.props.currentUser ? this.props.currentUser : "";
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={userName}
          onChange={this._setCurrentUser}
          onKeyPress={this.props.handleKeyPress}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.props.handleKeyPress}
        />
      </footer>
    );
  }
}
