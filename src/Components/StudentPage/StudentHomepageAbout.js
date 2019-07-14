import React,{Component} from 'react'
import {Header,Image, Segment,Grid,Menu,Card,Container} from 'semantic-ui-react'
import {Link}from 'react-router-dom';
import {Route,Switch}from 'react-router-dom'
import logo from './logo9.png'
import chatLogo from './Chat-PNG-Image.png'
import marksLogo from './marks2.png';
import attendanceLogo from './attendance.jpg'
import {connect} from 'react-redux';
import Axios from 'axios';
import classes from './StudentHomepageAbout.css'

class StudentHomepageAbout extends Component  {

    
    render() {
         return(
        <div>   
         <Segment raised inverted tertiary color = 'blue' className = {classes.home}>
               <p className = {classes.heading}>Welcome To The Student's Column</p>
           <Card.Group>
               <Card as = {Link} raised color= 'black' link to = {'/StudentPage/' + this.props.studentInfo.roll  + '/StudentMessageBox'}>
                    <Image src = {chatLogo} wrapped style ={{height : '290px'}}></Image>
                    <Card.Content>
                        <Card.Header style = {{fontFamily :'Patua One',fontSize:'25px'}}>CHATBOX</Card.Header>
                         <Card.Description style = {{fontFamily :'Patua One',fontSize:'20px'}} >
                            You can chat with teachers
                         </Card.Description>
                    </Card.Content>
                   
               </Card>
               <Card as = {Link} raised color= 'black' link onClick = {this.props.StudentMarks} to = { '/StudentPage/' + this.props.studentInfo.roll + '/StudentMarks'} >
                    <Image src = {marksLogo} wrapped bordered></Image>
                    <Card.Content>
                        <Card.Header style = {{fontFamily :'Patua One',fontSize:'25px'}}>CHECK YOUR MARKS</Card.Header>
                         <Card.Description style = {{fontFamily :'Patua One',fontSize:'20px'}} >
                            You can check your marks and grades in various subjects
                         </Card.Description>
                    </Card.Content>
                   
               </Card>  

                <Card as ={Link} raised color= 'black' link  onClick = {this.props.StudentAttendance} to = {  '/StudentPage/' + this.props.studentInfo.roll +  '/StudentAttendance'}>
                    <Image src = {attendanceLogo} wrapped bordered></Image>
                    <Card.Content>
                        <Card.Header style = {{fontFamily :'Patua One',fontSize:'25px'}}>LIVE  ATTENDANCE</Card.Header>
                         <Card.Description style = {{fontFamily :'Patua One',fontSize:'20px'}} >
                            You can check your attendances in various subjects
                         </Card.Description>
                    </Card.Content>
                   
               </Card>  
           </Card.Group>
           <div raised className = {classes.toolbar_logo}><Image  src = {logo} size = 'huge' wrapped ></Image></div>
          </Segment>
        </div>
        
      );
    }
    
    
}

const mapStateToProps = state => {
    return{
           authAndTokenInfo: state.token,
           studentInfo: state.studentInfo,
           teacherInfo: state.teacherInfo,
           marksList: state.studentMarks,
           attendanceList : state.studentAttendance,
           classroom: state.classroom,
           classroomMarksTableInfo: state.classroomMarksTable,
           classroomAttendanceTableInfo : state.classroomAttendanceTable
    }
}

const mapDispatchToProps = dispatch => {
         return{
                 SetStudentInfo : (studentInfoFromDataBase) => dispatch({type: 'SetStudentInfo',studentInfo: studentInfoFromDataBase}),
                 SetStudentMarks : (markList) => dispatch({type:'SetStudentMarks',studentMarks :markList }) ,
                 SetStudentAttendance : (attendanceList) => dispatch({type:'SetStudentAttendance',studentAttendance :attendanceList }) ,
                 SetTeacherInfo : (teacherInfoFromDataBase) => dispatch({type: 'SetTeacherInfo',teacherInfo: teacherInfoFromDataBase}),
                 SetClassroomInfo : (ClassroomFromDataBase) => dispatch({type:'SetClassroomInfo',ClassroomInfo :ClassroomFromDataBase}),
                 SetClassroomMarksTable : (ClassroomMarksTableFromDataBase) => dispatch({type:'SetClassroomMarksTable',ClassroomMarksTableInfo :ClassroomMarksTableFromDataBase}),
                 SetClassroomAttendanceTable :  (attendanceList) => dispatch({type:'SetClassroomAttendanceTable',ClassroomAttendanceTableInfo :attendanceList}),
                 SetTokenInfo : (tokenInfo) => dispatch({type: 'SetTokenInfo',TokenInfo: tokenInfo})
         };
};

export default connect(mapStateToProps,mapDispatchToProps)(StudentHomepageAbout);