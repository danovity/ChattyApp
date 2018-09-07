import React, { Component } from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";
const util = require("util");
const uuidv1 = require("uuid/v1");

function NavBar({ numberOfUsers }) {
  return (
    <div className="navbar">
      <a href="/" className="navbar-brand">
        Chatty
      </a>
      <div className="navbar-displayUsers">{numberOfUsers} users online</div>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      currentUser: { name: "Anonymous" },
      messages: [],
      numberOfUsers: 1
    };
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = event => {
      let updateUserCount = {
        type: "open",
        userCount: this.state.numberOfUsers
      };

      this.socket.send(JSON.stringify(updateUserCount));
    };

    this.socket.onmessage = event => {
      console.log("incoming message");
      console.log(event);
      console.log(typeof event);

      let receivedData = JSON.parse(event.data);
      if (receivedData.type === "open") {
        //Initial, userCount loaded
        let currentNumberOfUsers = this.state.numberOfUsers;
        let updatedNumberOfUsers =
          currentNumberOfUsers + receivedData.userCount;
        this.setState({ numberOfUsers: updatedNumberOfUsers });

        let finalUserCount = {
          finalUserCount: this.state.numberOfUsers
        };

        this.socket.send(JSON.stringify(finalUserCount));
      } else if (receivedData.finalUserCount) {
        //Final, userCount loaded
        let updatedNumberOfUsers = receivedData.finalUserCount;
        this.setState({ numberOfUsers: updatedNumberOfUsers });
      } else if (receivedData.type === "close") {
        let currentNumberOfUsers = this.state.numberOfUsers;
        this.setState({ numberOfUsers: currentNumberOfUsers - 1 });
      }
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
      if (e.target.value !== this.state.currentUser.name) {
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
    }
  };

  render() {
    return (
      <div>
        <NavBar numberOfUsers={this.state.numberOfUsers} />
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
