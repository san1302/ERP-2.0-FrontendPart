import React,{Component} from 'react'
import Aux from '../HigherOrderComp/Auxilary'
import {connect} from 'react-redux';
//import StudentLayoutPage from '../Layout/studentPageLayout';
//import {Route,Switch}from 'react-router-dom';
import openSocket from 'socket.io-client';
import classes from './StudentPage.css'
import {Link}from 'react-router-dom';
import Axios from 'axios';
import {Route,Switch}from 'react-router-dom'
import StudentMarks from '../StudentMarks/StudentMarks'
import StudentAttendance from '../StudentAttendance/StudentAttendance'
import StudentMessageBox from '../MessageBox/StudentMessageBox'
import StudentHomepageAbout from './StudentHomepageAbout'
import { Button, Comment, Form ,Grid,Image,Menu,Segment,Icon,Sidebar, Label,List,Divider} from 'semantic-ui-react'

 const socket = openSocket('http://localhost:8080');
class  StudentPage extends Component {

      async componentWillMount()
       {
        console.log('In student page')
         await Axios.post('http://localhost:8080/feed/StudentInfo',{},{
              headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token')
              }
          })
          .then(res => {
              if(res.status === 201)
              {
                   let resData = res.data;
                   this.props.SetStudentInfo(resData.post);
                   
              }
          });
          
         
        // setting up sockets and using them
         
       }  

    render (){
        
        return(
          <Aux>  
            <main className = {classes.sidebar}>
                <List size = 'large'>
                <List.Item> <Label tag color = 'black' pointing = 'right' size ='big' as = {Link} onClick = {this.props.StudentMarks} to = { '/StudentPage/' + this.props.studentInfo.roll + '/StudentMarks'}><Icon name = 'tasks'/> MARKS</Label></List.Item>
                <List.Item> <Label tag color = 'black' pointing = 'right' size = 'big' as={Link}  to = { '/StudentPage/' + this.props.studentInfo.roll  + '/StudentMessageBox'}><Icon name = 'chat'/>CHATBOX</Label></List.Item>
                <List.Item> <Label tag color = 'black' pointing = 'right' size = 'big' as = {Link} onClick = {this.props.StudentAttendance} to = {  '/StudentPage/' + this.props.studentInfo.roll +  '/StudentAttendance'}><Icon name = 'users'/>ATTENDANCE</Label></List.Item>
                </List>   
                <Divider vertical  style = {{marginLeft : '150px',marginTop: '-350px',height:'100px'}}>SELECT</Divider>     
            </main>
             
           {/* <main className = {classes.studentData}>
             <Route path = {'/StudentPage/:roll'} exact render = { (Routprops) => <StudentHomepageAbout {...Routprops} />}/>
             <Switch>
             <Route path = {'/StudentPage/:roll/StudentMarks'} exact  render = { (Routprops) => <StudentMarks {...Routprops} getStudentMarks = {this.props.getStudentMarks}/>}/>
             <Route path = {'/StudentPage/:roll/StudentAttendance'} exact render = { (Routprops) => <StudentAttendance {...Routprops} />}/>
             <Route path = {'/StudentPage/:roll/StudentMessageBox'} render = { (Routprops) => <StudentMessageBox {...Routprops} />}/>
            </Switch>
           </main> */}
            
         </Aux>

        )                                  //abhi ismein page reload ke samay roll null ho jata hai and koi bhi ye page access kr sakta hai.
    }     
    
}

    const mapStateToProps = state => {
        return {
             authAndTokenInfo: state.token,
            studentInfo: state.studentInfo
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            SetStudentInfo: (studentInfoFromDataBase) => dispatch({type: 'SetStudentInfo',studentInfo: studentInfoFromDataBase })
        };
    };

export default connect(mapStateToProps,mapDispatchToProps)(StudentPage);
