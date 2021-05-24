
import React, {useState, useEffect} from 'react'
import {config} from '../../config/config'
import Cookies from 'universal-cookie';
import Axios from "axios";
import {Form, Button} from 'antd'

const cookies = new Cookies();
export default function LoginPage(props) {
    const [Name, setName] = useState("");
    const params = new URLSearchParams(props.location.search);
    const code = params.get("code");
   const onName = (event)=> {
      setName(event.currentTarget.value);
   }
  
    const onSubmit = async() => {
       if(Name=== ''){
           return  alert('Please fill Your Name')
       }else {
          
          await Axios.post(`${config.apiUrl}/spotify`, {Name: Name, Token: code }).then((resp)=> {
             console.log(resp.data.message)
            if(resp.data.message=='error'){
               alert('This Name Already Exists')
               
            }
            else{
               cookies.set('test', Name, { path: '/' })
               props.history.push('/')
            }
          })
        

       
       }
    }

   
    return (
      <div className='Login' >
     <Form onSubmit={onSubmit}>

     <span> 
  <i class="fab fa-spotify fa_with_bg fa-10x "></i>
</span>
        <h2>SpotiBot</h2>
        <input onChange={onName} placeholder='Name of your twitch channel' color='whitesmoke' required  value={Name} />
        <br />
        <br />
        <Button className='button' onClick={onSubmit} >
           Submitd
        </Button>
      </Form>
      </div>
    );
}




