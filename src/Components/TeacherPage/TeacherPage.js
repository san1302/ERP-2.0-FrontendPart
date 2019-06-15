import React,{Component} from 'react'
import Aux from '../HigherOrderComp/Auxilary'
import {connect} from 'react-redux';
import TeacherLayoutPage from '../Layout/teacherPageLayout';
import {Route,Switch}from 'react-router-dom';
import Axios from 'axios';


class  TeacherPage extends Component {
 
    


    render (){
        return(
              <Aux> 
                 <Switch>
                     <Route path = {this.props.location.pathname} exact render = { (Routprops) => <TeacherLayoutPage {...Routprops} />}/>    
                 </Switch>
                 
                 
              </Aux>

        )                                  //abhi ismein page reload ke samay roll null ho jata hai and koi bhi ye page access kr sakta hai.
    }     
    
}

    const mapStateToProps = state => {
        return {
            teacherInfo: state.teacherInfo
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            SetTeacherInfo: (teacherInfoFromDataBase) => dispatch({type: 'SetTeacherInfo',TeacherInfo: teacherInfoFromDataBase })
        };
    };

export default connect(mapStateToProps,mapDispatchToProps)(TeacherPage);
