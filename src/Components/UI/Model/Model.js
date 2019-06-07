import React from 'react'
import classes from './Model.css'
import Aux from '../../HigherOrderComp/Auxilary'
import Backdrop from '../Backdrop/Backdrop'
const Model = (props) => ( 
    <Aux>
        <Backdrop show = {props.show} />
        <div className = {classes.Modal}
          style = {{
              transform:props.show ? 'translateY(0)':'translateY(-100vh)',
              opacity: props.show ? '1': '0'
          }}>
                {props.children}
        </div>
    </Aux>
    
   
  )


export default Model;