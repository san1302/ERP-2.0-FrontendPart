import React, { Component } from "react";
import  ReactTable from "react-table";
import "react-table/react-table.css";
import { Icon, Label, Menu, Table,Input,Button,Radio,List } from 'semantic-ui-react';
import {connect} from 'react-redux';
// Import Hamoni Syncimport Hamoni from "hamoni-sync";
const ClassroomAttendanceTable = (props) => {
    
    return(
    <Table celled inverted selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width = "4">STUDENT ROLL NUMBER</Table.HeaderCell>
       {/*  {
           props.classroomAttendanceTableState.slice(0,1).map(studentDetails => {
                return studentDetails.markSubject.map(marksList => {
                          return (<Table.HeaderCell>{marksList.subject}</Table.HeaderCell>)
                })
               
           })
        } */}
        <Table.HeaderCell>{props.InputTeacherClassroom.subject}</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
          {
             props.classroomAttendanceTableState.map((StudentDetails,i) => {
                  return ( <Table.Row ><Table.Cell>{StudentDetails.roll}</Table.Cell><Table.Cell><List><List.Item><Label circular color= 'green'>PRESENT</Label> <Input type = 'radio' size = "big" name={i.toString()} value= 'present' checked = {StudentDetails.presentORabsent === 'present'} onChange={(event) => props.handleChange(i,event)}/></List.Item><List.Item><Label circular color= 'red'>ABSENT</Label>{'        '}<Input type = 'radio' size = "big" name={i.toString()}  value='absent' checked = {StudentDetails.presentORabsent === 'absent'} onChange={(event) => props.handleChange(i,event)}/></List.Item></List></Table.Cell></Table.Row>)
             })
          } 
    </Table.Body>
    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan='4'>
          <Button onClick ={props.UpdateClassroomTable} floated='right' icon labelPosition='left' primary size='medium'>
            <Icon name = 'arrow circle right'size = 'large' /> UPDATE ATTENDANCE
          </Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
    </Table>
    )
   
}

const mapStateToProps = state => {
  return {
    marksList: state.studentMarks,
    classroom: state.classroom
  }
}
const mapDispatchToProps = dispatch => {
         return{
                // SetClassroomMarksTable : (ClassroomMarksTableFromDataBase) => dispatch({type:'SetClassroomMarksTable',ClassroomMarksTableInfo :ClassroomMarksTableFromDataBase})
         };
};

export default connect(mapStateToProps,mapDispatchToProps)(ClassroomAttendanceTable);