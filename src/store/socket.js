import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../api/client";

// Socket slice
const slice = createSlice({
  name: "socket",
  initialState: {
    isConnected: false,
    socket: null,
    error: null,
    // receivedEvents: [],
  },
  reducers: {
    initializeConnection: (state, action) => {
      state.isConnected = true;
      state.socket = action.payload;
    },
    onError: (state, { payload }) => {
      state.isConnected = false;
      state.error = payload;
    },
    disconnect: (state) => {
      state.isConnected = false;
      state.socket.disconnect();
      state.socket = null;
    },
    // receiveEvent: (state, action) => {
    //   state.receivedEvents.push(action.payload);
    // },
  },
});

// Action creators
export const { initializeConnection, disconnect, receiveEvent, onError } =
  slice.actions;

// Thunk to initialize connection
export const initializeSocket = () => (dispatch, getState) => {
  const { token, user } = getState().entity.auth;
  const socket = io.connect(SOCKET_URL, {
    auth: {
      token: token,
    },
  });

  // Initialize the connection
  socket.on("connect", () => {
    dispatch(initializeConnection(socket));
  });

  socket.on("connect_error", (err) => {
    console.log(err);
    dispatch(onError(err.message));
  });

  socket.emit("user", user);

  // Handle specific events and emit messages as needed
  socket.on("temp", (data) => {
    console.log(data);
    // dispatch(receiveEvent({ eventName: "event1", data }));
  });

  socket.on("event2", (data) => {
    dispatch(receiveEvent({ eventName: "event2", data }));
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("disconnect");
    dispatch(disconnect());
    // try {
    //   socket.connect();
    // } catch (error) {
    //   console.log(error);
    // }
  });
};

// Thunk to send events
export const sendEvent = (eventName, data) => (dispatch, getState) => {
  const { socket } = getState().socket;

  if (socket) {
    socket.emit(eventName, data);
  }
};

// Socket reducer
export default slice.reducer;
