const express = require('express')
const app = express()



const Article = require('./models/article')
const methodOverride = require('method-override')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const domPurify = createDomPurify(new JSDOM().window)

const { urlencoded } = require('body-parser')


app.use(express.urlencoded({extended: false}))

app.use(methodOverride('_method'))

const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://javascriptboss:javascript123@cluster0.5zq0v.mongodb.net/blog?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log(`MongoDB connected to ${conn.connection.host}`);
    } catch (error) {
        console.error(error)
        process.exit(1)
        
    }
}

connectDB()


const articleRouter = require('./routes/articles')

app.set('view engine', 'ejs')




app.get('/', async (req, res) =>{
const articles = await Article.find().sort({
    createdAt: 'desc'
})
    res.render('articles/index', {articles: articles})
})
app.use('/articles', articleRouter)
app.listen(3000, console.log('App listening on port 3000'))
