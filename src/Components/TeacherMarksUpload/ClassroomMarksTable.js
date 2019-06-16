import React, { Component } from "react";
import  ReactTable from "react-table";
import "react-table/react-table.css";
import { Icon, Label, Menu, Table,Input } from 'semantic-ui-react';
// Import Hamoni Syncimport Hamoni from "hamoni-sync";
const ClassroomMarksTable = (props) => {
    
    return(
    <Table celled inverted selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>STUDENT ROLL NUMBER</Table.HeaderCell>
        <Table.HeaderCell>DBMS</Table.HeaderCell>
           {/* SUBJECTS KI LIST DALO */}
        
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>John</Table.Cell>
        <Table.Cell ><Input style = {{width : "80px"}} placeholder = 'x' id = 'n' value = {0} type ='number' name = 'n'  ></Input></Table.Cell>  {/* LIST OF STUDENT ROLL, HAR SUBJECT KE MARKS */}

        
      </Table.Row>
    </Table.Body>
    </Table>
    )
   
}
export default ClassroomMarksTable;