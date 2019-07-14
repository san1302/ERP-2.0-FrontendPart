import React,{Component} from 'react'
import Aux from '../HigherOrderComp/Auxilary'
import {connect} from 'react-redux';
//import StudentLayoutPage from '../Layout/studentPageLayout';
//import {Route,Switch}from 'react-router-dom';
import openSocket from 'socket.io-client';
import {Link}from 'react-router-dom';
import Axios from 'axios';
import TeacherIndividualChatbox from './TeacherIndividualBox'
import { Button, Comment, Form ,Grid,Image,Menu,Segment,Icon,Sidebar,List,Label,Input} from 'semantic-ui-react'
import {Route,Switch}from 'react-router-dom'
import { async } from 'q';

 const images = [
     'https://react.semantic-ui.com/images/avatar/small/helen.jpg',
     'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
     'https://react.semantic-ui.com/images/avatar/small/lindsay.png',
     'https://react.semantic-ui.com/images/avatar/small/matthew.png',
     'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
     'https://react.semantic-ui.com/images/avatar/small/christian.jpg',
     'https://react.semantic-ui.com/images/avatar/small/rachel.png',
     'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
     'https://react.semantic-ui.com/images/avatar/small/veronica.jpg',
     'https://react.semantic-ui.com/images/avatar/small/tom.jpg',
     'https://react.semantic-ui.com/images/avatar/small/matt.jpg',
     'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
     'https://react.semantic-ui.com/images/avatar/small/stevie.jpg',
     'https://react.semantic-ui.com/images/avatar/small/lena.jpg',
     'https://react.semantic-ui.com/images/avatar/small/mark.jpg',
     'https://react.semantic-ui.com/images/avatar/small/molly.jpg'

 ]
 const socket = openSocket('http://localhost:8080');
class  TeacherMessageBox extends Component {
      
       state = {
             dataMessage : {
                // to : '',
                 msg : '',
                 from : '',
                 to : '',
                 name : ''
                // from : ''
             },

             messages:[],

             studentList : [],
             MessagesDocs : []
       }

      async componentWillMount()
       {
           
        // console.log(localStorage.getItem('token'))
         await Axios.post('http://localhost:8080/feed/TeacherInfo',{},{
              headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token')
              }
          })
          .then(res => {
              if(res.status === 201)
              {
                   let resData = res.data;
                   this.props.SetTeacherInfo(resData.post);
                   
              }
          });
           console.log('hey from TeacherMessageBox');
            this.setState({
                   dataMessage: {
                       ...this.state.dataMessage,
                       from : this.props.teacherInfo.roll,
                       name: this.props.teacherInfo.name
                   }  });
          
           socket.emit('TeacherOnline',{message:'is online' , userName :this.props.teacherInfo.roll});
          socket.on('message',data => {
            // console.log(data.msg);
            // console.log('hey');
              if(data.OldOrNew === 'new')
              {
                  var arr = [...this.state.MessagesDocs];
                  arr.push(data.doc);
                  this.setState({MessagesDocs: arr});
              }
              else
              {
                  var arr = [...this.state.MessagesDocs];
                  let obj = arr.find((doc, i) => {
                      if (doc._id === data.doc._id) {
                          arr[i] = data.doc;
                          return true; // stop searching
                      }
                  });

                 this.setState({MessagesDocs: arr}); 
              }
             // this.PrintMessage(data.doc);
           })

           

           socket.on('PastMessages', data => {
                 
                 this.PrintMessagesOnOnline(data);
           })

           socket.on('MessangerList',data => {
               // console.log(data.docs);
                this.setState({MessagesDocs : data.docs});
                this.PrintTeachersList(data.docs)
           })
          
         
        // setting up sockets and using them
         
       }


     PrintTeachersList = (docs) => {
            var arr = docs.map((doc,i) => {
                return( <List.Item as = {Link} to = { this.props.location.pathname + '/' + doc.studentRoll}>
                    <Image avatar src={images[i]} />
                    <List.Content>
                        <List.Header>{doc.studentRoll}</List.Header>
                    </List.Content>
                    </List.Item>)
            })

            this.setState({studentList : arr});
     }

      SendMessage = async(to) =>{
                
               // var to = toString(to)
              await this.setState({
                    dataMessage : {
                        ...this.state.dataMessage,
                        to : to
                    }
               })
               console.log(this.state.dataMessage.to);
               socket.emit('msgFromTeacher', {
                   msgData: this.state.dataMessage
               });

            this.setState({
                dataMessage : {
                    ...this.state.dataMessage,
                    msg : ''
                }
            })
      }

         PrintMessages = (doc) => {
                    
           // console.log(doc.teacherRoll)
                  var arr = doc.messages.map(message => {
                     return (<Comment>
                <Comment.Avatar as='a' src={(message.roll === this.state.dataMessage.from) ? 'https://react.semantic-ui.com/images/avatar/small/joe.jpg':'https://react.semantic-ui.com/images/avatar/small/christian.jpg'} />
                <Comment.Content>
                    <Comment.Author>{(message.roll === this.state.dataMessage.from) ? 'You':message.name}</Comment.Author>
                    <Comment.Metadata>
                    <div>1 day ago</div>
                    </Comment.Metadata>
                    <Comment.Text>
                    <p>
                        {message.message}
                    </p>
                    </Comment.Text>
                    {/* <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions> */}
                </Comment.Content>
                </Comment>
                )
              })
                 

                //console.log(arr);
                  this.setState({messages : arr }) 
              
          }
          
          PrintMessage = (message) => {
              // console.log(message)
            var arr = [...this.state.messages];
                     arr.push(<Comment>
                <Comment.Avatar as='a' src={(message.roll === this.state.dataMessage.from) ? 'https://react.semantic-ui.com/images/avatar/small/joe.jpg':'https://react.semantic-ui.com/images/avatar/small/christian.jpg'} />
                <Comment.Content>
                    <Comment.Author>{(message.roll === this.state.dataMessage.from) ? 'You':message.name}</Comment.Author>
                    <Comment.Metadata>
                    <div>1 day ago</div>
                    </Comment.Metadata>
                    <Comment.Text>
                    <p>
                        {message.msg}
                    </p>
                    </Comment.Text>
                    {/* <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions> */}
                </Comment.Content>
                </Comment>
                )
              
                 

                //console.log(arr);
                  this.setState({messages : arr }) 
          }


          PrintMessagesOnOnline = (data) => {
              
                  
             var arr = data.messages.map((message) => {
                     return (<Comment>
                <Comment.Avatar as='a' src={(message.roll === this.state.dataMessage.from) ? 'https://react.semantic-ui.com/images/avatar/small/joe.jpg':'https://react.semantic-ui.com/images/avatar/small/christian.jpg'} />
                <Comment.Content>
                    <Comment.Author>{(message.roll === this.state.dataMessage.from) ? 'You':message.name}</Comment.Author>
                    <Comment.Metadata>
                    <div>1 day ago</div>
                    </Comment.Metadata>
                    <Comment.Text>
                    <p>
                        {message.message}
                    </p>
                    </Comment.Text>
                    {/* <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions> */}
                </Comment.Content>
                </Comment>
                )
              })
                 

                //console.log(arr);
                  this.setState({messages : arr }) 
          }

           OnChangeMessageHandler = (event) => {

               this.setState({
                   dataMessage: {
                       ...this.state.dataMessage,
                       [event.target.name]: event.target.value
                   }

               })
           }

        

    render (){
        
        return(
          <Aux> 
                 {/* <Switch>
                     <Route path = {this.props.location.pathname} exact render = { (Routprops) => <StudentLayoutPage {...Routprops} StudentMarks = {this.props.StudentMarks} StudentAttendance = {this.props.StudentAttendance}/>}/>    
                 </Switch> */}  
                  <Grid>
                <Grid.Column width={5} >
                  <List animated verticalAlign='middle' size = 'huge' floated = 'left' link>
                    { this.state.studentList.map(studentID => {
                        return studentID;
                    })}
                </List>
                </Grid.Column>

                <Grid.Column stretched width={10}>
                
                    <Switch>
                       <Route path = '/TeacherPage/:roll/TeacherMessageBox/:Roll' exact  render = { (Routprops) => <TeacherIndividualChatbox {...Routprops} stateOfTeacher = {this.state} PrintMessages = {this.PrintMessages} OnChangeMessageHandler = {this.OnChangeMessageHandler}  SendMessage={this.SendMessage} PrintMessage = {this.PrintMessage} socket = {socket}/>}/>
                  </Switch>
                
                </Grid.Column>
            </Grid>
                
                   
                   {/*  <List.Item>
                    <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' />
                    <List.Content>
                        <List.Header>Helen</List.Header>
                    </List.Content>
                    </List.Item>
                    <List.Item>
                    <Image avatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                    <List.Content>
                        <List.Header>Christian</List.Header>
                    </List.Content>
                    </List.Item>
                    <List.Item>
                    <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
                    <List.Content>
                        <List.Header>Daniel</List.Header>
                    </List.Content>
                    </List.Item> 
                     */}
                   
                 
                  
                 {/*  <main>
                 <br/> <strong>CHAT BOX</strong> 
                <Comment.Group>
                    {
                        this.state.messages.map(msg => {
                            return msg;
                        })
                    }

                    <Form reply>
                    <Form.TextArea type = "text" onChange = {this.OnChangeMessageHandler} name = 'msg' value = {this.state.dataMessage.msg} />
                    <Button onClick = {this.SendMessage} content='Send Message' labelPosition='left' icon='edit' primary />
                    </Form>
                </Comment.Group>
            </main> */}
         </Aux>

        )                                  //abhi ismein page reload ke samay roll null ho jata hai and koi bhi ye page access kr sakta hai.
    }     
    
}

    const mapStateToProps = state => {
        return {
             authAndTokenInfo: state.token,
            studentInfo: state.studentInfo,
            teacherInfo : state.teacherInfo
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            SetStudentInfo: (studentInfoFromDataBase) => dispatch({type: 'SetStudentInfo',studentInfo: studentInfoFromDataBase }),
            SetTeacherInfo: (teacherInfoFromDataBase) => dispatch({type: 'SetTeacherInfo',teacherInfo: teacherInfoFromDataBase })
        };
    };

export default connect(mapStateToProps,mapDispatchToProps)(TeacherMessageBox);
