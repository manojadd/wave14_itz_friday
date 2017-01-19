import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ajax from 'superagent';
import Menu from './menus.jsx';
export default class Popup extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			status:false,
			filterstatus:false,
			filtertype:1,
			projectName:0,
			channelName:1,
			tagName:1,
			project:[]

		}
		this.handleOpen=this.handleOpen.bind(this);
		this.handleClose=this.handleClose.bind(this);
		this.handleSecondOpen=this.handleSecondOpen.bind(this);
		this.handleSecondClose=this.handleSecondClose.bind(this);
		this.handleChange=this.handleChange.bind(this);
		this.handleProjectChange=this.handleProjectChange.bind(this);
		this.handleChannelChange=this.handleChannelChange.bind(this);
		this.handleTagChange=this.handleTagChange.bind(this);
		this.getData=this.getData.bind(this);
		//this.getProjectName=this.getProjectName.bind(this);
	}
	handleOpen(){
		this.setState({status:true})
	}
	handleClose(){
		//console.log("handleClose");
		this.setState({status:false})
	}
	handleSecondOpen(){
		this.setState({filterstatus:true})
	}
	handleSecondClose(){
		//console.log("handleClose");
		this.setState({filterstatus:false})
	}
	handleChange(e,index,filtertype){
		
		this.setState({filtertype})
		console.log(this.state.filtertype);
	}
	handleProjectChange(e,index,projectName){
		console.log("clickkk");
		this.setState({projectName})
	}
	handleChannelChange(e,index,channelName){
		this.setState({channelName})
	}
	handleTagChange(e,index,tagName){
		this.setState({tagName})
	}
	componentDidMount() {
		this.getData();
	}

	getData(){
		let url="http://localhost:3002/Projects";
		ajax.get(url).end((error,result)=>{
			if(result){
				this.setState({project:result.body})
				console.log(result.body);
				//this.putData();
			}
			else{
				console.log(error);
			}
		})
	}

	render(){
		console.log("popup render");
		var type=null;
		const actions=[<FlatButton label="Cancel" onTouchTap={this.handleClose}/>,
					<FlatButton label="Submit" onTouchTap={this.handleSecondOpen}/>]
		const filterActions=[<FlatButton label="Cancel" onTouchTap={this.handleSecondClose}/>,
					<FlatButton label="Submit" />]
		if(this.state.filtertype==1)
		{
			type=<Dialog title="Filter By Project" actions={filterActions} modal={true} open={this.state.filterstatus} >
			<SelectField floatingLabelText="SelectProject" value={this.state.projectName} onChange={this.handleProjectChange}>
			{this.state.project.map(function(item,i){
				return(<MenuItem key={i} value={i} primaryText={item.id}/>)
			})}
			</SelectField><br/>
			<SelectField floatingLabelText="SelectChannel" value={this.state.channelName} onChange={this.handleChannelChange}>
			<MenuItem value={1} primaryText="Developers"/>
			<MenuItem value={2} primaryText="UX"/>
			</SelectField><br/>
			<SelectField floatingLabelText="SelectTag" value={this.state.tagName} onChange={this.handleTagChange}>
			<MenuItem value={1} primaryText="Important"/>
			<MenuItem value={2} primaryText="Starred"/>
			</SelectField></Dialog>
		}
		else
		{
			type=<Dialog title="Filter By Tags" actions={filterActions} modal={true} open={this.state.filterstatus}>
			<SelectField floatingLabelText="SelectTag" value={this.state.tagName} onChange={this.handleTagChange}>
			<MenuItem value={1} primaryText="Important"/>
			<MenuItem value={2} primaryText="Starred"/>
			</SelectField></Dialog>
		}
		return(
			<div>
			<FlatButton label="Add Tile" onTouchTap={this.handleOpen}/>
			<Dialog title="Filter By" actions={actions} modal={true} open={this.state.status}>
			<SelectField floatingLabelText="select" value={this.state.filtertype} onChange={this.handleChange} style={{width:"300px"}}>
			<MenuItem value={1} primaryText="Projects"/>
			<MenuItem value={2} primaryText="Tags"/>
			</SelectField></Dialog>
			{type}
			</div>
		);
	}
}		