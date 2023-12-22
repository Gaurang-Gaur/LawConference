import React, { createContext, useMemo,useContext  } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

// here for socket is just a end point for two dimensional
// connection for being 2d connection we require socket  in frontend as 
// well as in backend
// here we creating the socket in client by socket.io-client  
// by using backend server inside the useMemo hook

export const SocketProvider = (props) => {
  const socket = useMemo(() => io("localhost:8000"), []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};