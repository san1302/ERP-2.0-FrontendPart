import React from 'react'
import {Link}from 'react-router-dom'
const TeacherLogin = (props) => {

   
    return (
        
        <div>
           <br/>
         <strong>Teacher Login</strong>
         <br/>
         <label htmlFor = 'Teacherrollno'>RollNo</label>
         <input id = 'Teacherrollno' type ='text' name = 'rollno' value = {props.InputTeacher.roll} onChange = {props.handleRollNo} ></input>
         <br/>
         <label htmlFor = 'Teacherpassword'>Password</label>
         <input id = 'Teacherpassword' type ='password' name = 'password' value = {props.InputTeacher.password} onChange = {props.handlePassword}></input>
         <br/>
          <Link to={'/TeacherPage/' + props.InputTeacher.roll}>Submit</Link>
        </div>
         
        
    )
}

export default TeacherLogin;
