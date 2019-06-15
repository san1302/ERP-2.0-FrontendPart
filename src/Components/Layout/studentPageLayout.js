import React from 'react'
import Aux from '../HigherOrderComp/Auxilary'
import {Link}from 'react-router-dom'
const StudentPageLayout = (props) =>  {
    return (
       
          <Link onClick = {props.StudentMarks} to = { props.location.pathname + '/StudentMarks'}>Marks</Link>
    );
}

export default StudentPageLayout
