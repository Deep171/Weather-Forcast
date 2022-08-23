const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-Parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html")
});

app.post("/",function(req,res){
    const query = req.body.Cityname;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=f15afed779b6e88f2ac419033f02c323&units=metric";

    https.get(url,function(response){
      console.log(response.statuscode);
      response.on("data",function(data){
        const weatherData = JSON.parse(data);
         const temperature = weatherData.main.temp_min;
         res.write("<h1>temperature in "+ query + " is "+ temperature +" degree celcius.</h1>");
         res.send();

      })
    })
})

// app.get("/",function(req,res){

//   res.send("server is up and running");
// })

app.listen(3000,function(){
  console.log("Server is running at port 3k");
})
