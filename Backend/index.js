require('dotenv').config()
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', // Your React app URL
  credentials: true
}));
const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const {restricttoLoggedInUserOnly, checkAuth} = require("./middleware/auth")
const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")

const {connectToMongoDB} = require("./connect")
const URL = require("./models/url")

connectToMongoDB(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
.then(()=> console.log("MongoDB Connected"))


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

// app.get('/test',async (req,res)=>{
//     const allUrls = await URL.find({})
//     return res.render("home",{
//         urls: allUrls,
//     })
// })


app.use("/url",restricttoLoggedInUserOnly,urlRoute)
app.use("/",staticRoute)
app.use("/user",userRoute)

app.get("/url/:shortId", async (req,res)=>{
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId,
    },{ 
        $push: {
            visitedHistory:{
                timestamp: Date.now()
            }
        }
    })
    res.redirect(entry.redirectedUrl)
})

app.listen(process.env.PORT, ()=>console.log(`Server started on the PORT: ${process.env.PORT}`))
