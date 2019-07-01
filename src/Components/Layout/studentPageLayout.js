import React from 'react'
import Aux from '../HigherOrderComp/Auxilary'
import openSocket from 'socket.io-client';
import {Link}from 'react-router-dom'
import { Button, Comment, Form } from 'semantic-ui-react'

const StudentPageLayout = (props) =>  {
     
     
    return (
         <main>
          
          <ul>
          <li> <Link onClick = {props.StudentMarks} to = { props.location.pathname + '/StudentMarks'}>Marks</Link></li>
         <li> <Link onClick = {props.StudentAttendance} to = { props.location.pathname + '/StudentAttendance'}>Attendance</Link></li>
          </ul>

       <br/> <strong>CHAT BOX</strong>
        <Comment.Group>
            <Comment>
            <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
            <Comment.Content>
                <Comment.Author>Joe Henderson</Comment.Author>
                <Comment.Metadata>
                <div>1 day ago</div>
                </Comment.Metadata>
                <Comment.Text>
                <p>
                    The hours, minutes and seconds stand as visible reminders that your effort put them all
                    there.
                </p>
                </Comment.Text>
                {/* <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
                </Comment.Actions> */}
            </Comment.Content>
            </Comment>

            <Comment>
            <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
            <Comment.Content>
                <Comment.Author>Christian Rocha</Comment.Author>
                <Comment.Metadata>
                <div>2 days ago</div>
                </Comment.Metadata>
                <Comment.Text>I re-tweeted this.</Comment.Text>
                {/* <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
                </Comment.Actions> */}
            </Comment.Content>
            </Comment>

            <Form reply>
            <Form.TextArea />
            <Button content='Send Message' labelPosition='left' icon='edit' primary />
            </Form>
         </Comment.Group>
         </main>
    );
}

export default StudentPageLayout
