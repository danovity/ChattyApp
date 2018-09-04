import React, { Component } from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

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
      currentUser: "Anonymous",
      messages: [
        {
          type: "incomingMessage",
          content:
            "I won't be impressed with technology until I can download food.",
          username: "Anonymous1"
        },
        {
          type: "incomingNotification",
          content: "Anonymous1 changed their name to nomnom"
        },
        {
          type: "incomingMessage",
          content:
            "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
          username: "Anonymous2"
        },
        {
          type: "incomingMessage",
          content: "...",
          username: "nomnom"
        },
        {
          type: "incomingMessage",
          content:
            "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
          username: "Anonymous2"
        },
        {
          type: "incomingMessage",
          content: "This isn't funny. You're not funny",
          username: "nomnom"
        },
        {
          type: "incomingNotification",
          content: "Anonymous2 changed their name to NotFunny"
        }
      ]
    };
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 19,
        username: "Michelle",
        content: "Hello there!",
        type: "incomingMessage"
      };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 3000);
  }

  _handleKeyPress = e => {
    if (e.key === "Enter") {
      console.log(e.target.value);
      let newMessage = {
        username: this.state.currentUser,
        content: e.target.value,
        type: "incomingMessage"
      };
      let messages = this.state.messages.concat(newMessage);

      this.setState({ messages });
      e.target.value = "";
    }
  };
  _setCurrentUser = e => {
    console.log(e.target.value);
    this.setState({ currentUser: e.target.value });
  };

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser}
          handleKeyPress={this._handleKeyPress}
          setCurrentUser={this._setCurrentUser}
        />
      </div>
    );
  }
}
export default App;
