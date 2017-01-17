
import React, { Component } from 'react';
import ReactGridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {CardHeader,CardTitle,Card,CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ajax from 'superagent';
import Tile from './Tile.jsx';
export default class LayoutComponent extends Component {
    constructor(props){
        super(props);
        this.state={
        	layout:[]
        };
        }
    saveLayout(Layout){
    	
    	

    	ajax.post('http://localhost:3001/Layout')
    		.send({"id": "cl","Tile": Layout})
    	    .end(function(err,response){
    		   	if(err)
    		   		console.log("Post error ",err);
    		   	else
    		   		console.log("post was complete.");
    		   });
    
    }
    componentWillMount(){
        console.log("mounted");
    	ajax.get('http://localhost:3001/Layout')
    	    .end(function(err,response){
    		   	if(err)
    		   		console.log("Get error ",err);
    		   	else
    		   		{
       		   		 this.setState({layout:response.body.Tile});
    		   		}
    		   }.bind(this));
    }
    render() {
        console.log("called");
        return (
            <MuiThemeProvider>
            <ReactGridLayout layout={this.state.layout} onLayoutChange={this.saveLayout.bind(this)} cols={10} width={1200} rowHeight={60}>

                        <div key="t1">
                        <Tile tileid="t1" style={{height: '100%'}} />
                        </div>
                        <div key="t2">
                        <Tile tileid="t2" style={{height: '100%'}} />
                        </div>
                        <div key="t3">
                        <Tile tileid="t3" style={{height: '100%'}} />
                        </div>
                         {/*<Card key="t2" style={{overflow:'hidden'}}>
                                                 <CardHeader title="sdfsdf" />
                                                 <CardText>
                                                 Tile 2</CardText>
                                                 </Card>
                                                  <Card key="t3" style={{overflow:'hidden'}}>
                                                 <CardHeader title="sdfsdf"   />
                                                 <CardText>
                                                 Tile 3</CardText>
                                                 </Card>*/}
                    

                
            </ReactGridLayout>
            </MuiThemeProvider>
        );
    }
}