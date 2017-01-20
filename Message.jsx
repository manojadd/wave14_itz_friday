import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions,CardTitle,CardHeader,CardMedia,CardText} from 'material-ui/Card';

const style = {
  height: 50,
  width: 700,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
  wordWrap: 'break-word',
  overflow: 'hidden',


}

const style1 = {
  height: 50,
  width: 700,
  margin: 10,
  marginLeft: 200,
  textAlign: 'center',
  display: 'inline-block',
};

class PaperExampleRounded extends React.Component{
render(){
return(
  <div>



      <Card>
      <CardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec  mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </CardText>

    </Card >

  </div>
);
}
}

export default PaperExampleRounded;
