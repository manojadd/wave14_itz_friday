import React from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import LayoutComponent from './LayoutComponent.jsx';

injectTapEventPlugin();
ReactDom.render(<LayoutComponent/>,document.getElementById("content"));
	
