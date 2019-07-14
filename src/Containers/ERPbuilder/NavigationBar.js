import React,{Component} from 'react'
import classes from './NavigationBar.css'
import {Header,Image, Segment,Grid,Menu,Card,Button} from 'semantic-ui-react'
import {Link}from 'react-router-dom';
import {Route,Switch}from 'react-router-dom'
import logo from '../../Components/Layout/images/—Pngtree—student hat degree vector_2263183.png'
import {connect} from 'react-redux';
import Axios from 'axios';

let RouteForStudentOrTeacher;
let currURL = window.location.href;
console.log(currURL);
class NavigationBar extends Component  {

  
    render() {
         return(
        <div>   
         <main className = {classes.toolbar}>
               <div className={classes.toolbar_logo}><Image as={Link} src={logo} to={currURL.startsWith('http://localhost:8000/TeacherPage')? '/TeacherPage/' + this.props.teacherInfo.roll :'/StudentPage/' + this.props.studentInfo.roll} size = 'medium' wrapped ></Image></div>
          </main>
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

export default connect(mapStateToProps,mapDispatchToProps)(NavigationBar);