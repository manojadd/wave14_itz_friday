import React from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import LayoutComponent from './LayoutComponent.jsx';
import Popup from './popup.jsx'

injectTapEventPlugin();
ReactDom.render(<MuiThemeProvider><LayoutComponent/></MuiThemeProvider>,document.getElementById("content"));
	
