import React,{Component} from 'react'
import Aux from '../../Components/HigherOrderComp/Auxilary'
import StudentLogin from '../../Components/StudentLogin/StudentLogin'
import TeacherLogin from '../../Components/TeacherLogin/TeacherLogin'
import {Route,Switch}from 'react-router-dom'
import StudentPage from '../../Components/StudentPage/StudentPage'
import TeacherPage from '../../Components/TeacherPage/TeacherPage'
import Axios from 'axios';
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


         Axios.get('http://localhost:8080/feed/posts')
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

          <Route path = "/" exact render = { (Routprops) => <StudentLogin {...Routprops}  state ={this.state.Student} handleRollNo = {this.OnChangeStudentRollNoHandler} handlePassword = {this.OnChangeStudentPasswordHandler} LoginSubmit = {this.OnStudentLoginSubmit}/>}/>
          <Route path = "/" exact render = { (Routprops) => <TeacherLogin {...Routprops}  state ={this.state.Teacher} handleRollNo = {this.OnChangeTeacherRollNoHandler} handlePassword = {this.OnChangeTeacherPasswordHandler}/>}/>
          <Switch>
             <Route path = "/StudentPage/:roll" exact render = {(Routprops) => <StudentPage {...Routprops} roll= {this.state.Student.roll}/>} />
             <Route path = "/TeacherPage/:roll" exact render = {(Routprops) => <TeacherPage {...Routprops} roll= {this.state.Teacher.roll}/>} /> 
          </Switch>
           
             
          </Aux>
       )
    }
    
}

export default ErpBuilder;
