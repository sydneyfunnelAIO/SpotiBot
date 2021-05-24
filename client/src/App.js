import React from 'react';
import { Route, Switch} from "react-router-dom";
import homePage from './component/views/HomePage'
import loginPage from './component/views/LoginPage'
import dashBoard from './component/views/dashBoard'
import './App.css'
function App() {
  return (
    <div>
      <div  className='Main' > <Switch>
          <Route exact path="/" component={homePage} />
          <Route exact path="/login" component={loginPage} />
          <Route exact path="/:data" component={dashBoard} />
          
        </Switch></div>
     
    <div className='footer' >
        <p>Created By <a href='https://twitch.tv/sydneyfunnelaio' >SydneyFunnel</a></p>
      </div >
    </div>  
  );
}

export default App;
