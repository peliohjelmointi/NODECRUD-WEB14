const bcrypt = require('bcrypt')

const saltRounds = 10 // 2^10 =1024
//mitä isompi, sitä kauemmin kestää ajaa funktio
//12 tai 14 pitäisi olla superturvalline, 10 OK

async function cryptPassword(password){
    const hashedPassword = await bcrypt.hash(password,saltRounds)    
    console.log(hashedPassword)
    return hashedPassword
}

async function VerifyPassword(username, pw,coll){
    //otetaan mongo-yhteys, haetaan 1.käyttäjä, löytyykö usernamella?
    
    const user = await coll.findOne({username: username}) //huom. hakee VAIN 1.tämän nimisen userin
    if(!user){
        console.log("user not found")
        return false
    }
    console.log("user found!")

    const isMatch = await bcrypt.compare(pw, user.password)
    console.log(isMatch)
    return isMatch
}

module.exports = {cryptPassword, VerifyPassword}





// async function tarkasta(){
//     const password = 'KohtaKotiin'
//     const hashed = await cryptPassword(password)
//     const match = await VerifyPassword(password,hashed)
//     console.log(match) //true tai false, tässä nyt aina true
// }

// tarkasta() //tämä vain väkisin tehty esimerkki,

// seuraavaksi käytetään funktioita niin, että cryptPassword tallentaa käyttäjän ja hashatun salasanan 
// tietokantaan 
// ja VerifyPassword kutsutaan, kun käyttäjä painaa login-nappia login-sivulla. Tällöin tarkistetaan
// matchääko annettu käyttäjä ja tietokannan käyttäjä ja hashattu salasana

//aja: node kryptaus.js

