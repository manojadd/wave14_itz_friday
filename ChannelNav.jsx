import React from 'react';
import MobileTearSheet from './MobileTearSheet.jsx';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

class ChannelNav extends React.Component{
render(){
return(
  <MobileTearSheet>
    <List>
      <Subheader>Recent chats</Subheader>
      <ListItem
        primaryText="Brendan Lim"
        //leftAvatar={<Avatar src="images/ok-128.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Eric Hoffman"
        //leftAvatar={<Avatar src="images/ok-128.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Grace Ng"
        //leftAvatar={<Avatar src="images/ok-128.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Kerem Suer"
        //leftAvatar={<Avatar src="images/ok-128.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Raquel Parrado"
        //leftAvatar={<Avatar src="images/ok-128.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
    </List>
    <Divider />
    <List>
      <Subheader>Previous chats</Subheader>
      <ListItem
        primaryText="Chelsea Otakan"
        //leftAvatar={<Avatar src="images/ok-128.jpg" />}
      />
      <ListItem
        primaryText="James Anderson"
        //leftAvatar={<Avatar src="images/ok-128.jpg" />}
      />
    </List>
 </MobileTearSheet>
);
}
}

export default ChannelNav;
