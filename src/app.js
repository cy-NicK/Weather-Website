const path=require('path')
const express=require('express')
const hbs=require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')

const app=express()
//path for express
app.use(express.static(path.join(__dirname,'../public')))
const viewsPath=(path.join(__dirname,'../templates/views'))
const partialsPath=path.join(__dirname,'../templates/partials')

hbs.registerPartials(partialsPath)
//setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Nitin"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Nitin'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        text:"weather",
        title:"HElp",
        name:"Nitin"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            Error:"Provide address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                Location:location,
                Data:forecastData
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"No search value"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:"404",
        name:'NItin',
        error:"HELP NOT FOUND.."
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'Nitin',
        error:"404 page.."
    })
})

app.listen(3000)
console.log("RUnning on port 3000")