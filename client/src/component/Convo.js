import React from "react";
import { Badge, Icon, Layout, Spin, Typography } from "antd";
import { Client as ConversationsClient } from "@twilio/conversations";
import "./convo/Conversation.css";
import './convo/style.css'
import "./convo/ConversationSection.css";
// import { ReactComponent as Logo } from "./convo/twilio-mark-red.svg";

import Conversation from "./Conversation";
// import LoginPage from "./LoginPage";
import { ConversationsList } from "./ConversationsList";
import { HeaderItem } from "./HeaderItem";

const { Content, Sider, Header } = Layout;
const { Text } = Typography;

class ConversationsApp extends React.Component {
  constructor(props) {
    super(props);

    const name = localStorage.getItem("name") || "";
    const loggedIn = name !== "";

    this.state = {
      name,
      loggedIn,
      token: null,
      statusString: null,
      conversationsReady: false,
      conversations: [],
      selectedConversationSid: null,
      newMessage: ""
    };
  }

  componentDidMount = () => {
    // if (this.state.loggedIn) {
    //   this.getToken();
    this.initConversations();
    //   this.setState({ statusString: "Fetching credentials…" });
    // }
  };

//   logIn = (name) => {
//     if (name !== "") {
//       localStorage.setItem("name", name);
//       this.setState({ name, loggedIn: true }, this.getToken);
//     }
//   };

//   logOut = (event) => {
//     if (event) {
//       event.preventDefault();
//     }

//     this.setState({
//       name: "",
//       loggedIn: false,
//       token: "",
//       conversationsReady: false,
//       messages: [],
//       newMessage: "",
//       conversations: []
//     });

//     localStorage.removeItem("name");
//     this.conversationsClient.shutdown();
//   };

  getToken = async() => {
    // Paste your unique Chat token function
    // const data = await fetch('http://localhost:5000/getChatToken', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     identity: this.state.name,
    //     // roomName: roomName
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(res => res.json());
    // const myToken = data.token;
    // console.log(myToken,"myToken",data.token)
    // this.setState({ token: data.token }, this.initConversations);
    // setTimeout(()=>{this.setState({ token: data.token }, this.initConversations);},1000)
  };
 
  initConversations = async () => {
    window.conversationsClient = ConversationsClient;
    // console.log(this.props);
    this.conversationsClient = await ConversationsClient.create(this.props.token);
    this.setState({ statusString: "Connecting to Twilio…" });
    // console.log('thsi',this.conversationsClient);
    this.conversationsClient.on("connectionStateChanged", (state) => {
      console.log('state',state);

      if (state === "connecting")
        this.setState({
          statusString: "Connecting to Twilio…",
          status: "default"
        });
      if (state === "connected") {
        this.setState({
          statusString: "You are connected.",
          status: "success"
        });
      }
      if (state === "disconnecting")
        this.setState({
          statusString: "Disconnecting from Twilio…",
          conversationsReady: false,
          status: "default"
        });
      if (state === "disconnected")
        this.setState({
          statusString: "Disconnected.",
          conversationsReady: false,
          status: "warning"
        });
      if (state === "denied")
        this.setState({
          statusString: "Failed to connect.",
          conversationsReady: false,
          status: "error"
        });
    });
    this.conversationsClient.on("conversationJoined", (conversation) => {
      console.log('joined',conversation);

      this.setState({ conversations: [...this.state.conversations, conversation] });
    });
    this.conversationsClient.on("conversationLeft", (thisConversation) => {
      console.log('left',thisConversation);

      this.setState({
        conversations: [...this.state.conversations.filter((it) => it !== thisConversation)]
      });
    });
    // console.log('thsiss',this.conversationsClient);

  };

  render() {
    const { conversations, selectedConversationSid, status } = this.state;
    const selectedConversation = conversations.find(
      (it) => it.uniqueName === this.props.room
    );

    let conversationContent;
    if (selectedConversation) {
      conversationContent = (
        <Conversation
          conversationProxy={selectedConversation}
          myIdentity={this.props.name}
        />
      );
    } else if (status !== "success") {
      conversationContent = "Loading your conversation!";
    } else {
      conversationContent = "";
    }

      return (
     <>
     
     </>
      );
    

    // return <LoginPage onSubmit={this.logIn} />;
  }
}

export default ConversationsApp;
