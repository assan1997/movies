require('babel-register');

const config = require('./configuration/config')
const express = require('express');

const app = express();

const bodyParser =require('body-parser');

const multer = require('multer');
const upload =multer();
app.set('views','./views');
app.set('view engine','ejs')

const urlParser = bodyParser.urlencoded({extended:false});
let frenchMovies =[
    {title: `le fabuleux destin d'amelie Poumain`,year:2001},
    {title:`Buffet froid`,year:1997},
    {title:`Le Diner de cons`,year:1998},
    {title:`De rouille de l'os`,year:2012}
] 
app.use(express.static('public'))
app.get('/',(req,res)=>{
    const title ="Bienvenue sur Movies"
    res.render('index',{title:title}) 
});
app.get('/movies',(req,res)=>{
    const title ='Films francais des trentes dernières années'
    res.render('movies',{movies :frenchMovies, title:title})
});

// app.post('/movies',urlParser,(req,res)=>{
//     console.log(`Le titre : ${req.body.movietitle}`)
//     console.log(`L' année : ${req.body.movieyear}`)

//     const newMovie = {title : req.body.movietitle, year:req.body.movieyear}

//     frenchMovies = [...frenchMovies, newMovie];
//     console.log(frenchMovies)
//     res.sendStatus(201)
// })

app.post('/movies',upload.fields([]),(req,res)=>{
    if(!req.body){
        return res.sendStatus(500);
    }else{
        const formData = req.body;
        console.log('formData:',formData);
        const newMovie = {title : req.body.movietitle, year:req.body.movieyear}
        frenchMovies = [...frenchMovies, newMovie];
        res.sendStatus(201);
    }
})

app.get('/movies-search',(req,res)=>{
    res.render('movies-search')
})
app.listen(config.PORT,()=>{
    console.log(`started on port ${config.PORT}`)
});