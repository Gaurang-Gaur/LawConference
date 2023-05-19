// making connection with mongdb

const mongoose=require("mongoose");

// const DB_URI=require("./env")
DB_URI=process.env.DB_URI;

const dbconnect=()=>{
    const connectionParams={
        useNewUrlParser:true,
        useUnifiedTopology:true,
    };

    try{
        mongoose.connect(DB_URI,connectionParams);
        console.log("connection to database");
    }
    catch(e){
        console.log(e);
        console.log("Database not connected!");

    }
}


module.exports=dbconnect;