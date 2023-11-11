const express = require('express');

const app = express();

//registerViewEngine
app.set("view engine", "ejs");

app.listen(3000); //listening to request 

app.get('/',(req,res)=>{
    // res.send("<p>HELLO HARSH</p>");
    res.sendFile('./views/indexP.html',{root: __dirname});
});
app.get('/about',(req,res)=>{
    // res.send("<p>About HARSH</p>");
    res.sendFile('./views/aboutP.html',{root: __dirname});
});
// redirect
app.get('/about-us',(req,res)=>{
    // res.send("<p>About HARSH</p>");
    res.redirect('/about');
});
/* 404 page */
app.use((req ,res) => {
    res.status(404).sendFile('./views/404P.html',{root: __dirname});
});