import React,{Component} from 'react'
import Aux from '../../Components/HigherOrderComp/Auxilary'
import StudentLogin from '../../Components/StudentLogin/StudentLogin'
import TeacherLogin from '../../Components/TeacherLogin/TeacherLogin'
import {Route,Switch}from 'react-router-dom'
import StudentPage from '../../Components/StudentPage/StudentPage'
import TeacherPage from '../../Components/TeacherPage/TeacherPage'
import Axios from 'axios';
import StudentMarks from '../../Components/StudentMarks/StudentMarks';
import StudentAttendance from '../../Components/StudentAttendance/StudentAttendance'
import TeacherMarksUplaod from '../../Components/TeacherMarksUpload/TeacherMarksUpload';
import TeacherAttendanceUpload from '../../Components/TeacherAttendanceUpload/TeacherAttendanceUpload'
import StudentMessageBox from '../../Components/MessageBox/StudentMessageBox'
import TeacherMessageBox from '../../Components/MessageBox/TeacherMessageBox'
import {connect} from 'react-redux';
import {Table} from 'semantic-ui-react';


 var marksList = [];
class ErpBuilder extends Component {
    
    state = {
        Teacher: {
            roll : '',
            password: ''
        },

        Student :{
            roll: '',
            password : ''
        },
       
        TeacherClassroom :{
              branch : '',
              semester : undefined,
              subject : ''
        },

        Classroom : [
            
        ],

        classroomMarksTableState: [],
        classroomAttendanceTableState : []

    }

    componentWillMount(){
        console.log('hey from erp builder');
    }
   
    OnChangeStudentRollNoHandler = (event) =>
    {
       this.setState({
            Student :{
               ...this.state.Student,
                 roll: event.target.value
            }
       })
    }

    OnChangeStudentPasswordHandler = (event) => {
        
        this.setState({
             Student: {
                 ...this.state.Student,
                  password: event.target.value
             }
           
        })
    }

    OnStudentLoginSubmit = () => {


        Axios.post('http://localhost:8080/feed/loginStudent',{
            roll: this.state.Student.roll
        })
        .then(res => {
                if (res.status !== 201)
                    throw new Error('Failed to fetch Student Data!');

                return res.data;
        })
        .then(resData => {
             
            console.log(resData);
            const tokenInfo = {
                isAuth: true,
                token: resData.token,
                userId: resData.post._id
            }
            this.props.SetTokenInfo(tokenInfo);

             localStorage.setItem('token', resData.token);
             localStorage.setItem('userId', resData.post._id);
             const remainingMilliseconds = 60 * 60 * 1000;
             const expiryDate = new Date(
                 new Date().getTime() + remainingMilliseconds
             );
             localStorage.setItem('expiryDate', expiryDate.toISOString());
          //   this.setAutoLogout(remainingMilliseconds);
            setTimeout(() => {
                 localStorage.removeItem('token');
                 localStorage.removeItem('expiryDate');
                 localStorage.removeItem('userId');
            }, remainingMilliseconds);

            this.props.SetStudentInfo(resData.post); 

            console.log(this.props.studentInfo);
            
        })
        .catch(err => {
            console.log(err);
        }) 
         
    }

    
    StudentMarks = () =>{
   
      Axios.post('http://localhost:8080/feed/student/mark',{
             markId : this.props.studentInfo.markId
        })
        .then(res => {
            let marks = res.data.mark;
            
            console.log(marks);
          marksList = marks.Marks.map(markObject => {
             // console.log(markObject.subject)
              return {subject :markObject.subject,mark:markObject.mark}
          }) 
           
            this.props.SetStudentMarks(marksList); 
        })
        .catch(err => console.log(err));
        
         
    }

      getStudentMarks = () => {
             var items = []
            //  console.log(this.props.marksList)
             items = this.props.marksList.map(MarkObject => {   
                 return  (<Table.Row key = {MarkObject.subject}><Table.Cell>{MarkObject.subject}</Table.Cell><Table.Cell>{MarkObject.mark}</Table.Cell></Table.Row>)
             })
    
               //console.log(items)
              return items;
      }



    OnChangeTeacherRollNoHandler = (event) => {
        
        //console.log(event.target.id);
        this.setState({
              Teacher: {
                  ...this.state.Teacher,
                     roll: event.target.value
              }
            
        })
    }

    OnChangeTeacherPasswordHandler = (event) => {
        
        this.setState({
              Teacher : {
                  ...this.state.Teacher,
                   password: event.target.value
              }
        })
    }

    OnChangeClassroomMarksHandler = (event) => {
            
            let arr = [...this.state.classroomMarksTableState];
            let nestedArr = [...arr[event.target.id].markSubject];
            nestedArr[event.target.name].mark = Number(event.target.value)
            arr[event.target.id].markSubject = nestedArr
               this.setState({  
                     classroomMarksTableState :  arr  
               })
    }

    OnChangeClassroomAttendanceHandler = (i,event) => {
          let arr = [...this.state.classroomAttendanceTableState];
          arr[i].presentORabsent = event.target.value
          console.log(event.target.value)
          this.setState ({
              classroomAttendanceTableState : arr
          })
    }

      OnChangeClassroomHandler = (event) => {

          this.setState({
              TeacherClassroom: {
                  ...this.state.TeacherClassroom,
                  [event.target.name]: event.target.value
              }

          })
      }


     OnTeacherLoginSubmit = () => {

         Axios.post('http://localhost:8080/feed/checkTeacher', {
             roll : this.state.Teacher.roll
             // send password also for authentication;
         })
         .then(res => {
             if(res.status ===200 )   
            throw new Error('Invalid Teacher Credentials');

             return res.data;
         })
         .then(resData => {
             
              const tokenInfo = {
                  isAuth: true,
                  token: resData.token,
                  userId: resData.post._id
              }
              this.props.SetTokenInfo(tokenInfo);

              localStorage.setItem('token', resData.token);
              localStorage.setItem('userId', resData.post._id);
              const remainingMilliseconds = 60 * 60 * 1000;
              const expiryDate = new Date(
                  new Date().getTime() + remainingMilliseconds
              );
              localStorage.setItem('expiryDate', expiryDate.toISOString());
              //   this.setAutoLogout(remainingMilliseconds);
              setTimeout(() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('expiryDate');
                  localStorage.removeItem('userId');
              }, remainingMilliseconds);


             this.props.SetTeacherInfo(resData.post);
             console.log(this.props.teacherInfo);
         })
         .catch(err => console.log(err));

         
    }

     TeachergetStudentsListForMarks = () =>{
         Axios.post('http://localhost:8080/feed/getStudentsListFromClassroom',{
             teacherId:this.props.teacherInfo._id,
             branch: this.state.TeacherClassroom.branch,
             semester : this.state.TeacherClassroom.semester
         }, {
             headers: {
                 Authorization: 'Bearer ' + this.props.authAndTokenInfo.token
             }
         })
         .then(res => {
             if(res.status === 201)
             {
                 let resDataPost = res.data.post;
                 this.props.SetClassroomInfo(resDataPost);
                // console.log(this.props.classroom);
                  Axios.post('http://localhost:8080/feed/getClassroomMarksTableData', {
                      classroomId: resDataPost._id,
                  })
                  .then(res=>{
                      if (res.status === 201)
                      {
                          let ClassroomTableData = res.data.post;
                          this.props.SetClassroomMarksTable(ClassroomTableData);
                          this.setState({classroomMarksTableState:this.props.classroomMarksTableInfo})
                           console.log(this.props.classroomMarksTableInfo)
                      }
                  })

             }

             else{
                 console.log('no data came from server regarding studentList in a classroom')
             }
         })   
         
    }

    UpdateClassroomTable = () =>{
        // console.log(this.state.classroomMarksTableState)
                                                            // both are giving same values.. should not happen as we have not set in reducer.
        //console.log(this.props.classroomMarksTableInfo)

       //this.props.SetClassroomMarksTable(this.state.classroomMarksTableState);   that should happen after this.

        Axios.post('http://localhost:8080/feed/postUpdateMarksTable',{
             post : this.state.classroomMarksTableState
         });
    }

     StudentAttendance = () =>{

           // console.log(this.props.studentInfo._id)
             Axios.post('http://localhost:8080/feed/student/attendance',{
             studentId : this.props.studentInfo._id
        })
        .then(res => {
            let attendance = res.data.attendance;
         /*  var attendanceList = attendance.Attendances.map(attendanceObject => {
             // console.log(attendanceObject.subject)
              return {subject :attendanceObject.subject,attendance:attendanceObject.attendance,totalClasses:attendanceObject.totalClasses,classesPresent:attendanceObject.classesPresent}
          })  */
           console.log(attendance)
            this.props.SetStudentAttendance(attendance.Attendances); 
            console.log(this.props.attendanceList)
        })
        .catch(err => console.log(err));
     }

     
     TeachergetStudentsListForAttendance = () =>{
                Axios.post('http://localhost:8080/feed/getStudentsListFromClassroom',{
             teacherId:this.props.teacherInfo._id,
             branch: this.state.TeacherClassroom.branch,
             semester : this.state.TeacherClassroom.semester
         })
         .then(res => {
             if(res.status === 201)
             {
                 let resDataPost = res.data.post;
                 this.props.SetClassroomInfo(resDataPost);
                 console.log(this.props.classroom);
                  Axios.post('http://localhost:8080/feed/getClassroomAttendanceTableData', {
                      classroomId: resDataPost._id,
                  })
                  .then(res=>{
                      if (res.status === 201)
                      {
                          let ClassroomAttendanceTableData = res.data.post;
                          console.log(ClassroomAttendanceTableData)
                          this.props.SetClassroomAttendanceTable(ClassroomAttendanceTableData);
                          this.setState({classroomAttendanceTableState:this.props.classroomAttendanceTableInfo})
                           console.log(this.props.classroomAttendanceTableInfo)
                      }
                  })

             }

             else{
                 console.log('no data came from server regarding studentList in a classroom')
             }
         })   
     }
     
     UpdateClassroomTableAboutAttendance = () =>{
        // console.log(this.state.classroomMarksTableState)
                                                            // both are giving same values.. should not happen as we have not set in reducer.
        //console.log(this.props.classroomMarksTableInfo)

       //this.props.SetClassroomMarksTable(this.state.classroomMarksTableState);   that should happen after this.

        Axios.post('http://localhost:8080/feed/postUpdateAttendanceTable',{
             post : this.state.classroomAttendanceTableState,
             subject : this.state.TeacherClassroom.subject
         });
    }


   
     
    render(){
        
         return (
        
         
          <Aux >
          
          <Route path = "/" exact render = { (Routprops) => <StudentLogin {...Routprops}  InputStudent ={this.state.Student}  handleRollNo = {this.OnChangeStudentRollNoHandler} handlePassword = {this.OnChangeStudentPasswordHandler} LoginSubmit = {this.OnStudentLoginSubmit}/>}/>
          <Route path = "/" exact render = { (Routprops) => <TeacherLogin {...Routprops}  InputTeacher ={this.state.Teacher} handleRollNo = {this.OnChangeTeacherRollNoHandler} handlePassword = {this.OnChangeTeacherPasswordHandler} LoginSubmit = {this.OnTeacherLoginSubmit} />}/>
          <Switch>
             <Route path = "/StudentPage/:roll" exact render = {(Routprops) => <StudentPage {...Routprops} StudentInfo ={this.props.studentInfo} StudentMarks = {this.StudentMarks} StudentAttendance = {this.StudentAttendance}/>} />
             <Route path = "/TeacherPage/:roll" exact render = {(Routprops) => <TeacherPage {...Routprops} TeacherInfo ={this.props.teacherInfo}/>} /> 
             <Route path = {'/StudentPage/:roll/StudentMarks'} exact  render = { (Routprops) => <StudentMarks {...Routprops} getStudentMarks = {this.getStudentMarks}/>}/>
             <Route path = {'/StudentPage/:roll/StudentAttendance'} exact render = { (Routprops) => <StudentAttendance {...Routprops} />}/>
              <Route path = {'/StudentPage/:roll/StudentMessageBox'} render = { (Routprops) => <StudentMessageBox {...Routprops} />}/>
              <Route path = {'/TeacherPage/:roll/TeacherMessageBox'} render = { (Routprops) => <TeacherMessageBox {...Routprops} />}/>
             <Route path = {'/TeacherPage/:roll/TeacherMarksUpload'} exact render = { (Routprops) => <TeacherMarksUplaod {...Routprops} TeachergetStudentsListForMarks = {this.TeachergetStudentsListForMarks}  InputTeacherClassroom = {this.state.TeacherClassroom} handleChange = {this.OnChangeClassroomMarksHandler} handleTeacherData = {this.OnChangeClassroomHandler} classroomMarksTableState ={this.state.classroomMarksTableState} UpdateClassroomTable = {this.UpdateClassroomTable}/>}/>
             <Route path = {'/TeacherPage/:roll/TeacherAttendanceUpload'} exact  render = { (Routprops) => <TeacherAttendanceUpload {...Routprops} TeachergetStudentsListForAttendance = {this.TeachergetStudentsListForAttendance}  InputTeacherClassroom ={this.state.TeacherClassroom} handleChange = {this.OnChangeClassroomAttendanceHandler} handleTeacherData = {this.OnChangeClassroomHandler} classroomAttendanceTableState ={this.state.classroomAttendanceTableState} UpdateClassroomTable = {this.UpdateClassroomTableAboutAttendance}/>}/>
          </Switch>
           
             
          </Aux>

          
       )
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

export default connect(mapStateToProps,mapDispatchToProps)(ErpBuilder);
