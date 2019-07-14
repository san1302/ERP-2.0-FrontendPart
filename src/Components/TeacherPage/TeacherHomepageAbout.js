import React,{Component} from 'react'
import {Header,Image, Segment,Grid,Menu,Card,Container} from 'semantic-ui-react'
import {Link}from 'react-router-dom';
import {Route,Switch}from 'react-router-dom'
import logo from './35541-6-teacher-transparent-image.png'
import chatLogo from './Chat-PNG-Image.png'
import marksLogo from './marks1.png';
import attendanceLogo from './attendance.jpg'
import {connect} from 'react-redux';
import Axios from 'axios';
import classes from './TeacherHomepage.css'

class TeacherHomepageAbout extends Component  {

    
    render() {
         return(
        <div>   
         <Segment raised inverted tertiary color = 'blue' className = {classes.home}>
               <p className = {classes.heading}>Welcome To The Teacher's Column</p>
           <Card.Group style = {{marginLeft:'40px'}}>
               <Card as = {Link} raised color= 'black' link to = { '/TeacherPage/' + this.props.teacherInfo.roll  + '/TeacherMessageBox'}>
                    <Image src = {chatLogo} wrapped style ={{height : '290px'}}></Image>
                    <Card.Content>
                        <Card.Header style = {{fontFamily :'Patua One',fontSize:'25px'}}>CHATBOX</Card.Header>
                         <Card.Description style = {{fontFamily :'Patua One',fontSize:'20px'}} >
                            You can chat with students
                         </Card.Description>
                    </Card.Content>
                   
               </Card>
               <Card as ={Link} raised color= 'black' link to = { '/TeacherPage/' + this.props.teacherInfo.roll + '/TeacherMarksUpload'}>
                    <Image src = {marksLogo} wrapped bordered></Image>
                    <Card.Content>
                        <Card.Header style = {{fontFamily :'Patua One',fontSize:'25px'}}>UPLOAD MARKS</Card.Header>
                         <Card.Description style = {{fontFamily :'Patua One',fontSize:'20px'}} >
                            You can upload the marks of a class
                         </Card.Description>
                    </Card.Content>
                   
               </Card>  

                <Card as = {Link} raised color= 'black' link  to = { '/TeacherPage/' + this.props.teacherInfo.roll + '/TeacherAttendanceUpload'}>
                    <Image src = {attendanceLogo} wrapped bordered></Image>
                    <Card.Content>
                        <Card.Header style = {{fontFamily :'Patua One',fontSize:'25px'}}>UPLOAD ATTENDANCE</Card.Header>
                         <Card.Description style = {{fontFamily :'Patua One',fontSize:'20px'}} >
                            You can upload the attendance of a class
                         </Card.Description>
                    </Card.Content>
                   
               </Card>  
           </Card.Group>
           <div className = {classes.toolbar_logo}><Image  src = {logo} size = 'large' wrapped ></Image></div>
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

export default connect(mapStateToProps,mapDispatchToProps)(TeacherHomepageAbout);