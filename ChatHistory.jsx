import React, { PropTypes } from 'react'
import Message from './Message.jsx';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';




const style = {
  height: 50,
  width: 700,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
  wordWrap: 'break-word'


}


  const style1 = {
    height: 50,
    width: 700,
    margin: 10,
    marginLeft: 200,
    textAlign: 'center',
    display: 'inline-block',
  };


class ChatHistory extends React.Component {
constructor(props){
  super(props);
  this.state={
    oldMessages: ["HI","tanay","manoj"]
  };
}

componentWillReceiveProps(nextProps){
  if(nextProps.inputMessage!=="")
  {const message1=this.state.oldMessages;
  message1.push(nextProps.inputMessage);
  this.setState({oldMessages:message1});
  console.log('this',this.state.oldMessages);}
}

  render () {
    var messageArray=this.state.oldMessages.map(function(item,i){
      return (  <Card key={i}>
        <CardText>
          {item}
        </CardText>

      </Card>
    );
  });
      return(
        <div>
            {messageArray}
        </div>
      );
    }
}

export default ChatHistory;
