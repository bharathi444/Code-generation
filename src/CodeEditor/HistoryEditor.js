import React, { useState, useEffect } from "react";
import ReactTypingEffect from "react-typing-effect";
import TypeWriterEffect from "react-typewriter-effect";
// import './App.css'
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const API_KEY = "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";
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content: "You are a helpful assistant for programming code generation.",
};

function HistoryData({ historyCategory }) {
  console.log(historyCategory, "<<<<<<<<<<<<<<<<<<<<<<<<");

  const gethistoryFromLS=()=>{
    const data = localStorage.getItem('HistoryData');
    if(data){
      return JSON.parse(data)
    }
    else{
      return []
    }
  }
  const [history, sethistory]=useState(gethistoryFromLS());
  const [messages, setMessages] = useState(history);
  const SelectedHistory =history.filter((item) => item.categoryType === historyCategory);
  // setMessages(SelectedHistory)
  
  console.log(SelectedHistory,"<<<<<<<<<<<<<<<",messages)

  return (
    <div>
      {SelectedHistory.length !==0 && <div style={{ height: "85vh" }}>
      
      <MainContainer>
        <ChatContainer>
          <MessageList scrollBehavior="smooth">
            {SelectedHistory.map((message, i) => {
              console.log(message);
              return (
                <Message
                  model={{
                    sender: message.sender,
                    type: "text",
                    position: "last",
                    direction: message.direction,
                    payload: <Message key={i} model={message} />,
                  }}

                ></Message>
                
                
              );
            })}
          </MessageList>
         
        </ChatContainer>
      
      </MainContainer>
  
    </div>}
    {SelectedHistory.length ===0 && <div style={{ height: "85vh",textAlign:'center'}}>
      
     <div style={{paddingTop:'20%',fontWeight:'500',fontSize:'30px'}}>No chats yet.</div>
     <br />
     <div style={{fontSize:'20px'}}>Pick your code category from left menu and start your conversation.

.</div>
  
    </div>}
    </div>
  );
}

export default HistoryData;
