import React from 'react'
import Aux from '../HigherOrderComp/Auxilary'
import {Link}from 'react-router-dom'
const TeacherPageLayout = (props) =>  {
    return (
         
         <ul>
            <li>
            <Link to = { props.location.pathname + '/TeacherMarksUpload'}>UploadMarks</Link>
            </li>

            <li>
            <Link to = { props.location.pathname + '/TeacherAttendanceUpload'}>Upload Attendence</Link>
            </li>
         </ul>
    );
}

export default TeacherPageLayout