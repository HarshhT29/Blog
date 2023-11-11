const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const { result } = require('lodash');

const blogRoutes = require('./routes/blogRouter');

const app = express();

//connect to mongodb
// const dbURI = 'mongodb+srv://TutsNN:NN1234@tuts-net-ninja.bjckmsb.mongodb.net/?retryWrites=true&w=majority'
// const dbURI = 'mongodb+srv://TutsNN:NN1234@tuts-net-ninja.bjckmsb.mongodb.net/Tuts-Node-NN?retryWrites=true&w=majority'
const dbURI = 'mongodb+srv://TutsNN:NN1234@tuts-net-ninja.bjckmsb.mongodb.net/Tuts-Node-NN?retryWrites=true&w=majority'
// mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
//     .then((result)=>app.listen(8080))
//     .catch((err) => console.log('hello!I am error YOOOwauuOO'));
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(8080))
  .catch((err) => console.log('MongoDB Connection Error:', err));

//registerViewEngine
app.set("view engine", "ejs");

// app.listen(8080);

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

//mongoose and morgan sandbos routes

// app.get('/add-blog',(req,res)=>{
//     const blog = new Blog({
//         title:'Second post' ,
//         snippet:'first post snippte',
//         body:'first post body'
//     });
//     blog.save()
//         .then((result)=>{
//             res.send(result);
//         })
//         .catch((err)=>{
//             console.log('hello');
//         });
// });

// app.get('/all-blogs',(req,res)=>{
//     Blog.find()
//         .then((result)=>{
//             res.send(result);
//         })
//         .catch((err)=>{
//             console.log("I AM ERROR")
//         });
// });
// //findById() this method takes the id as string (async method)


//routes
app.get('/',(req,res)=>{
    // const blogs = [{title:'Lorem, ipsum dolor.',snippet:'Lorem ipsum dolor sit amet, consectetur adipisicing.'},{title:'Ipsum dolor.',snippet:'Lorem ipsum dolor sit amet, consectetur adipisicing.'},{title:'Yohohoho.',snippet:'Lorem ipsum dolor sit amet, consectetur adipisicing.'}];
    // res.render('index',{title:'Home',blogs:blogs});

    res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    res.render('about',{title:'About'});
});

app.use('/blogs', blogRoutes);  //use blogroutes as middleware
// here we have scoped the routes for /blogs

/* 404 page */
app.use((req ,res) => {
    res.status(404).render('404',{title:'Page Not Found'});
}); 