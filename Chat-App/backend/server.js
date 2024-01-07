const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")
const { notFound, errorHandler } = require("./middlerware/errorMiddleware")
const chatRoutes = require("./routes/chatRoutes"); 
dotenv.config();

connectDB()

const app = express();
app.use(express.json())  // to accept JSON data
app.get('/',(req,res)=>[
    res.send("api is running")
])
app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000

app.listen(PORT)