import React from 'react';
import ReactDOM from 'react-dom';
//import View from 'react-flexbox';
//import {Grid,Col,Row} from 'react-flexbox-grid';
//import box from './style';
import ChannelNav from './ChannelNav.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChatArea from './ChatArea.jsx';
import ChatHistory from './ChatHistory.jsx';

injectTapEventPlugin();
ReactDOM.render(<MuiThemeProvider>
  <div>


  <ChannelNav/>
  <ChatArea />
   </div>

   </MuiThemeProvider>, document.getElementById('content'));
