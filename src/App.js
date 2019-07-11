
import React,{Component} from 'react';
import Layout from './Components/Layout/Layout';
import ErpBuilder from './Containers/ERPbuilder/erpBuilder'
import {BrowserRouter} from 'react-router-dom'
import axios from 'axios'
import classes from './App.css'
import {connect} from 'react-redux';
import {Route,Switch}from 'react-router-dom'
class App extends Component {


 async componentWillMount(){
      
       console.log('hey from app');
      const token = localStorage.getItem('token');
     // console.log(token);
      const expiryDate = localStorage.getItem('expiryDate');
      if (!token || !expiryDate) {
        return;
      }
      if (new Date(expiryDate) <= new Date()) {
         localStorage.removeItem('token');
         localStorage.removeItem('expiryDate');
         localStorage.removeItem('userId');
        return;
      }
      const userId = localStorage.getItem('userId');
      const remainingMilliseconds =
        new Date(expiryDate).getTime() - new Date().getTime();
    
         setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('expiryDate'); // this.setAutoLogout(remainingMilliseconds);
            localStorage.removeItem('userId');
         }, remainingMilliseconds);
      /* this.setState({
        isAuth: true,
        token: token,
        userId: userId
      }); */
      let tokenInfo = {
           isAuth: true,
           token: token,
           userId: userId
      }
     // console.log(token);
      await this.props.SetTokenInfo(tokenInfo)
     // console.log(this.props.authAndTokenInfo.token);
  }
  render(){

    return(
      
      <BrowserRouter>
      
       <Route path = {'/'} exact render = { (Routprops) => <Layout {...Routprops} />}/>
        
        <ErpBuilder >
        </ErpBuilder>
      </BrowserRouter>   
  
    )  

  }
}

const mapStateToProps = state => {
    return{
           authAndTokenInfo : state.token, 
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
                 SetTokenInfo : (tokenInfo) => dispatch({type: 'SetTokenInfo',TokenInfo: tokenInfo})
         };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
