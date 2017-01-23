import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ajax from 'superagent';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
let channelMenu=null;

export default class Popup extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			status:false,
			filterstatus:false,
			filtertype:1,
			projectValue:0,
			channelValue:0,
			tagValue:1,
			project:[],
			channel:[],
			projectName:""

		}
		//this.handleOpen=this.handleOpen.bind(this);
		this.handleClose=this.handleClose.bind(this);
		//this.handleSecondOpen=this.handleSecondOpen.bind(this);
		this.handleSecondClose=this.handleSecondClose.bind(this);
		this.handleChange=this.handleChange.bind(this);
		this.handleProjectChange=this.handleProjectChange.bind(this);
		this.handleChannelChange=this.handleChannelChange.bind(this);
		this.handleTagChange=this.handleTagChange.bind(this);
		this.getProjectData=this.getProjectData.bind(this);
		this.getChannelData=this.getChannelData.bind(this);
		this.printChannelNames=this.printChannelNames.bind(this);
		this.putFilterData=this.putFilterData.bind(this);
	}

	// componentWillMount() {
	
	// 	this.setState({status:true})
		
	// }

	componentWillReceiveProps(nextProps) {
			console.log("inside popup");
		this.setState({status:true})
	}

	handleClose(){
		//console.log("handleClose");
		this.setState({status:false})
		
	}
	// handleSecondOpen(){
	// 	this.setState({filterstatus:true})
	// }

	handleSecondClose(){
		//console.log("handleClose");
		this.setState({filterstatus:false})
		this.setState({status:false})
	}

	handleChange(e,index,filtertype){
		
		this.setState({filtertype})
		this.setState({filterstatus:true})
		console.log(this.state.filtertype);
	}
	handleProjectChange(e,index,projectValue){
		console.log("clickkk");
		this.setState({projectValue})
		let that=this;
		this.state.project.map(function(item,i){
			if(i==that.state.projectValue){
				// console.log("inside if");
				// that.setState({projectName:item.id})
				that.getChannelData(item.id);
				
			console.log("channelMenu",channelMenu);
				
			}
		})
		//console.log(that.state.projectName+"aaaa");
		//console.log(that.state.projectName);

	}
	handleChannelChange(e,index,channelValue){
		this.setState({channelValue})
	}
	handleTagChange(e,index,tagValue){
		this.setState({tagValue})
	}
	componentDidMount() {
		this.getProjectData();
	}

	getProjectData(){
		let url="http://localhost:3003/Projects";
		ajax.get(url).end((error,result)=>{
			if(result){
				this.setState({project:result.body})
				console.log(result.body);
	}
})
	}
	getChannelData(name){
		console.log(name);
		let url="http://localhost:3003/Projects/"+name;
		ajax.get(url).end((error,result)=>{
			if(result){
				this.setState({channel:result.body.channels})
				// console.log(result.body.channels);
				// console.log("gettt",this.state.channel);
				channelMenu=<SelectField floatingLabelText="SelectChannel" value={this.state.channelValue} onChange={this.handleChannelChange}>
		    	{
				this.state.channel.map(function(item,i){
					return(<MenuItem key={i} value={i} primaryText={item.Name}/>)
				})
		    	}</SelectField>
				this.printChannelNames();
			}
			else
			{
				console.log(error);
			}
		})
	}

	putFilterData(){
		console.log(this.state.projectValue);
		console.log(this.state.channelValue);
		console.log(this.state.tagValue);
	}
	printChannelNames(){
		console.log(this.state.channel);
	}
	render(){
		console.log("popup render");
		var type=null;
		console.log("inside redner",this.state);
		const filterActions=[<RaisedButton label="Cancel" onTouchTap={this.handleSecondClose} secondary={true}/>,
					<RaisedButton label="Submit" primary={true} onTouchTap={this.putFilterData} style={{marginLeft:"50px"}}/>]
		if(this.state.filtertype==1)
		{
			type=<Dialog title="Filter By Project" actions={filterActions} modal={true} open={this.state.filterstatus} >
			<SelectField floatingLabelText="SelectProject" value={this.state.projectValue} onChange={this.handleProjectChange}>
			{this.state.project.map(function(item,i){
				return(<MenuItem key={i} value={i} primaryText={item.id}/>)
			})}
			</SelectField><br/>
			{channelMenu}<br/>
			<SelectField floatingLabelText="SelectTag" value={this.state.tagValue} onChange={this.handleTagChange}>
			<MenuItem value={1} primaryText="Important"/>
			<MenuItem value={2} primaryText="Starred"/>
			</SelectField></Dialog>
		}
		else
		{
			type=<Dialog title="Filter By Tags" actions={filterActions} modal={true} open={this.state.filterstatus}>
			<SelectField floatingLabelText="SelectTag" value={this.state.tagValue} onChange={this.handleTagChange}>
			<MenuItem value={1} primaryText="Important"/>
			<MenuItem value={2} primaryText="Starred"/>
			</SelectField></Dialog>
		}
		return(
			<div>
			<Dialog title="Filter By" modal={false} open={this.state.status} onRequestClose={this.handleClose}>
			<SelectField floatingLabelText="select" value={this.state.filtertype} onChange={this.handleChange} style={{width:"300px"}}>
			<MenuItem value={1} primaryText="Projects"/>
			<MenuItem value={2} primaryText="Tags"/>
			</SelectField></Dialog>
			{type}
			</div>
		);
	}
}		