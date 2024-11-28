const mongoose = require('mongoose') //mongodb driver for js/node

                //connection string, voi joutua esim. vuoden päästä päivittämään
const mongoURI = 'mongodb+srv://USERNAME_TÄHÄN:SALASANA_TÄHÄN@cluster0.37ex2rd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

/*


URI Uniform Resource Identifier
// voi olla abstrakti tai fyysinen resurssi, kuten websivu,
email-osoite tai vaikka puhelinnumero
URI koostuu URN+URL
URL Uniform Resource Locator
URN Uniform Resource Name

*/

/* jos jatkossa käyttää schemoja, saataa haluta, että jokaisessa dokumentissa
 on samat kentät. Silloin täytyy asettaa true.
 false ei anna virhettä, jos haetaan kenttää mitä ei löydy
 */
mongoose.set('strictQuery', false) 

async function connectToMongo(){
    try{        
        await mongoose.connect(mongoURI,{
          maxPoolSize:10 //yhtäaikaista käyttäjää max.
        })
        //mahdolliset connection optionit tähän        
        console.log("connected to MongoDB")
    }            
    catch(error){
        console.log(error)
    }
}

connectToMongo() // aja komennolla: node mongo_connection.js

module.exports = mongoose //viedään yhteys