import React, { Component } from "react";
import  ReactTable from "react-table";
import "react-table/react-table.css";
import { Button, Comment, Form ,Grid,Image,Menu,Segment,Icon,Sidebar,List,Label,Input} from 'semantic-ui-react'
import {connect} from 'react-redux';
import classes from './MessageBox.css'
// Import Hamoni Syncimport Hamoni from "hamoni-sync";


class TeacherIndividualChatbox extends Component {
   
   
   async componentWillMount()
    {
        //this.props.componentWillMount();
        //console.log(this.props.match.params.Roll)

        setTimeout(() => {
            var doc = this.props.stateOfTeacher.MessagesDocs.find(Doc => Doc.studentRoll === this.props.match.params.Roll)
            console.log(this.props.stateOfTeacher.MessagesDocs);
            this.props.PrintMessages(doc)
        }, 1000);
        
        this.props.socket.on('message', data =>{
            this.props.PrintMessage(data);
        })
    
    }

    

    render(){
        return(
            
                 <Segment.Group>
             <Segment inverted color = 'black'>CHAT BOX</Segment> 
             <Segment.Group raised color = 'blue' >
                <Segment inverted tertiary color = 'blue' className ={classes.StudentMessageBox}>
                <Comment.Group>
                    {
                        this.props.stateOfTeacher.messages.map(msg => {
                            return msg;
                        })
                    }
                 </Comment.Group>
                 </Segment>
                 <Segment>
                      <Form reply>
                    <Form.TextArea type = "text" onChange = {this.props.OnChangeMessageHandler} name = 'msg' value = {this.props.stateOfTeacher.dataMessage.msg} />
                    <Button onClick = {() => this.props.SendMessage(this.props.match.params.Roll)} content='Send Message' labelPosition='left' icon='edit' primary />
                    </Form>
                 </Segment>
                     
                   
              </Segment.Group>
            </Segment.Group> 
            
        )
    }

   
}

const mapStateToProps = state => {
  return {
    marksList: state.studentMarks,
    classroom: state.classroom
  }
}
const mapDispatchToProps = dispatch => {
         return{
                 SetClassroomMarksTable : (ClassroomMarksTableFromDataBase) => dispatch({type:'SetClassroomMarksTable',ClassroomMarksTableInfo :ClassroomMarksTableFromDataBase})
         };
};

export default connect(mapStateToProps,mapDispatchToProps)(TeacherIndividualChatbox);