import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import {config} from '../../config/config'
import Axios from "axios";
const cookies = new Cookies();
const clientId = "0bb15ea49d5b49878287d3683a5e6cdc";
const redirectUri = "https://spotibot-client.herokuapp.com/login";
const scopes = ["user-read-currently-playing", "user-read-playback-state"];
const authEndpoint = "https://accounts.spotify.com/authorize";
export default function HomePage(props) {
  const [Name, setName] = useState("");
  const [Song, setSong] = useState({});
 useEffect(() => {
  const data = cookies.get("test");
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


const onLogOut = ()=>{
  Axios.get(`${config.apiUrl}/spotify/delete/${Name}`)
     cookies.remove('test')
     setName('')
     props.history.push('/')

}
const render = (artists)=> {
  var vals=[];
for(var item of artists){
   vals.push(item.name); 
}
return(vals.join(' & '))

}
  return (
    <div className='App' >
      {cookies.get("test") ? (
        <div className='Home-Logged' >
          <h1>{Name.toUpperCase()}</h1>
          <img width='250' src={(Song.data === undefined ? 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png' : Song.data.item.album.images[0].url)} />
          <h2 className='Logged-H2'>{ (Song.data === undefined ? 'There is No Currently Playing' : Song.data.item.name)}</h2>
          <h3>{
             
          (Song.data === undefined ? 'No One' : render(Song.data.item.artists) )}
           </h3>
          <button  className='button' onClick={onLogOut} >Log out</button>
        </div>
      ) : (
        <div className='Home-NotLogged' >
           <span> 
  <i class="fab fa-spotify fa_with_bg fa-10x "></i>
</span>
          <h1>SpotiBot</h1>
          <a
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
              "%20"
            )}&response_type=code&show_dialog=true`}
          >
            Login via spotify
          </a>
        </div>
      )}
    </div>
  );
}
