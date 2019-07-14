import React from 'react'
import { Icon, Label, Menu, Table , Button, Form, Segment,Input,Checkbox } from 'semantic-ui-react';
import {Link,Route}from 'react-router-dom'
import {connect} from 'react-redux'
import ClassroomMarksTable from './ClassroomMarksTable'

 

const TeacherMarksUpload = (props) => {
   
   
   
  // console.log(Marks)


  // return (<div><h1><button onCLick={()=>console.log('clicked')}>Click Me</button></h1></div>)
    return (
      <main >
    
    <Segment.Group>
    <Segment inverted tertiary color ='blue'>
    <Form inverted>
      <Form.Group widths='equal'>
        <Form.Input fluid list='branches' name = "branch" type = "text" label = 'branch' value = {props.InputTeacherClassroom.branch} placeholder='Choose the branch which you want to access' onChange={props.handleTeacherData}/>
        <datalist id='branches'>
        <option value='information technology' />
        <option value='Computer Science' />
        <option value='Electronics & Communication' />
        </datalist>
       <Form.Input fluid list='semester' name = "semester" type="number" label = 'semester' value = {props.InputTeacherClassroom.semester} placeholder='Choose the semester which you want to access' onChange={props.handleTeacherData} />
        <datalist id='semester'>
        <option value='1'/>
        <option value='2' />
        <option value='3' />
        <option value='4' />
        <option value='5' />
        <option value='6' />
        </datalist>
        
      </Form.Group>
        <Form.Checkbox label='I agree to the Terms and Conditions' />
       <Button inverted color = 'black' as = {Link} onClick ={props.TeachergetStudentsListForMarks} to = {props.match.url + '/StudentMarksTable'}>Submit</Button>
    </Form>
   </Segment>
    <Route path = "/TeacherPage/:roll/TeacherMarksUpload/StudentMarksTable" exact render = { (Routprops) => <ClassroomMarksTable {...Routprops} classroomMarksTableState = {props.classroomMarksTableState} handleChange ={props.handleChange} UpdateClassroomTable = {props.UpdateClassroomTable}/>}/> 
    </Segment.Group>
   </main>
     
      
    )

}

const mapStateToProps = state => {
    return{
           teacherInfo: state.teacherInfo
    }
}

const mapDispatchToProps = dispatch => {
         return{
                 SetTeacherInfo : (teacherInfoFromDataBase) => dispatch({type: 'SetTeacherInfo',teacherInfo: teacherInfoFromDataBase})
         };
}

export default connect(mapStateToProps,mapDispatchToProps)(TeacherMarksUpload);