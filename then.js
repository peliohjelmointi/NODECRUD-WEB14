const fs = require('fs').promises

async function readFile(){
    try{
        const data = await fs.readFile('a.txt', 'utf-8')
        console.log(data)
    }
    catch(error){
        console.log(error)
    }
}

//---------vaihtoehtoinen kirjoitustapa
const fs = require('fs').promises

fs.readFile('a.txt','utf-8')
.then((data) =>{
    console.log(data)
})
.catch((err)=>{
    console.log(error)
})
