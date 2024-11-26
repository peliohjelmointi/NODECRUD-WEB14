const bcrypt = require('bcrypt')

const saltRounds = 10 // 2^10 =1024
//mitä isompi, sitä kauemmin kestää ajaa funktio
//12 tai 14 pitäisi olla superturvalline, 10 OK

async function cryptPassword(password){
    const hashedPassword = await bcrypt.hash(password,saltRounds)    
    console.log(hashedPassword)
    return hashedPassword
}

async function VerifyPassword(inputPassword, hash){
    const isMatch = await bcrypt.compare(inputPassword, hash)
    return isMatch
}

async function tarkasta(){
    const password = 'KohtaKotiin'
    const hashed = await cryptPassword(password)
    const match = await VerifyPassword(password,hashed)
    console.log(match) //true tai false, tässä nyt aina true
}

tarkasta() //tämä vain väkisin tehty esimerkki,

// seuraavaksi käytetään funktioita niin, että cryptPassword tallentaa käyttäjän ja hashatun salasanan 
// tietokantaan 
// ja VerifyPassword kutsutaan, kun käyttäjä painaa login-nappia login-sivulla. Tällöin tarkistetaan
// matchääko annettu käyttäjä ja tietokannan käyttäjä ja hashattu salasana

//aja: node kryptaus.js

