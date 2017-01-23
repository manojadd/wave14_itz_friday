import React, { Component } from 'react';
import ReactGridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {CardHeader,CardTitle,Card,CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ajax from 'superagent';
import Tile from './Tile.jsx';
import CircularProgress from 'material-ui/CircularProgress';


export default class LayoutComponent extends Component {
    constructor(props){
        super(props);
        ajax.get('http://localhost:3001/Layout')
            .end(function(err,response){
                if(err)
                    console.log("Get error ",err);
                else
                    {
                     console.log("setting the layout")
                     this.setState({layout:response.body.Tile});
                     console.log("got this layout:", response.body.Tile);
                    }
               }.bind(this));
        this.state={    
            layout:[]
           
        };
        
        }
    saveLayout(Layout){
        
        
        console.log("Layout",Layout);
        ajax.post('http://localhost:3001/Layout')
            .send({"id": "cl","Tile": Layout})
            .end(function(err,response){
                if(err)
                    console.log("Post error ",err);
                else
                    console.log("post was complete.");
               });

        
        // this.setState({
        //         layout:Layout
        //     });
           
        
    }
    componentWillMount(){
        console.log("inside Component will mount");
        
    }

addTile(){
    console.log("clicked");

                         
                     ajax.get('http://localhost:3001/Layout')
            .end(function(err,response){
                if(err)
                    console.log("Get error ",err);
                else
                    {
                     console.log("setting the layout")
                     
                     console.log("got this layout:", response.body.Tile);
                       let nx,ny,nw,nh,ni;
                       let data = response.body.Tile;
                     nx = data[0].x;
                     ny = data[0].y;
                     nw = 2;
                     nh = 2;
                     ni = "t"+(data.length+1);
                     data.push(
                                {
                                "w": nw,
                                "h": nh,
                                "x": nx,
                                "y": ny,
                                "i": ni,
                                "moved": false,
                                "static": false
                                }
                              );
                    this.setState({layout: data});

                    }

               }.bind(this));            
                    
                     // let addindex = data.findIndex(function(item){
                     //    return (item.i==="t1");
                     // });
                     //data[addindex].x++;
                     //data[addindex].y++;

                     
}
    

    render() {
        console.log("Render called");

if(this.state.layout.length>0)
{

        let list = this.state.layout.map(function(item,i){
             return ( <div key={item.i}>
                        <Tile tileid={item.i} style={{height: '100%'}} />
                        </div>);
        });
        list.shift();
     
  
        return (
            <MuiThemeProvider>
            <ReactGridLayout layout={this.state.layout} onLayoutChange={this.saveLayout.bind(this)} cols={10} width={1200} rowHeight={60}>
                        


                        <div key="t1" >
                        <Tile tileid="t1"  style={{height: '100%'}} passfunc={this.addTile.bind(this)}/>
                        </div>
                        {list}


                
            </ReactGridLayout>
            </MuiThemeProvider>
        );
    }
    else{
       
         return (
            <MuiThemeProvider>
               <div>
               <center>
                
                 <CircularProgress size={120} thickness={5} /></center>      
                </div>
            </MuiThemeProvider>
        );
    }
 }
}

