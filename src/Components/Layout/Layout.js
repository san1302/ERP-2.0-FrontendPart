import React,{Component} from 'react'
import classes from './background.css'
import Aux from '../HigherOrderComp/Auxilary'
import {Header,Image, Segment,Grid,Menu} from 'semantic-ui-react'
import {Link}from 'react-router-dom';
import {Route,Switch}from 'react-router-dom'
import logo from './images/—Pngtree—student hat degree vector_2263183.png'
import StudentLogin from '../StudentLogin/StudentLogin';
import TeacherLogin from '../TeacherLogin/TeacherLogin';
import {connect} from 'react-redux';
import Axios from 'axios';

let RouteForStudentOrTeacher;
class Layout extends Component  {
      state = {
              Teacher: {
                  roll: '',
                  password: ''
              },

              Student: {
                  roll: '',
                  password: ''
              },
              activeItem: 'Student Login'
            }
      async componentWillMount()
    {
         RouteForStudentOrTeacher = <Route path = "/" exact render = { (Routprops) => <StudentLogin {...Routprops}  InputStudent ={this.state.Student}  handleRollNo = {this.OnChangeStudentRollNoHandler} handlePassword = {this.OnChangeStudentPasswordHandler} LoginSubmit = {this.OnStudentLoginSubmit}/>}/>
    }
     handleItemClick = async(e, { name }) => {await this.setState({ activeItem: name  })
         if(this.state.activeItem === 'Student Login')
           {
               RouteForStudentOrTeacher = <Route path = "/" exact render = { (Routprops) => <StudentLogin {...Routprops}  InputStudent ={this.state.Student}  handleRollNo = {this.OnChangeStudentRollNoHandler} handlePassword = {this.OnChangeStudentPasswordHandler} LoginSubmit = {this.OnStudentLoginSubmit}/>}/>
           }

        else
        {
          RouteForStudentOrTeacher = <Route path = "/" exact render = { (Routprops) => <TeacherLogin {...Routprops}  InputTeacher ={this.state.Teacher} handleRollNo = {this.OnChangeTeacherRollNoHandler} handlePassword = {this.OnChangeTeacherPasswordHandler} LoginSubmit = {this.OnTeacherLoginSubmit} />}/> 
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

    
    render() {
        const activeItem = this.state.activeItem;
         return(
        <div>
          <main className = {classes.toolbar}>
           <div className = {classes.toolbar_logo}><Image  src = {logo} size = 'big' wrapped ></Image></div>
            <nav className = {classes.toolbar_navigation}>
                {/* <div className = {classes.toolbar_logo}><Link><Image  src = {logo} size = 'small' wrapped ></Image> </Link></div> */}
                <div className = {classes.spacer}/>
                {/* <div className = {classes.toolbar_navigation_items}>
                    <ul>
                        <li><Link >Logout</Link></li>
                    </ul>
                </div> */}
             </nav>
              
          </main>
          <main style = {{marginTop :'300px',marginLeft:'800px'}} >
              <Grid>
                <Grid.Column width={5} >
                <Menu fluid vertical tabular color = 'blue'>
                    <Menu.Item name='Student Login' active={activeItem === 'Student Login'} onClick={this.handleItemClick} icon = {'student'}/>
                    <Menu.Item
                    name='Teacher Login'
                    active={activeItem === 'Teacher Login'}
                    onClick={this.handleItemClick}
                />
                </Menu>
                </Grid.Column>

                <Grid.Column stretched width={10}>
                <Segment raised color = 'blue' >
                  {
                      this.state.activeItem === 'Student Login' &&   <Route path = "/" exact render = { (Routprops) => <StudentLogin {...Routprops}  InputStudent ={this.state.Student}  handleRollNo = {this.OnChangeStudentRollNoHandler} handlePassword = {this.OnChangeStudentPasswordHandler} LoginSubmit = {this.OnStudentLoginSubmit}/>}/>
                  }
                  {
                      this.state.activeItem === 'Teacher Login' &&  <Route path = "/" exact render = { (Routprops) => <TeacherLogin {...Routprops}  InputTeacher ={this.state.Teacher} handleRollNo = {this.OnChangeTeacherRollNoHandler} handlePassword = {this.OnChangeTeacherPasswordHandler} LoginSubmit = {this.OnTeacherLoginSubmit} />}/> 
                  }
                </Segment>
                </Grid.Column>
            </Grid>
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

export default connect(mapStateToProps,mapDispatchToProps)(Layout);