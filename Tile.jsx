import React from 'react';
import {Card,CardHeader,CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import ajax from 'superagent';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
export default class Tile extends React.Component{
	
	constructor(props){
		super(props);
		this.state={
			msgList:[],
			div:null,
			title:"",
			subtitle:""
		}
		
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
			//this.createAutoplayMessages();
			//this.createCard();
		})
	}

	componentWillMount() {
		this.ajaxCall();
	}
	
	// retreiveObjects(){
	// 	// this.setState({
	// 	// 	title:this.state.msgList.
	// 	// })
	// }

	// createAutoplayMessages(){
	// 		this.setState({div:<AutoPlaySwipeableViews>
	// 		                  {this.state.msgList.map((details, i) => (
	// 		                  	<div key={i}>
	// 			              <CardHeader title={details.To} subtitle={details.Tag} />
	// 			              <CardText>
	// 			            	{details.Body}
	// 			              </CardText>
	// 			              </div>
	// 		                   ))}
	// 		                  </AutoPlaySwipeableViews>});
	// }
	render(){
		//console.log(this.state.msgList+"aaaa");
		// this.state.msgList.map(function(i){
		// 	console.log("aaa"+i);
		// })
		return(
	
				<Card style={{height: '100%',overflow:"hidden"}}>
					<AutoPlaySwipeableViews>
			                  {this.state.msgList.map((details, i) => (
			                  	<div key={i+"msg"}>
				              <CardHeader title={details.To} subtitle={details.Tag} />
				              <CardText>
				            	{details.Body}
				              </CardText>
				              </div>
			                   ))}
			                </AutoPlaySwipeableViews>
				</Card>
         
			);
	}
}