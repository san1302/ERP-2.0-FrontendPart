import React from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import {connect} from 'react-redux'

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

const color = 'black'





const StudentAttendance = (props) => {
   
  // console.log(Attendance)

    return (
      <main>
      
      <Table color={color} key={color} inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>SUBJECTS</Table.HeaderCell>
            <Table.HeaderCell>PRESENT</Table.HeaderCell>
            <Table.HeaderCell>TOTAL CLASSES</Table.HeaderCell>
            <Table.HeaderCell>ATTENDANCE</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
           {props.attendanceList.map(attendanceObject => {   
                 return  (<Table.Row key = {attendanceObject.subject}><Table.Cell>{attendanceObject.subject}</Table.Cell><Table.Cell>{attendanceObject.classesPresent}</Table.Cell><Table.Cell>{attendanceObject.totalClasses}</Table.Cell><Table.Cell>{attendanceObject.attendance}</Table.Cell></Table.Row>)
             })}
        </Table.Body>
      </Table>
    
  </main>

     )

}

const mapStateToProps = state => {
    return{
           studentInfo: state.studentInfo,
           attendanceList : state.studentAttendance
    }
}

const mapDispatchToProps = dispatch => {
         return{
                 SetStudentInfo : (studentInfoFromDataBase) => dispatch({type: 'SetStudentInfo',studentInfo: studentInfoFromDataBase})
         };
};


export default connect(mapStateToProps,mapDispatchToProps)(StudentAttendance);
