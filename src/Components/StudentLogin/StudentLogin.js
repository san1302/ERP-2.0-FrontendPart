import React from 'react'
import {Link}from 'react-router-dom'
import {Input,Label,Form,Checkbox,Button} from 'semantic-ui-react'
const StudentLogin = (props) => {
    return (
            
              <Form>
                <Form.Field>
                  <Label as ='a' color = 'black' size = 'large' ribbon htmlFor = 'Studentrollno'>RollNo</Label>
                  <Input fluid style = {{width : "200px"}} placeholder = 'be/10001/15' id = 'Studentrollno' type ='text' name = 'rollno' value = {props.InputStudent.roll} onChange = {props.handleRollNo} ></Input>
                </Form.Field>
                <Form.Field>
                  <Label as ='a' color = 'black' size = 'large' ribbon htmlFor = 'Studentpassword'>Password</Label>
                  <Input fluid style = {{width : "300px"}} placeholder = 'Password' id = 'Studentpassword' type ='password' name = 'password' value = {props.InputStudent.password} onChange = {props.handlePassword}></Input>
                </Form.Field>
                <Form.Field>
                  <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
                <Button as = {Link} onClick = {props.LoginSubmit} to = {'/StudentPage/' + props.InputStudent.roll}>Submit</Button>
              </Form>
    )
}



export default StudentLogin
