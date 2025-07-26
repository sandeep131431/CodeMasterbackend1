const express = require('express')
const app = express();
require('dotenv').config();
const main =  require('./src/config/db')
const cookieParser =  require('cookie-parser');
const authRouter = require("./src/routes/userAuth");
const redisClient = require('./src/config/redis');
const problemRouter = require("./src/routes/problemCreator");
const submitRouter = require("./src/routes/submit")
const cors = require('cors')
const aiRouter = require("./src/routes/aiChatting")
const videoRouter = require("./src/routes/videoCreator");


app.use(cors({
    origin: 'https://code-master-frontend.vercel.app',
    // origin: "*",
    credentials: true 
}))

app.use(express.json());
app.use(cookieParser());


app.use('/user',authRouter);
app.use('/problem',problemRouter);
app.use('/ai',aiRouter);
app.use("/video",videoRouter);
app.use('/submission',submitRouter);





const InitalizeConnection = async ()=>{
    try{

        await Promise.all([main(),redisClient.connect()]);
        console.log("DB Connected");
        
        app.listen(process.env.PORT, ()=>{
            console.log("Server listening at port number: "+ process.env.PORT);
        })

    }
    catch(err){
        console.log("Error: "+err);
    }
}


InitalizeConnection();
//redisClient.connect()



