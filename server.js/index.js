// Amazing here I have first time created the two different 
// server instance in this file one is normal uni-directional
// express server and second is bi-directional socket server
// with instance of app and io and listening on 8080 and 8000




const express=require("express");
const {Server}=require("socket.io");
// destructuring the bi-directional server for the socket.io 
const io= new Server(8000,{
    cors:true,
}) // instance of server is created

// event listern on the server

const emailToSocketIdMap=new Map();
const socketidToEmailMap=new Map();



io.on("connection",socket=>{
    console.log(`Socket connected ${socket.id}`);
    socket.on("room:join",(data)=>{
        const {email,room}=data;
        emailToSocketIdMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id,email);
        io.to(room).emit("user:joined", { email, id: socket.id });
        socket.join(room);
        io.to(socket.id).emit("room:join",data);

    })


    socket.on("user:call", ({ to, offer }) => {
        io.to(to).emit("incomming:call", { from: socket.id, offer });
      });
    socket.on("call:accepted",({to,ans})=>{
        io.to(to).emit("call:accepted", { from: socket.id, ans });
    })
});


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
