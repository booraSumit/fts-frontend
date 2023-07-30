// import { io } from "socket.io-client";

// import store from "../store";
// const url = "http://localhost:3000";

// let token;

// const socket = io(url, {
//   autoConnect: false,
//   auth: {
//     token: token,
//   },
// });

// export default socket;

// // export default function (token) {
// //   const socket = io(url, {
// //     autoConnect: false,
// //     auth: {
// //       token: token,
// //     },
// //   });
// //   return socket;
// // }

// // Declare socket variable outside the component

// // const initializeSocket = (token) => {
// //   socket = io(url, {
// //     autoConnect: false,
// //     auth: {
// //       token: token,
// //     },
// //   });

// //   socket.connect();

// //   // Clean up the socket connection when the component unmounts
// //   return () => {
// //     socket.disconnect();
// //   };
// // };

// // export { initializeSocket, socket };
