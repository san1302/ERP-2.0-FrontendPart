import React from 'react'
import classes from './background.css'
import Aux from '../HigherOrderComp/Auxilary'
import {Header,Image, Segment} from 'semantic-ui-react'
import {Link}from 'react-router-dom';
import logo from './images/logo3.png'

const Layout = (props) => {

    return(
        <Aux>
          <Segment className = {classes.toolbar} raised color = 'teal'>
            <nav className = {classes.toolbar_navigation}>
                <div className = {classes.toolbar_logo}><Link><Image  src = {logo} size = 'small' wrapped ></Image> </Link></div>
                <div className = {classes.spacer}/>
                <div className = {classes.toolbar_navigation_items}>
                    <ul>
                        <li><Link >Logout</Link></li>
                    </ul>
                </div>
             </nav>
              
          </Segment>
          <main style = {{marginTop :'60px'}} >
             {props.children}
          </main> 
        </Aux>
        
    );
    
}

export default Layout;