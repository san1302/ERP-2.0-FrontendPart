import React,{Component} from 'react'
import Aux from '../HigherOrderComp/Auxilary'
import {connect} from 'react-redux';
//import StudentLayoutPage from '../Layout/studentPageLayout';
//import {Route,Switch}from 'react-router-dom';
import openSocket from 'socket.io-client';
import {Link}from 'react-router-dom';
import Axios from 'axios';
import { Button, Comment, Form ,Grid,Image,Menu,Segment,Icon,Sidebar} from 'semantic-ui-react'

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
                 {/* <Switch>
                     <Route path = {this.props.location.pathname} exact render = { (Routprops) => <StudentLayoutPage {...Routprops} StudentMarks = {this.props.StudentMarks} StudentAttendance = {this.props.StudentAttendance}/>}/>    
                 </Switch> */}  
                  <main>
          
                <ul>
                <li> <Link onClick = {this.props.StudentMarks} to = { this.props.location.pathname + '/StudentMarks'}>Marks</Link></li>
                <li> <Link onClick = {this.props.StudentAttendance} to = { this.props.location.pathname + '/StudentAttendance'}>Attendance</Link></li>
                <li><Link  to = { this.props.location.pathname + '/StudentMessageBox'}>ChatBox</Link></li>
                </ul>
                        
            </main>
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
