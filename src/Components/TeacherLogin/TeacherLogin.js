import React from 'react'
import {Link}from 'react-router-dom'
import {Input,Label,Form,Checkbox,Button,Icon} from 'semantic-ui-react'
const TeacherLogin = (props) => {

   
    return (
        
         <Form>
                <Form.Field>
                  <Label as ='a' color = 'blue' size = 'large' ribbon htmlFor = 'Teacherrollno'>ROLL NO</Label>
                  <Input fluid style = {{width : "200px",marginTop : '3px'}} placeholder = 'tea1000115' id = 'Teacherrollno' type ='text' name = 'rollno' value = {props.InputTeacher.roll} onChange = {props.handleRollNo} ></Input>
                </Form.Field>
                <Form.Field>
                  <Label as ='a' color = 'blue' size = 'large' ribbon htmlFor = 'Teacherpassword'>PASSWORD</Label>
                  <Input fluid style = {{width : "300px",marginTop : '3px'}} placeholder = 'Password' id = 'Teacherpassword' type ='password' name = 'password' value = {props.InputTeacher.password} onChange = {props.handlePassword}></Input>
                </Form.Field>
                <Form.Field>
                  <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
                <Button as = {Link} onClick ={props.LoginSubmit} to = {'/TeacherPage/' + props.InputTeacher.roll} icon = 'right arrow' labelPosition='right' content = 'SUBMIT' />
         </Form>
         
        
    )
}

export default TeacherLogin;
