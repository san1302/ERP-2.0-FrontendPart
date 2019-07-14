import React,{Component} from 'react'
import Aux from '../HigherOrderComp/Auxilary'
import {connect} from 'react-redux';
//import TeacherLayoutPage from '../Layout/teacherPageLayout';
import openSocket from 'socket.io-client';
import {Link}from 'react-router-dom';
import {Route,Switch}from 'react-router-dom'
import Axios from 'axios';
import classes from './TeacherPage.css';
import TeacherMarksUpload from '../TeacherMarksUpload/TeacherMarksUpload';
import TeacherAttendanceUpload from '../TeacherAttendanceUpload/TeacherAttendanceUpload';
import TeacherMessageBox from '../MessageBox/TeacherMessageBox';
import TeacherHomepageAbout from './TeacherHomepageAbout'
import { Button, Comment, Form ,Icon,Label,List,Divider} from 'semantic-ui-react'

const socket = openSocket('http://localhost:8080');
class  TeacherPage extends Component {
    
      async componentWillMount()
       {
            
         await Axios.post('http://localhost:8080/feed/TeacherInfo',{},{
              headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token')
              }
          })
          .then(res => {
              if(res.status === 201)
              {
                   let resData = res.data;
                   this.props.SetTeacherInfo(resData.post);
              }
          });
         
        // setting up sockets and using them
         
       }



    render (){
        return(
              <Aux> 
                
                <main className = {classes.sidebar}>
                    <List size = 'large'>
                    <List.Item> <Label tag color = 'black' pointing = 'right' size = 'big' as={Link}  to = { '/TeacherPage/' + this.props.teacherInfo.roll  + '/TeacherMessageBox'}><Icon name = 'chat'/>CHATBOX</Label></List.Item>
                    <List.Item> <Label tag color = 'black' pointing = 'right' size ='big' as = {Link}  to = { '/TeacherPage/' + this.props.teacherInfo.roll + '/TeacherMarksUpload'}><Icon name = 'tasks'/>UPLOAD MARKS</Label></List.Item>
                    <List.Item> <Label tag color = 'black' pointing = 'right' size = 'big' as = {Link} to = { '/TeacherPage/' + this.props.teacherInfo.roll +  '/TeacherAttendanceUpload'}><Icon name = 'users'/>UPLOAD ATTENDANCE</Label></List.Item>
                    </List>  
                    <Divider clearing vertical  style = {{marginLeft : '180px',marginTop: '-350px',height:'100px'}}>SELECT</Divider>      
                </main>

           {/*  <main className = {classes.studentData}>
            <Switch>
            
             <Route path = {'/TeacherPage/:roll/TeacherMessageBox'} render = { (Routprops) => <TeacherMessageBox {...Routprops} />}/>
             <Route path = {'/TeacherPage/:roll/TeacherMarksUpload'}  render = { (Routprops) => <TeacherMarksUpload {...Routprops} TeachergetStudentsListForMarks = {this.props.TeachergetStudentsListForMarks}  InputTeacherClassroom = {this.props.state.TeacherClassroom} handleChange = {this.props.OnChangeClassroomMarksHandler} handleTeacherData = {this.props.OnChangeClassroomHandler} classroomMarksTableState ={this.props.state.classroomMarksTableState} UpdateClassroomTable = {this.props.UpdateClassroomTable}/>}/>
             <Route path = {'/TeacherPage/:roll/TeacherAttendanceUpload'}   render = { (Routprops) => <TeacherAttendanceUpload {...Routprops} TeachergetStudentsListForAttendance = {this.props.TeachergetStudentsListForAttendance}  InputTeacherClassroom ={this.props.state.TeacherClassroom} handleChange = {this.props.OnChangeClassroomAttendanceHandler} handleTeacherData = {this.props.OnChangeClassroomHandler} classroomAttendanceTableState ={this.props.state.classroomAttendanceTableState} UpdateClassroomTable = {this.props.UpdateClassroomTableAboutAttendance}/>}/>
            </Switch>
           </main> */}
                 
            </Aux>

        )                                  //abhi ismein page reload ke samay roll null ho jata hai and koi bhi ye page access kr sakta hai.
    }     
    
}

    const mapStateToProps = state => {
        return {
             authAndTokenInfo: state.token,
            teacherInfo: state.teacherInfo
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            SetTeacherInfo: (teacherInfoFromDataBase) => dispatch({type: 'SetTeacherInfo',teacherInfo: teacherInfoFromDataBase })
        };
    };

export default connect(mapStateToProps,mapDispatchToProps)(TeacherPage);
