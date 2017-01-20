import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  width: 750,
};

const style1 = {

  paddingTop: "25px",
  paddingLeft:"15px"

};

class NewMessage extends React.Component {

  constructor(props){
  		super(props);

  	}
  saveMessage() {
   console.log('hello');
    this.props.sendMessage(this.refs.messageField.getValue());

    }


  render () {
    return(
      <table><thead></thead><tbody><tr>
        <td>

          <TextField style={style} hintText="What's on your mind?"
        floatingLabelText="Type your Message" multiLine={true} rows={1} ref="messageField" />
      </td>
      <td style={style1}>
      <RaisedButton label="SEND" primary={true} style={{margin:'20px'}}
                onClick={this.saveMessage.bind(this)}
                />
            </td></tr></tbody>
  </table>
);
}
}

export default NewMessage;
