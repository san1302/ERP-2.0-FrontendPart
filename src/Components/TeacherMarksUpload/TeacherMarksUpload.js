import React from 'react'
import { Icon, Label, Menu, Table , Button, Form, Segment,Input } from 'semantic-ui-react';
import {Link}from 'react-router-dom'
import {connect} from 'react-redux'

/* const colors = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
  'black',
] */



const color = 'teal'
const TeacherMarksUpload = (props) => {
   
  // console.log(Marks)

    return (
           <Segment inverted>
    <Form inverted>
      <Form.Group widths='equal'>
        <Form.Input fluid list='branches' type = "text" label = 'branch' placeholder='Choose the branch which you want to access' />
        <datalist id='branches'>
        <option value='Information Technology' />
        <option value='Computer Science' />
        <option value='Electronics & Communication' />
        </datalist>
       <Form.Input fluid list='semester' type="number" label = 'semester' placeholder='Choose the semester which you want to access' />
        <datalist id='semester'>
        <option value= '1'/>
        <option value='2'/>
        <option value='3' />
        <option value='4' />
        <option value='5' />
        <option value='6' />
        </datalist>
      </Form.Group>
      <Form.Checkbox label='I agree to the Terms and Conditions' />
       <Button as = {Link} onClick ={props.TeachergetStudentsList()} to = {''}>Submit</Button>
    </Form>
   </Segment>

     )

}

const mapStateToProps = state => {
    return{
           teacherInfo: state.teacherInfo
    }
}

const mapDispatchToProps = dispatch => {
         return{
                 SetTeacherInfo : (teacherInfoFromDataBase) => dispatch({type: 'SetTeacherInfo',teacherInfo: teacherInfoFromDataBase})
         };
}

export default connect(mapStateToProps,mapDispatchToProps)(TeacherMarksUpload);