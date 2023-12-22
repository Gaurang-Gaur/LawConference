**Log file**

**here is our target to create to pages one is login page and chat room**

1.On login page we have take the infomation of user1 which email and room no and now , we have to take this infomation for states to our backend
through socket server.

2.Now , the question araise that how our react app have the access of socket server
3.we will be creating the socket Provider to wrap our app to use socket by name as useSocket which is custom hook
4.After the form is handle we have to write the code for join our room logic inside handleSubmit form 
5.For , join room here we will emit the event which is room:join (custom event which is made by me)
  and passing {email, room };

6.Now, we have to handle this particular event in backend;
  basically we telling our server that i want to join in this room
  before we have to keep the track which email is in which room
  for which we will use map in this we are going to map the email with socket.id;

7. And,All create a reverse map for the getting email for socket id ...

8.if for particular socket handle the event which room:join and wait for event to listen.

9.Inside particuler socket of client we are mapping the email with socket id and viceversa

     --->emailToSocketIdMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id,email);
        socket.to("room:join",data);
        io.to(socket.id).emit("room:join",data);
    Note: let destructure this cmd as io , to() and emit() which takes "room:join" as event
    io: This io refer to main socket server it mananges all communication between the client and server 
**imp** : io provide method for emiting event  to specific client in group of client
          to() provide the target of emission  It says to emit the event to a specific client identified by its socket.id. Each client connected to the server has a unique socket.id that distinguishes it from others.
          emit() why we use the this?
          Certainly! In simple terms, "emit" in the context of event-driven programming means to send or produce something. When you "emit" an event, you are signaling that something specific has happened, and you may also send along some information (data) related to that event.

          Imagine a scenario where you have a button on a webpage. When someone clicks that button, you could "emit" a "click" event. This event signals that the button has been clicked, and you might also send additional information about the click, such as the mouse coordinates or any relevant details.
          
          So, emitting an event is like triggering a signal or message to let other parts of your program (or other connected systems, in the case of Socket.IO) know that a certain action or state change has occurred.
          
          In Socket.IO, when you use `emit` on the server, you are sending a message (event) to connected clients, and when you use `emit` on a client, you are sending a message back to the server or to other clients. It's a way for different parts of a program or different systems to communicate and respond to events in a coordinated way.

          The emit method is used to send a custom event ("room:join" in this case) along with optional data to the specified target. In this context, it sends the "room:join" event to the client identified by the socket.id.
          Putting it all together, the line is emitting a "room:join" event along with the data payload specifically to the client whose socket.id matches the one provided. This is commonly used when you want to send a response or update to the client that triggered the initial event. In this case, it ensures that the client who sent the "room:join" event receives the same event with the updated data.

          here, firstly client generate the custom event name as the "room:join" by clicking on the lobby button and then in backend
          server socket.on("room:join") capture the event and payload from frontend and io server instance telling client with (socket.id) unqiue
          id that data is update or reach the specific socket

**Explaination of above code here**
1.The socket object represents the connection to the individual client.
2.Logging Socket Connection (console.log(Socket connected ${socket.id});):
  This line logs a message indicating that a new socket (client) has connected, along with its unique socket.id.
3."room:join" Event (socket.on("room:join", data => {...})):
   This event is triggered when the client sends a "room:join" event to the server.
4. The above event occurred when the client click on the join button on the lobby form it's will generate the event named: "room:join"
5.Broadcasting to Room (socket.to("room:join", data);):
   This line broadcasts the "room:join" event to all clients in the same room as the sender (socket.id). It excludes the sender from receiving the message.
6.io.to(socket.id).emit("room:join",data);


difference between the io.on() and socket.on()?


In the context of the Socket.IO library in JavaScript, `io.on()` and `socket.on()` are both event handlers, but they are used in different scopes.

1. **`io.on()`**: This is used to handle events at the global level, i.e., for events that are related to the entire Socket.IO server, not just a specific connection. For example, you might use `io.on('connection', ...)` to handle the event when a new client connects to the server.

    ```javascript
    const io = require('socket.io')(httpServer);

    io.on('connection', (socket) => {
      console.log('A user connected');

      // Handle custom event at the global level
      io.on('customEvent', (data) => {
        console.log('Custom event received:', data);
      });
    });
    ```

2. **`socket.on()`**: This is used to handle events for a specific client connection. Each `socket` object represents an individual client. Events handled with `socket.on()` are specific to that particular client.

    ```javascript
    const io = require('socket.io')(httpServer);

    io.on('connection', (socket) => {
      console.log('A user connected');

      // Handle a custom event for this specific socket (client)
      socket.on('customEvent', (data) => {
        console.log('Custom event received:', data);
      });
    });
    ```

In summary, `io.on()` is used for handling global events related to the entire server, while `socket.on()` is used for handling events specific to individual client connections.


10.Now, as the custom event data again reach to the client we will handle join room logic now with paramter data which is getting as payload from backend;

NOTE: we use Custom event from client--->server---->client
      to valid the server have recieved the data send back to client


12. here in client we have useEffect which is listen the custom event
    "room:join" after whole component is render run handleRoomJoin function
13. This useEffect have callback function which return a function
    which off the event listening on the socket as the componenet render multiple time so , we does not want the socket to listen the multiple times
14. Now, we have to create roompage and route for it in app.js
    and inside the handleJoinRoom we will naviagate this room/:roomid page

15. Since we reach the roompage we will add the listener in this   component that user is entered for this we need a socket and useEffect
    Why useEffect we want to something which should be do after the component is render and socket as specific client
    Target: If user want to go inside the room we will broadcast on the room inside the room using socket.join()

     io.to(room).emit("user:joined", { email, id: socket.id });// get this data inside 
        socket.join(room); socket are joined now, to client inside the room
        io.to(socket.id).emit("room:join",data); and then we push inside

16. The stablized connection announced other user has enter the room
17.  now, store the remote user socketid in state using setstate
18.  since , it got connect we provide the button to call so,that
     connected tab(person1) can the other person2
19. now, we are going to create the handleCallUser which is callback
    which is async in this enable  person1 media and store in mystream state after this our stream is done!

20.Now, we are going to create the service which is webRTC inside the peer js which will create a offer which we will send to person2
inside the handleCallUser function below the stream function
we create the offer and send to the person2

21. Now, handle this custom event in backend which is (user:call) 
       socket.on("user:call",({to,offer})=>{
        io.to(to).emit("incoming:call",{from:socket.id,offer});
    })
    This is very similar to app.get("/newblog",()=>{});
    to:is person2 
    io.to(to).emit("incoming:call",{from:socket.id,offer});
    here , io (server) to person2 say you have incoming call from person1 and with the offer this.

22. We have to handle this incoming call in the frontend for this I will use the useEffect hook here.
23. we get the incoming call in the frontend we have to accept it now,
    in peer js we create a method to ask person2 to accept the offer or give ans;

24. Before , answer by person2 we are going to start the media of user2 
    and set it in mystream state and setting our remoteId from which user we get the call

25. Now, handle the accept call in our backend and send to fe to handle it
26. As, the call accepted set in our local description and user2 accept the call
27. Now, call accepted we just have to transimit the stream for one end to other
28. For this we are going to make share tracks of one user to other user
    by peer.peer.addTrack(track,myStream)
29.Now, we need other useEffect to set new Remote stream and add event listener on track 
30. After sharing track we need to Other useEffect to deregister the event
31. negotation will be done here as, it's custom event is send to server
32. and get handle inside the useEffect in frontend




























Note: https://capelski.medium.com/a-comprehensive-webrtc-walkthrough-5220ee0c0bdb