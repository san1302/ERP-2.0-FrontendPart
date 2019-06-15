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

const color = 'teal'





const StudentMarks = (props) => {
   
  // console.log(Marks)

    return (
      <main>
      
      <Table color={color} key={color} inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>SUBJECTS</Table.HeaderCell>
            <Table.HeaderCell>Marks</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.getStudentMarks()}
        </Table.Body>
      </Table>
    
  </main>

     )

}

const mapStateToProps = state => {
    return{
           studentInfo: state.studentInfo,
           studentMarks : state.studentMarks
    }
}

const mapDispatchToProps = dispatch => {
         return{
                 SetStudentInfo : (studentInfoFromDataBase) => dispatch({type: 'SetStudentInfo',studentInfo: studentInfoFromDataBase})
         };
};


export default connect(mapStateToProps,mapDispatchToProps)(StudentMarks);
