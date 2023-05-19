const express=require("express");

require("dotenv").config();

const cors=require("cors");

const connection=require("./db");

const app=express();
const userRoutes=require("./routes/users")
const authRoutes=require("./routes/auth")

// database connection

connection();



// making middleware programs 

app.use(express.json());
app.use(cors());
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);


const port= 8080;


// creation of the server


app.listen(port,()=>{
    console.log("server is listening on 8080");
})
