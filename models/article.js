const { mongo } = require("mongoose");
const marked = require('marked')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const domPurify = createDomPurify(new JSDOM().window)



const slugify = require('slugify')


mongoose = require('mongoose')




const articleSchema = new mongoose.Schema({
    title:{
        required: true,
        type: String
    },
    desc:{
        type: String
    },
    markdown:{
        required: true,
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    slug:{
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml:{
        type: String,
        required: true
    }

})

    articleSchema.pre('validate', function(next){
        if(this.title){
            this.slug = slugify(this.title,{
                lower: true, strict: true
            })
        }

        if(this.markdown){
            this.sanitizedHtml = domPurify.sanitize(marked(this.markdown))
        }
        


        next()
        
})

module.exports = mongoose.model('Article', articleSchema)