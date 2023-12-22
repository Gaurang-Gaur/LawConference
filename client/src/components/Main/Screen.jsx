import React,{useEffect,useCallback,useState} from "react";
import ReactPlayer from "react-player";
import {useSocket} from "../../context/SocketProvider";
import peer from "../../service/peer";// return object:0




const RoomPage=()=>{
    const [remoteSocketId,setRemoteSocketId]=useState(null);
    const [myStream,setMyStream]=useState();
    
    const socket=useSocket();
    const handleUserJoined=useCallback(({email,id})=>{
        console.log(`Email ${email} joined room`);
        setRemoteSocketId(id);
    },[]);
    
    const handleCallUser=useCallback(async()=>{
        const stream=await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true,
        });
        const offer=await peer.getOffer();
        // console.log(offer);
        socket.emit("user:call",{to:remoteSocketId,offer});


        setMyStream(stream);
    },[remoteSocketId,socket])
    
    const handleIncommingCall = useCallback(
        async ({ from, offer }) => {
          setRemoteSocketId(from);
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
          });
          setMyStream(stream);
          console.log(`Incoming Call`, from, offer);
          const ans = await peer.getAnswer(offer);
          socket.emit("call:accepted", { to: from, ans });
        },
        [socket]
      );

    const handleCallAccepted=useCallback(async({from,ans})=>{
        // as the call accepted add it to local description
        peer.setLocalDescription(ans);
        console.log(`Call Accepted `);
        // getting all the track
        // socket <----------> socket Channel
        for(const track of myStream.getStracks()){
            peer.peer.addTrack(track,myStream)
        }
        // This will share my to other user

    },[myStream]);

    useEffect(()=>{
        socket.on("user:joined",handleUserJoined);
        socket.on("incomming:call",handleIncommingCall);
        socket.on("call:accepted",handleCallAccepted);
        return ()=>{
            socket.off("user:joined",handleUserJoined);
            socket.off("incomming:call",handleIncommingCall);
            socket.off("call:accepted",handleCallAccepted);

        }
    },[socket,handleUserJoined,handleIncommingCall,handleCallAccepted])





    return (
        <div className="app">
        <h4>{remoteSocketId?"Connected":"No one in room"}</h4>
        {remoteSocketId?<button onClick={handleCallUser}>CALL</button>:""}
        {myStream && (
        <>
          <h1>My Stream</h1>
          <ReactPlayer
            playing
            muted
            
            height="100px"
            width="200px"
            url={myStream}
          />
        </>

        
      )}        </div>
    )
}

export default RoomPage;