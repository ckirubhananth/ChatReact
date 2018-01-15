This is the version 1 basic chat modulw which allows you to chat by a name without registration within a specified set of chat rooms.

The upcoming futures will have options to register a user, private chat, create rooms, audio and video chatting, chatting UX, themes etc.

The upcoming versions will bypass socket.io usage and use WebRTC protocol to remove the existence of a socket server through the life time of the chat.

Steps to test the application

1. Run the SocketServer
        $ cd SocketServer
        $ npm install
        $ node app.js
    This will start the server in 8080 port in localhost.

2. Build the React App
        $ npm run-script build
    This will create a build folder which is ready to deploy.

3. Deploy and run the React client
    We can use the serve module to serve this build folder via a HTTP server. So, we can elimate writing an App to run a HTTP service.
        $ sudo npm install -g serve
        $ serve build
    This will give the serve the build folder and will show the path to access the App as follows


   ┌─────────────────────────────────────────────────┐
   │                                                 │
   │   Serving!                                      │
   │                                                 │
   │   - Local:            http://localhost:5000     │
   │   - On Your Network:  http://192.168.1.5:5000   │
   │                                                 │
   │   Copied local address to clipboard!            │
   │                                                 │
   └─────────────────────────────────────────────────┘

4. Visit the specified URL.

5. Select a room, specify your name and start chatting.



