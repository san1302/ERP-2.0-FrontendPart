import React,{Component} from 'react'
import Aux from '../HigherOrderComp/Auxilary'
import {connect} from 'react-redux';
import StudentLayoutPage from '../Layout/studentPageLayout';
import {Route,Switch}from 'react-router-dom';
import StudentMarks from '../StudentMarks/StudentMarks';
class  StudentPage extends Component {


    render (){
        return(
              <Aux> 
                 <Switch>
                     <Route path = {this.props.location.pathname} exact render = { (Routprops) => <StudentLayoutPage {...Routprops}/>}/>
                     
                 </Switch>
                 
                 
              </Aux>

        )                                  //abhi ismein page reload ke samay roll null ho jata hai and koi bhi ye page access kr sakta hai.
    }     
    
}

    const mapStateToProps = state => {
        return {
            studentInfo: state.studentInfo
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            SetStudentInfo: (studentInfoFromDataBase) => dispatch({type: 'SetStudentInfo',studentInfo: studentInfoFromDataBase })
        };
    };

export default connect(mapStateToProps,mapDispatchToProps)(StudentPage);
