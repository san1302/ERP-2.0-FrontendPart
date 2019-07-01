import React, { Component } from "react";
import  ReactTable from "react-table";
import "react-table/react-table.css";
import { Button, Comment, Form ,Grid,Image,Menu,Segment,Icon,Sidebar,List,Label,Input} from 'semantic-ui-react'
import {connect} from 'react-redux';
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
            <div>
                 
                   <main>
                 <br/> <strong>CHAT BOX</strong> 
                <Comment.Group>
                    {
                        this.props.stateOfTeacher.messages.map(msg => {
                            return msg;
                        })
                    }

                     <Form reply>
                    <Form.TextArea type = "text" onChange = {this.props.OnChangeMessageHandler} name = 'msg' value = {this.props.stateOfTeacher.dataMessage.msg} />
                    <Button onClick = {() => this.props.SendMessage(this.props.match.params.Roll)} content='Send Message' labelPosition='left' icon='edit' primary />
                    </Form>
                </Comment.Group>
            </main>

            </div>
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