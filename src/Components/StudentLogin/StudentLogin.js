import React from 'react'
import {Link}from 'react-router-dom'
import {Input,Label,Form,Checkbox,Button} from 'semantic-ui-react'
const StudentLogin = (props) => {
    return (
            
              <Form>
                <Form.Field >
                  <Label as ='a' color = 'blue' size = 'large' ribbon htmlFor = 'Studentrollno'>ROLL NO</Label>
                  <Input fluid style = {{width : "200px",marginTop : '3px'}} placeholder = 'be1000115' id = 'Studentrollno' type ='text' name = 'rollno' value = {props.InputStudent.roll} onChange = {props.handleRollNo} ></Input>
                </Form.Field>
                <Form.Field>
                  <Label as ='a' color = 'blue' size = 'large' ribbon htmlFor = 'Studentpassword'>PASSWORD</Label>
                  <Input fluid style = {{width : "300px",marginTop : '3px'}} placeholder = 'Password' id = 'Studentpassword' type ='password' name = 'password' value = {props.InputStudent.password} onChange = {props.handlePassword}></Input>
                </Form.Field>
                <Form.Field>
                  <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
                <Button as = {Link} onClick = {props.LoginSubmit} to = {'/StudentPage/' + props.InputStudent.roll} icon = 'right arrow' labelPosition='right' content = 'SUBMIT'/>
              </Form>
    )
}



export default StudentLogin
