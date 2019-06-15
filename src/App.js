
import React,{Component} from 'react';
import Layout from './Components/Layout/Layout';
import ErpBuilder from './Containers/ERPbuilder/erpBuilder'
import {BrowserRouter} from 'react-router-dom'
import axios from 'axios'
class App extends Component {
  render(){

    return(
      <BrowserRouter>
        <Layout>
          <ErpBuilder >

          </ErpBuilder>
        </Layout>
      </BrowserRouter>
       
    )  

  }
}

export default App;
