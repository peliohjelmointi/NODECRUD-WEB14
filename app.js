const express = require('express')

// mahdollisia kirjastoja user-agentin käyttöön 
// require('useragent')
// require('ua-parser-js')

//luodaan express-applikaatio
const app = express() //luo http-serverin yms.

//asetetaan applikaatio käyttämään ejs-templatea "view enginenä"
app.set('view engine', 'ejs') 

//jos views-kansion tilalle haluaa muuttaa oman polun:
//app.set('views', //polku tähän)

app.use(express.urlencoded( {extended: false}))
// mahdollistaa req.bodyn tietojen keräämisen
// aina kun on app.use, kyseessä on middleware

//asetetaan content typet kaikkiin reitteihin 
// app.use((req,res,next)=>{
//     res.setHeader('Content-Type', 'text/plain')
// })

// kerrotaan ohjelmalle, missä staattiset tiedostot sijaitsee
app.use(express.static('public'))
// nyt html -tiedostojen href:it hakevat juurikansiokseen public

//----------------reititykset----------------
app.get('/', (req,res)=>{
    const userAgent = req.headers['user-agent'] //millä selaimella/käyttöjärjestelmällä käyttäjä tulee
    console.log(userAgent)
    const userLocale = req.headers['accept-language'] //käyttäjän koneen kielet
    console.log(userLocale)
    res.redirect('/login')  // vie /login -reittiin  
})

app.get('/login', (req,res)=>{
   res.render('login') //renderöi /login -reittiin login.ejs sivun
})

app.post('/login', (req,res)=>{
    res.render('index',{message:req.body.username}) 
                    //haetaan html-sivulta username
})


//-------------------portin kuuntelu----------------
app.listen(3000, ()=>{
    console.log("server running on port 3000")
})