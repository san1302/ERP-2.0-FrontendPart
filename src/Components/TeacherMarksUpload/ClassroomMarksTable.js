import React, { Component } from "react";
import  ReactTable from "react-table";
import "react-table/react-table.css";
import { Icon, Label, Menu, Table,Input } from 'semantic-ui-react';
import {connect} from 'react-redux';
// Import Hamoni Syncimport Hamoni from "hamoni-sync";
const ClassroomMarksTable = (props) => {
    
    return(
    <Table celled inverted selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width = "4">STUDENT ROLL NUMBER</Table.HeaderCell>
        {
           props.classroomMarksTableInfo.slice(0,1).map(studentDetails => {
                return studentDetails.markSubject.map(marksList => {
                          return (<Table.HeaderCell>{marksList.subject}</Table.HeaderCell>)
                })
               
           })
        }
      </Table.Row>
    </Table.Header>
    <Table.Body>
    
          {
             props.classroomMarksTableInfo.map(StudentDetails => {
                  return ( <Table.Row ><Table.Cell>{StudentDetails.roll}</Table.Cell>{StudentDetails.markSubject.map(marksList =>{
                    return (<Table.Cell ><Input style = {{width : "80px"}} placeholder = 'x'  id = 'n' value = {marksList.mark} type ='number' name = 'n'  ></Input></Table.Cell>)
                  })}</Table.Row>)
             })
          }
      {/*  <Table.Cell ><Input style = {{width : "80px"}} placeholder = 'x' id = 'n' value = {0} type ='number' name = 'n'  ></Input></Table.Cell> */}
    </Table.Body>
    </Table>
    )
   
}

const mapStateToProps = state => {
  return {
    marksList: state.studentMarks,
    classroom: state.classroom,
    classroomMarksTableInfo: state.classroomMarksTable
  }
}
export default connect(mapStateToProps)(ClassroomMarksTable);