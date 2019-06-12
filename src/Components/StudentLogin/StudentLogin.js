import React from 'react'
import {Link}from 'react-router-dom'
import { Input } from 'semantic-ui-react'
const StudentLogin = (props) => {

   
    return (
         <div>
           <br/>
         <strong>Student Login</strong>
         <br/>
         <label htmlFor = 'Studentrollno'>RollNo</label>
         <Input id = 'Studentrollno' type ='text' name = 'rollno' value = {props.InputStudent.roll} onChange = {props.handleRollNo} ></Input>
         <br/>
         <label htmlFor = 'Studentpassword'>Password</label>
         <Input id = 'Studentpassword' type ='password' name = 'password' value = {props.InputStudent.password} onChange = {props.handlePassword}></Input>
         <br/>
            <Link onClick = {props.LoginSubmit}  to={'/StudentPage/' + props.InputStudent.roll} >Submit</Link>
         </div>
         
        
         
       
    )
}

export default StudentLogin
