import React from 'react'
import {Link}from 'react-router-dom'
const StudentLogin = (props) => {

   
    return (
         <div>
           <br/>
         <strong>Student Login</strong>
         <br/>
         <label htmlFor = 'Studentrollno'>RollNo</label>
         <input id = 'Studentrollno' type ='text' name = 'rollno' value = {props.state.roll} onChange = {props.handleRollNo} ></input>
         <br/>
         <label htmlFor = 'Studentpassword'>Password</label>
         <input id = 'Studentpassword' type ='password' name = 'password' value = {props.state.password} onChange = {props.handlePassword}></input>
         <br/>
            <Link onClick = {props.LoginSubmit}  to={'/StudentPage/' + props.state.roll} >Submit</Link>
         </div>
         
        
         
       
    )
}

export default StudentLogin
