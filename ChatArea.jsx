import React, { PropTypes } from 'react'
import ChatHistory from './ChatHistory.jsx';
import NewMessage from './NewMessage.jsx';
class ChatArea extends React.Component {
constructor(props){
  super(props);
  this.state={
    currentMessage:''
  };
}



getMessage(mess){
  this.setState({
    currentMessage:mess
  });
}



  render () {
    return(
    <div >
      <ChatHistory inputMessage={this.state.currentMessage}></ChatHistory>
    <NewMessage sendMessage={this.getMessage.bind(this)}></NewMessage>
    </div>
  );
  }
}

export default ChatArea;
