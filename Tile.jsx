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
			this.createAutoplayMessages();
			//this.createCard();
		})
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
createAutoplayMessages(){
	if(this.props.tileid==="t1"){
		this.setState({div:<div><CardHeader title="TITLE ADD" subtitle="click the icon"/>
        <CardText>
        <center><FloatingActionButton onTouchTap={this.handleOpen}>
        <ContentAdd />
        </FloatingActionButton></center></CardText></div>
	})
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
		return(
	
				<Card style={{height: '100%',overflow:"hidden"}}>
					{this.state.div}
				</Card>
         
			);
	}
}