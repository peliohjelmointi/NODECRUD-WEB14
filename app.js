const express = require('express')
const mongo_connection = require('./mongo_connection') //ajaa connectToMongo()
const kryptaus = require('./kryptaus')

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

//asetetaan tietokanta ja collection jota käytetään
const db = mongo_connection.connection.useDb('NodeCRUD_DB') 
//luo jos ei löydy (mutta vain jos siihen lisätään collection, ja collectioniin ainakin 1 dokumentti)
const coll = db.collection('users') //kuten yllä, luodaan jos ei löydy..

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

// app.post('/login', (req,res)=>{
//     res.render('index',{message:req.body.username}) 
//                     //haetaan html-sivulta username
// })

app.get('/list_databases',async(req,res)=>{
    const databases = await mongo_connection.connection.listDatabases()
    res.send(databases)


})

app.get('/add_user', (req,res)=>{
    res.render('add_user')
    
})
app.post('/add_user', async(req,res)=>{
try{
        const password = req.body.password
        const hashedPassword =  await kryptaus.cryptPassword(password)
        await coll.insertOne(
            {                
                username:req.body.username,
                password:hashedPassword
            }
        )
        res.send('käyttäjä lisättiin kantaan salasanalla:' + hashedPassword)
    }
    catch(error){
        console.log(error)
    }
})

app.post('/login_check', async(req,res)=>{
    try{
        const isLogged = await kryptaus.VerifyPassword(req.body.username,req.body.password,coll)
    }
    catch(error){
        console.log(error)
    }

    // otetaan sivulta talteen username ja password, ja viedään ne 
    // parametreina krytaus-moduulin VerifyPassword-funktiolle.
    // VerifyPassword-funktion tulee etsiä tietokannasta 1.dokumentti,
    // jossa username on sama kuin parametrina annettu.
    // Mikäli usernamea ei löydy kannasta, funktio palauttaa false.
    // Mikäli löytyy, tarkistetaan hashattu salasana vs käyttäjän password.
    // Mikäli ovat samat, palautetaan true, muuten palautetaan false.

    // Tämän jälkeen reititys näyttää index.ejs-sivun vain, mikäli
    // palautui true. Muuten näytetään joku virhe tai virhesivu.
})

//-------------------portin kuuntelu----------------
app.listen(3000, ()=>{
    console.log("server running on port 3000")
})