import React from 'react'
import {Link}from 'react-router-dom'
import {Input,Label,Form,Checkbox,Button} from 'semantic-ui-react'
const TeacherLogin = (props) => {

   
    return (
        
         <Form>
                <Form.Field>
                  <Label as ='a' color = 'black' size = 'large' ribbon htmlFor = 'Teacherrollno'>RollNo</Label>
                  <Input fluid style = {{width : "200px"}} placeholder = 'be1000115' id = 'Teacherrollno' type ='text' name = 'rollno' value = {props.InputTeacher.roll} onChange = {props.handleRollNo} ></Input>
                </Form.Field>
                <Form.Field>
                  <Label as ='a' color = 'black' size = 'large' ribbon htmlFor = 'Teacherpassword'>Password</Label>
                  <Input fluid style = {{width : "300px"}} placeholder = 'Password' id = 'Teacherpassword' type ='password' name = 'password' value = {props.InputTeacher.password} onChange = {props.handlePassword}></Input>
                </Form.Field>
                <Form.Field>
                  <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
                <Button as = {Link} onClick ={props.LoginSubmit} to = {'/TeacherPage/' + props.InputTeacher.roll}>Submit</Button>
           </Form>
         
        
    )
}

export default TeacherLogin;
