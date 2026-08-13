const express = require('express');

const app = express();



app.use( "/test" , (req , res)=>{

    console.log(res);

    res.send("Hello from express");



    // res.send(JSON.stringify(res));

});


app.use("/test2" , (req , res)=>{
    res.send("Hello from express 2");

    req.body = {
        name:"john"
    }

    console.log(req);
    
});


app.use("/test3" , (req, res)=>{
     res.send("Hello from express 3");
})


app.listen(5555 , (req , res)=>{
    console.log("Server is running on port 5555");
})

// console.log(app);

// console.log(express);