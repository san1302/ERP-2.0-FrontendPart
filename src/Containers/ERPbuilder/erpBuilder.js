import React,{Component} from 'react'
import Aux from '../../Components/HigherOrderComp/Auxilary'
import StudentLogin from '../../Components/StudentLogin/StudentLogin'
import TeacherLogin from '../../Components/TeacherLogin/TeacherLogin'
import {Route,Switch}from 'react-router-dom'
import StudentPage from '../../Components/StudentPage/StudentPage'
import TeacherPage from '../../Components/TeacherPage/TeacherPage'
import Axios from 'axios';
import StudentMarks from '../../Components/StudentMarks/StudentMarks'
import TeacherMarksUplaod from '../../Components/TeacherMarksUpload/TeacherMarksUpload';
import {connect} from 'react-redux';
import {Table} from 'semantic-ui-react'
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
              semester : undefined
        },

        Classroom : [
            
        ]

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


         Axios.get('http://localhost:8080/feed/students')
         .then(res => {
             if(res.status !== 200)
             throw new Error('Failed to fetch Student Data!');
            
             return res.data;
         })
         .then(resData => {
                  return resData.posts.map(post => {
                      return post.roll; // getting array of roll;
                  });
            })
            .then(rolls => {
                 
                let flag = 0;
                for(let roll in rolls)
                {
                     if(rolls[roll] === this.state.Student.roll)
                     {
                        Axios.post('http://localhost:8080/feed/student',{
                            roll: rolls[roll]
                        })
                        .then(res => {
                              if (res.status !== 201)
                                  throw new Error('Failed to fetch Student Data!');

                             return res.data;
                        })
                        .then(resData => {

                            this.props.SetStudentInfo(resData.post); 
                          /*  this.setState({studentInfo:{
                                   _id: resData.post._id,
                                       roll: resData.post.roll,
                                       password: resData.post.password,
                                       name: resData.post.name,
                                       email: resData.post.email,
                                       branch: resData.post.branch,
                                       semester: resData.post.semester,
                                       markId: resData.post.markId,
                                       // classroomId:
                           }}); */
                           console.log(this.props.studentInfo);
                         
                        })
                        .catch(err => {
                            console.log(err);
                        }) 
                         console.log('ok you can login');
                         flag = 1;
                         break;
                     }
                }
                if(!flag)
                     console.log('invalid credentials');
                 
            })
            .catch(err => console.log(err));
         
    }

    
    StudentMarks = () =>{
   
      Axios.post('http://localhost:8080/feed/student/mark',{
             markId : this.props.studentInfo.markId
        })
        .then(res => {
            let marks = res.data.mark;

         /*  const SubjectList = marks.map(markObject => {
                return markObject.subject;
            })

          const MarkList = marks.map(markObject => {
              return markObject.mark;
          })

          console.log(SubjectList);
          console.log(MarkList); */
             
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
            
             this.props.SetTeacherInfo(resData.post);
             console.log(this.props.teacherInfo);
         })
         .catch(err => console.log(err));

         
    }

     TeachergetStudentsList = () =>{
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
                // console.log(this.props.classroom);
                  Axios.post('http://localhost:8080/feed/getClassroomTableData', {
                      classroomId: resDataPost._id,
                  })
                  .then(res=>{
                      if (res.status === 201)
                      {
                          let ClassroomTableData = res.data.post;
                          this.props.SetClassroomMarksTable(ClassroomTableData);
                           console.log(this.props.classroomMarksTableInfo)
                      }
                  })

             }

             else{
                 console.log('no data came from server regarding studentList in a classroom')
             }
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


   
     
    render(){
        
         return (
          <Aux>

          <Route path = "/" exact render = { (Routprops) => <StudentLogin {...Routprops}  InputStudent ={this.state.Student}  handleRollNo = {this.OnChangeStudentRollNoHandler} handlePassword = {this.OnChangeStudentPasswordHandler} LoginSubmit = {this.OnStudentLoginSubmit}/>}/>
          <Route path = "/" exact render = { (Routprops) => <TeacherLogin {...Routprops}  InputTeacher ={this.state.Teacher} handleRollNo = {this.OnChangeTeacherRollNoHandler} handlePassword = {this.OnChangeTeacherPasswordHandler} LoginSubmit = {this.OnTeacherLoginSubmit} />}/>
          <Switch>
             <Route path = "/StudentPage/:roll" exact render = {(Routprops) => <StudentPage {...Routprops} StudentInfo ={this.props.studentInfo} StudentMarks = {this.StudentMarks} />} />
             <Route path = "/TeacherPage/:roll" exact render = {(Routprops) => <TeacherPage {...Routprops} TeacherInfo ={this.props.teacherInfo}/>} /> 
             <Route path = {'/StudentPage/:roll/StudentMarks'}  render = { (Routprops) => <StudentMarks {...Routprops} getStudentMarks = {this.getStudentMarks}/>}/>
             <Route path = {'/TeacherPage/:roll/TeacherMarksUpload'}  render = { (Routprops) => <TeacherMarksUplaod {...Routprops} TeachergetStudentsList = {this.TeachergetStudentsList}  InputTeacherClassroom ={this.state.TeacherClassroom} handleChange = {this.OnChangeClassroomHandler}/>}/>
          </Switch>
           
             
          </Aux>
       )
    }
    
}

const mapStateToProps = state => {
    return{
           studentInfo: state.studentInfo,
           teacherInfo: state.teacherInfo,
           marksList: state.studentMarks,
           classroom: state.classroom,
           classroomMarksTableInfo: state.classroomMarksTable
    }
}

const mapDispatchToProps = dispatch => {
         return{
                 SetStudentInfo : (studentInfoFromDataBase) => dispatch({type: 'SetStudentInfo',studentInfo: studentInfoFromDataBase}),
                 SetStudentMarks : (markList) => dispatch({type:'SetStudentMarks',studentMarks :markList }) ,
                 SetTeacherInfo : (teacherInfoFromDataBase) => dispatch({type: 'SetTeacherInfo',teacherInfo: teacherInfoFromDataBase}),
                 SetClassroomInfo : (ClassroomFromDataBase) => dispatch({type:'SetClassroomInfo',ClassroomInfo :ClassroomFromDataBase}),
                 SetClassroomMarksTable : (ClassroomMarksTableFromDataBase) => dispatch({type:'SetClassroomMarksTable',ClassroomMarksTableInfo :ClassroomMarksTableFromDataBase})
         };
};

export default connect(mapStateToProps,mapDispatchToProps)(ErpBuilder);
