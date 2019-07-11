import React, { Component } from "react";
import  ReactTable from "react-table";
import "react-table/react-table.css";
import { Icon, Label, Menu, Table,Input,Button } from 'semantic-ui-react';
import {connect} from 'react-redux';
// Import Hamoni Syncimport Hamoni from "hamoni-sync";
const ClassroomMarksTable = (props) => {
    
    return(
     <Table celled inverted selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width = "4">STUDENT ROLL NUMBER</Table.HeaderCell>
        {
           props.classroomMarksTableState.slice(0,1).map(studentDetails => {
                return studentDetails.markSubject.map(marksList => {
                          return (<Table.HeaderCell>{marksList.subject}</Table.HeaderCell>)
                })
               
           })
        }
      </Table.Row>
    </Table.Header>
    <Table.Body>
          {
             props.classroomMarksTableState.map((StudentDetails,i) => {
                  return ( <Table.Row ><Table.Cell>{StudentDetails.roll}</Table.Cell>{StudentDetails.markSubject.map((marksList,j) =>{
                    return (<Table.Cell ><Input style = {{width : "80px"}} placeholder = '0'  id = {i} value = {marksList.mark} type ='number' name = {j} onChange = {props.handleChange}  ></Input></Table.Cell>)
                  })}</Table.Row>)
             })
          } 
    </Table.Body>
    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan='4'>
          <Button onClick ={props.UpdateClassroomTable} floated='right' icon labelPosition='left' primary size='medium'>
            <Icon name = 'arrow circle right'size = 'large' /> UPDATE MARKS
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
                 SetClassroomMarksTable : (ClassroomMarksTableFromDataBase) => dispatch({type:'SetClassroomMarksTable',ClassroomMarksTableInfo :ClassroomMarksTableFromDataBase})
         };
};

export default connect(mapStateToProps,mapDispatchToProps)(ClassroomMarksTable);