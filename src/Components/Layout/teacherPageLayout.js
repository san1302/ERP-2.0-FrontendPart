import React from 'react'
import Aux from '../HigherOrderComp/Auxilary'
import {Link}from 'react-router-dom'
const TeacherPageLayout = (props) =>  {
    return (
       
          <Link onClick = {props.TeachergetStudentsList} to = { props.location.pathname + '/TeacherMarksUpload'}>UploadMarks</Link>
    );
}

export default TeacherPageLayout