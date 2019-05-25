import React from 'react'
import classes from './background.css'

const Layout = (props) => {

    return(
        <div className = {classes.bg}>
          {props.children}
       </div>
    );
    
}

export default Layout;