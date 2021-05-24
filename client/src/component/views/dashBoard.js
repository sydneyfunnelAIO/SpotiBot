import React, { useEffect, useState } from "react";
import {config} from '../../config/config'
import {useParams} from 'react-router-dom'
import Axios from "axios";
export default function HomePage(props) {
  const [Name, setName] = useState("");
  const [Song, setSong] = useState({});
  const { data } = useParams();
 useEffect(() => {
  
  if (data) {
    console.log(data);
    setName(data);
  }
   if(Name){
    Axios.get(`${config.apiUrl}/spotify/${Name}`).then((resp)=>{
    if(resp.data=== ''){
      console.log('error')
    }else{
      console.log(resp)
      setSong(resp)
    }

    })
    const interval = setInterval(() => {
    
      Axios.get(`${config.apiUrl}/spotify/${Name}`).then((resp)=>{
        if( resp.data === ''){
          console.log('error2')
        }else{
          console.log(resp)
          setSong(resp)
        }
       
  
      })
    }, 1000);
    return () => clearInterval(interval);
    }
    else{
    
    }
  
 
 }, [Name])
const render = (artists)=> {
  var vals=[];
for(var item of artists){
   vals.push(item.name); 
}
return(vals.join(' & '))

}
  return (
    <div className='App' >
      {
        <div className='Home-Logged' >
          <h1>{Name.toUpperCase()}</h1>
          <img width='250' src={(Song.data === undefined ? 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png' : Song.data.item.album.images[0].url)} />
          <h2 className='Logged-H2'>{ (Song.data === undefined ? 'There is No Currently Playing' : Song.data.item.name)}</h2>
          <h3>{
             
          (Song.data === undefined ? 'No One' : render(Song.data.item.artists) )}
           </h3>
        </div>
      }
    </div>
  );
}
