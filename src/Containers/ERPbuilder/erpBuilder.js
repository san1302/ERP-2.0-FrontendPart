import React,{Component} from 'react'
import Aux from '../../Components/HigherOrderComp/Auxilary'
import StudentLogin from '../../Components/StudentLogin/StudentLogin'
import TeacherLogin from '../../Components/TeacherLogin/TeacherLogin'
import {Route,Switch}from 'react-router-dom'
import StudentPage from '../../Components/StudentPage/StudentPage'
import TeacherPage from '../../Components/TeacherPage/TeacherPage'
import Axios from 'axios';
import StudentMarks from '../../Components/StudentMarks/StudentMarks'
import {connect} from 'react-redux';

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



        teacherInfo: null
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
     
    render(){
        
         return (
          <Aux>

          <Route path = "/" exact render = { (Routprops) => <StudentLogin {...Routprops}  InputStudent ={this.state.Student}  handleRollNo = {this.OnChangeStudentRollNoHandler} handlePassword = {this.OnChangeStudentPasswordHandler} LoginSubmit = {this.OnStudentLoginSubmit}/>}/>
          <Route path = "/" exact render = { (Routprops) => <TeacherLogin {...Routprops}  InputTeacher ={this.state.Teacher} handleRollNo = {this.OnChangeTeacherRollNoHandler} handlePassword = {this.OnChangeTeacherPasswordHandler}/>}/>
          <Switch>
             <Route path = "/StudentPage/:roll" exact render = {(Routprops) => <StudentPage {...Routprops} StudentInfo ={this.props.studentInfo}/>} />
             <Route path = "/TeacherPage/:roll" exact render = {(Routprops) => <TeacherPage {...Routprops} TeacherInfo ={this.props.teacherInfo}/>} /> 
             <Route path = {'/StudentPage/be1026217/StudentMarks'}  render = { (Routprops) => <StudentMarks {...Routprops}/>}/>
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
                 SetStudentInfo : (studentInfoFromDataBase) => dispatch({type: 'SetStudentInfo',studentInfo: studentInfoFromDataBase})
         };
};

export default connect(mapStateToProps,mapDispatchToProps)(ErpBuilder);
