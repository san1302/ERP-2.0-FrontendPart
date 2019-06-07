import React from 'react'
import classes from './background.css'
import Aux from '../HigherOrderComp/Auxilary'
const Layout = (props) => {

    return(
        <Aux>
           <div className = {classes.bg}>
           <div>TaskBar,scrollbar</div>
               {props.children}
           </div>
        </Aux>
        
    );
    
}

export default Layout;