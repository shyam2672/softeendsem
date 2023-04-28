import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, allfriendsroute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import RandomChatContainer from "../components/RandomChatContainer";

import loader from "../assets/loader.gif";

export default function Chat() {
  const [isfilled, setisfilled] = useState(true);

  const navigate = useNavigate();
  const socket = useRef();
  // const [contacts, setContacts] = useState([]);
  const [roomid,setroomid]=useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  const func3=async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }
  useEffect(async () => {
   func3()
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      
      // socket.current.emit("add-user", currentUser._id);
    }
    console.log(currentUser);
  }, [currentUser]);
  // const handleroomchange = () => {
  //   // setisfilled(roomstatus);
  //   console.log(socket);
  //   socket.current.emit("privateRoom",currentUser._id);
  //   socket.current.on("private ack", (message,roomID,staus) => {
  //     console.log(message);
  //     setroomid(roomID);
  //     setisfilled(staus);
      
  //   });
    
  // };


  return (<>
<RandomChatContainer socket={socket} currentuser={currentUser}/>      
  </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
