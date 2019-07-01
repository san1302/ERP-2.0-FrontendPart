import React,{Component} from 'react'
import Aux from '../HigherOrderComp/Auxilary'
import {connect} from 'react-redux';
//import TeacherLayoutPage from '../Layout/teacherPageLayout';
import openSocket from 'socket.io-client';
import {Link}from 'react-router-dom';
import Axios from 'axios';
import { Button, Comment, Form } from 'semantic-ui-react'

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
                 {/* <Switch>
                     <Route path = {this.props.location.pathname} exact render = { (Routprops) => <TeacherLayoutPage {...Routprops} />}/>    
                 </Switch> */}

              <ul>
                    <li>
                    <Link to = { this.props.location.pathname + '/TeacherMarksUpload'}>UploadMarks</Link>
                    </li>

                    <li>
                    <Link to = { this.props.location.pathname + '/TeacherAttendanceUpload'}>Upload Attendence</Link>
                    </li>
                     <li><Link  to = { this.props.location.pathname + '/TeacherMessageBox'}>ChatBox</Link></li>
             </ul>
            
                 
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
