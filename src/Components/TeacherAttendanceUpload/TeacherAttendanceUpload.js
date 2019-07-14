import React from 'react'
import { Icon, Label, Menu, Table , Button, Form, Segment,Input } from 'semantic-ui-react';
import {Link,Route}from 'react-router-dom'
import {connect} from 'react-redux'
import ClassroomAttendanceTable from './ClassroomAttendanceTable'

/* const colors = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
  'black',
] */


const color = 'teal'
const TeacherAttendanceUpload = (props) => {
   
   
   
  // console.log(Attendance)

    return (
      <div>
    
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
        <option value= '1'/>
        <option value='2' />
        <option value='3' />
        <option value='4' />
        <option value='5' />
        <option value='6' />
        </datalist>
       <Form.Input fluid list='subject' name = "subject" type="text" label = 'subject' value = {props.InputTeacherClassroom.subject} placeholder='Choose the subject which you want to access' onChange={props.handleTeacherData} />
        <datalist id='subject'>
        {props.classroomInfo.subjects.map(subject => {
            return <option value= {subject}/>
        })}
        </datalist>
      </Form.Group>
      <Form.Checkbox label='I agree to the Terms and Conditions' />
       <Button inverted color = 'black' as = {Link} onClick ={props.TeachergetStudentsListForAttendance} to = {props.match.url + '/StudentAttendanceTable'}>Submit</Button>
    </Form>
   </Segment>
     <Route path = "/TeacherPage/:roll/TeacherAttendanceUpload/StudentAttendanceTable" exact  render = { (Routprops) => <ClassroomAttendanceTable {...Routprops} classroomAttendanceTableState = {props.classroomAttendanceTableState} handleChange ={props.handleChange} UpdateClassroomTable = {props.UpdateClassroomTable} InputTeacherClassroom={props.InputTeacherClassroom}/>}/>
  </Segment.Group>
   </div>

     
      
    )

}

const mapStateToProps = state => {
    return{
           teacherInfo: state.teacherInfo,
           classroomInfo : state.classroom
    }
}

const mapDispatchToProps = dispatch => {
         return{
                 SetTeacherInfo : (teacherInfoFromDataBase) => dispatch({type: 'SetTeacherInfo',teacherInfo: teacherInfoFromDataBase})
         };
}

export default connect(mapStateToProps,mapDispatchToProps)(TeacherAttendanceUpload);