const mongoose = require('mongoose')
const Schema = mongoose.Schema 
                // Schemalla määritetään dokumentin struktuuri

//luodaan oma blogi-Schema-olio:
const blogSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    snippet: {
        type:String,
        required: true
    },
    body: {
        type:String,
        required: true
    }
}, {timestamps: true}) // vapaaehtoinen, lisää createdAt ja updatedAt -kentät

const Blog = mongoose.model('Blog', blogSchema) 
        //HUOM! mongoose lisää tässä s-kirjaimen Blog-sanan perään collectioniksi!

module.exports = Blog 