
import express  from "express";
import routes from './routes/index.js'
import jsonwebtoken from "jsonwebtoken";
import http from 'http'
import cors from 'cors'
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from 'express-session'
import { Server } from "socket.io";


const parameter = {
    origin : "*" ,
    methods : ['GET' , 'POST' , 'PUT' , 'DELETE'],
    credentials : true
}

const app = express()
const server = http.createServer(app)
const io = new Server(server , {
    cors:parameter ,
})
const attachsocket = (req,res,next)=>{
    req.io =io 
    next()
}


app.use(cors(parameter))
app.use(attachsocket)
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    key:"user_cookie",
    secret: "secret_secret",
    resave: false ,
    saveUninitialized: false,
    cookie:{
        expires : 60*60*24,
    }
}))


app.use(routes)

server.listen(3000 , ()=>{
    console.log('hello from 3000');
    
})