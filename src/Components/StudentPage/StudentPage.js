import React,{Component} from 'react'

class  StudentPage extends Component {

       componentDidMount()
       {  
        
       }

       componentDidUpdate()
       {

       }
    render (){
          
        let post = <h1>Page Not Found</h1>
        if(this.props.match.params.roll === this.props.roll)
        {
           post = <p><strong>Welcome to StudentPage...
                    Please don't refresh the Page</strong></p>
        }
     
        return post;                                    //abhi ismein page reload ke samay roll null ho jata hai and koi bhi ye page access kr sakta hai.
    }
     
     

    
}

export default StudentPage;
