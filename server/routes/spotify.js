var express = require('express')
var router = express.Router();
var spotify = require('../models/spotify')
var qs = require('qs');
const { json } = require('express');
const axios = require('axios').default;
router.get('/', async (req,res)=> {
    try {
        const Users = await spotify.find();
        res.json(Users);  
    } catch (error) {
        res.json({message: error})
    }
})
router.get('/:Name',async(req,res)=> {
        const User = await  spotify.find({Name: req.params.Name});
        console.log()
        var data = qs.stringify({
            'grant_type': 'refresh_token',
            'refresh_token': User[0].Token
           });
           var config = {
             method: 'post',
             url: 'https://accounts.spotify.com/api/token',
             headers: { 
               'Authorization': 'Basic MYtoken' 
               'Content-Type': 'application/x-www-form-urlencoded', 
               'Cookie': '__Host-device_id=AQBsKDZPB62q7ocXGd2t9-OSEDYhrFhi86QepbtGf3PXkYMd5Y2qn-Q2Gnmedy2CzLROwkzeR68ZW1bxil6K6CSXNg_Q6Fw3fIU'
             },
             data : data
           };
          axios(config)
.then(function (response) {
  var config = {
    method: 'get',
    url: 'https://api.spotify.com/v1/me/player/currently-playing?market=TR',
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${response.data.access_token} `
    }
  };
  
  axios(config)
  .then(function (resp) {
   res.json(resp.data);
  })
  .catch(function (err) {
    console.log(err);
  });
})

.catch(function (error) {
  console.log(error);
}); 
  
})
router.post('/',  async(req,res) => {
  var data = qs.stringify({
    'grant_type': 'authorization_code',
   'code': req.body.Token,
   'redirect_uri': 'https://spotibot-client.herokuapp.com/login',
   'client_id': 'client_id',
   'client_secret': 'client_secret' 
   });
   var config = {
     method: 'post',
     url: 'https://accounts.spotify.com/api/token',
     headers: { 
       'Content-Type': 'application/x-www-form-urlencoded', 
       'Cookie': '__Host-device_id=AQBsKDZPB62q7ocXGd2t9-OSEDYhrFhi86QepbtGf3PXkYMd5Y2qn-Q2Gnmedy2CzLROwkzeR68ZW1bxil6K6CSXNg_Q6Fw3fIU'
     },
     data : data
   };
   
   axios(config)
   .then( async(response) =>{
    const spot = new spotify({
 
      Name: req.body.Name,
      Token: response.data.refresh_token,
  });
  try {
   const savedSpot = await  spot.save();
   res.json(savedSpot);
  } catch (error) {
      res.json({message: 'error'})
  }
   })
   .catch(function (error) {
     res.json({message: error})
   });
   
  
 } )
 router.get('/delete/:Name', async(req,res)=> {
    spotify.deleteOne({Name: req.params.Name}, (err)=>{
      if(!err){
        res.json({success:true})
      }
      else{
        res.json({success:false, err})
      }
    })

 })


module.exports = router;