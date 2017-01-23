import React from 'react';
import {Card,CardHeader,CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import ajax from 'superagent';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ConfigureTile from './ConfigureTile.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import Popup from './popup.jsx';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
export default class Tile extends React.Component{
	
	constructor(props){
		super(props);
		ajax.get('http://localhost:3002/Configured/'+this.props.tileid)
            .end(function(err,response){
                if(err)
                    console.log("Get error ",err);
                else
                    {
                     console.log("setting the layout")
                     this.setState({configured:response.body.value});
                     console.log("got this layout:", response.body.Tile);
                    }
               }.bind(this));
		this.state={
			msgList:[],
			div:null,
			title:"",
			subtitle:"",
			configured:null,
			dialog:null
			
		}
		this.handleDialog=this.handleDialog.bind(this);
	}

	ajaxCall(){
		let url="http://localhost:3000/TileMsg/"+this.props.tileid;
		ajax.get(url).end((error,result)=>{
			if(result){
				this.setState({msgList:result.body.Msg});
				console.log(this.state.msgList);
		// 		this.state.msgList.map(function(i){
		// 	    console.log(i.From+i.To+i.Body+i.Tag);
		// })
			}
			else
			{
				console.log("Error fetching from API");
			}
			//this.retreiveObjects();
			this.createAutoplayMessages();
			//this.createCard();
		})
	}

	handleDialog(){
		console.log("inside handle dialog");
		this.setState({dialog:<Popup status={true} />})
	}

	componentDidMount() {
		this.ajaxCall();
	    
	}
	componentWillReceiveProps(nextProps) {
		this.ajaxCall();
	}
	// retreiveObjects(){
	// 	// this.setState({
	// 	// 	title:this.state.msgList.
	// 	// })
	// }
	calll(){
		console.log("in calll");
		this.props.passfunc();
	}
createAutoplayMessages(){

	if(this.props.tileid==="t1"){
		

		this.setState({div:<div><CardHeader title="TITLE ADD" subtitle="click the icon"/>
        <CardText>
        <center><FloatingActionButton onClick={this.calll.bind(this)}>
        <ContentAdd  />
        </FloatingActionButton></center></CardText></div>
	});
	}
	else{
            this.setState({div:<AutoPlaySwipeableViews>
                              {this.state.msgList.map((details, i) => (
                                  <div key={i}>
                              <CardHeader title={details.To} subtitle={details.Tag} >     <IconButton  ><SettingsIcon  /></IconButton>   </CardHeader>
                              <CardText >
                                {details.Body}
                              </CardText>
                              </div>
                               ))}
                              </AutoPlaySwipeableViews>});
        }
    }

	render(){
		//console.log(this.state.msgList+"aaaa");
		// this.state.msgList.map(function(i){
		// 	console.log("aaa"+i);
		// })
		if(this.state.configured===null)
		{
				return (<center><CircularProgress size={10} thickness={3} /></center>);
		}
		else{
			if(this.state.configured)
				{
					return(
				<Card style={{height: '100%',overflow:"hidden"}}>
					{this.state.div}
				</Card>	);
				}	
			else{
				return(
					<Card style={{height: '100%',overflow:"hidden"}}>
					<CardHeader title="Configure" subtitle="click the icon"/>
        <CardText>
        <center><FloatingActionButton onClick={this.handleDialog}>
          <SettingsIcon  />
          {this.state.dialog}
        </FloatingActionButton></center></CardText>
				</Card>);
				}
			}
				
			
		}
}