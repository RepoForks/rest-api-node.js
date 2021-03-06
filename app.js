const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const app = express() ;

//Connecting mongoDB
mongoose.Promise = global.Promise ;
mongoose.connect('mongodb://piashsarker:piash12345@ds249415.mlab.com:49415/ninja_rest_api',{
  useMongoClient : true
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
//initialize routes
app.use('/api',routes);
// error handling middleware
app.use(function(err, req , res , next){
  console.log(err);
  res.status(422).send({error: err.message});
})



//PORT & Listen for request
//listen to port
app.listen(process.env.PORT || 4545);
console.log("PORT: "+ (process.env.PORT || 4545));
