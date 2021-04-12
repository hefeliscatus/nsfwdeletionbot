const express = require('express')
const app = express()
const getStats = require("../bot")

app.get('/',(req, res)=>{
    res.json(getStats())
})

let port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Stats server running.");
})