import React, { Component } from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";
const util = require("util");
const uuidv1 = require("uuid/v1");

function NavBar() {
  return (
    <div className="navbar">
      <a href="/" className="navbar-brand">
        Chatty
      </a>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      currentUser: { name: "Anonymous" },
      messages: []
    };
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onmessage = event => {
      console.log("incoming message");
      console.log(event);
      console.log(typeof event);

      let receivedData = JSON.parse(event.data);

      let newMessage = {
        username: receivedData.username,
        content: receivedData.content,
        type: receivedData.type,
        id: receivedData.id
      };

      let messages = this.state.messages.concat(newMessage);
      this.setState({ messages });
      // code to handle incoming message
    };
  }

  _handleKeyPress = e => {
    console.log(e.target.className);
    if (e.key === "Enter" && e.target.className === "chatbar-message") {
      // console.log(e.target.value);
      let newMessage = {
        username: this.state.currentUser.name,
        content: e.target.value,
        type: "incomingMessage"
      };
      let messages = this.state.messages.concat(newMessage);

      //Websocket message
      let message = {
        type: "incomingMessage",
        id: uuidv1(),
        username: this.state.currentUser.name,
        content: e.target.value
      };

      this.socket.send(JSON.stringify(message));

      this.setState({ messages });
      e.target.value = "";
    } else if (e.key === "Enter" && e.target.className === "chatbar-username") {
      let newMessage = {
        username: e.target.value,
        type: "incomingNotification",
        content: `${this.state.currentUser.name} changed their name to ${
          e.target.value
        }`
      };
      let messages = this.state.messages.concat(newMessage);
      //Websocket message
      let message = {
        id: uuidv1(),
        username: e.target.value,
        type: "incomingNotification",
        content: `${this.state.currentUser.name} changed their name to ${
          e.target.value
        }`
      };

      this.socket.send(JSON.stringify(message));

      this.setState({ currentUser: { name: e.target.value }, messages });
    }
  };

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser.name}
          handleKeyPress={this._handleKeyPress}
        />
      </div>
    );
  }
}
export default App;
