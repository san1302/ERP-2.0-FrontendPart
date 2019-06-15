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
 var marksList = new Map();
class ErpBuilder extends Component {
    
    state = {
        Teacher: {
            roll : '',
            password: ''
        },

        Student :{
            roll: '',
            password : ''
        }


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
        .then(mark => {
            let marks = mark.data.mark;
            for(let i in marks)
            {
                //console.log(i + ':' + marks[i]);
                 marksList.set(i,marks[i]);
            }
            //console.log(mark.data.mark);
            console.log(marksList);
            this.props.SetStudentMarks(marksList);
        })
        .catch(err => console.log(err));
        
         
    }

      getStudentMarks = () => {

          /* Axios.post('http://localhost:8080/feed/student/mark', {
                  markId: this.props.studentInfo.markId
              })
              .then(mark => {
                  let marks = mark.data.mark;
                  for (let i in marks) {
                      //console.log(i + ':' + marks[i]);
                      marksList.set(i, marks[i]);
                  }
                  //console.log(mark.data.mark);
                  console.log(marksList);
                  this.props.SetStudentMarks(marksList);
              })
              .catch(err => console.log(err)); */
             var items = []
              for(var [key,val] of marksList.entries())
              {
                  
                  items.push( <Table.Row key = {key}><Table.Cell>{key}</Table.Cell><Table.Cell>{val}</Table.Cell></Table.Row>)
              }

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
             branch: 'information technology',
             semester : 4
         })
         .then(res => {
             if(res.status === 201)
             {
                  console.log(res.data);
             }

             else{
                 console.log('no data came from server regarding studentList in a classroom')
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
             <Route path = {'/TeacherPage/:roll/TeacherMarksUpload'}  render = { (Routprops) => <TeacherMarksUplaod {...Routprops} TeachergetStudentsList = {this.TeachergetStudentsList} />}/>
          </Switch>
           
             
          </Aux>
       )
    }
    
}

const mapStateToProps = state => {
    return{
           studentInfo: state.studentInfo,
           teacherInfo: state.teacherInfo
    }
}

const mapDispatchToProps = dispatch => {
         return{
                 SetStudentInfo : (studentInfoFromDataBase) => dispatch({type: 'SetStudentInfo',studentInfo: studentInfoFromDataBase}),
                 SetStudentMarks : (markList) => dispatch({type:'SetStudentMarks',studentMarks :markList }) ,
                 SetTeacherInfo : (teacherInfoFromDataBase) => dispatch({type: 'SetTeacherInfo',teacherInfo: teacherInfoFromDataBase}),
         };
};

export default connect(mapStateToProps,mapDispatchToProps)(ErpBuilder);
