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

function ChatbotPackage({ selectedLanguage,selectedCategory }) {
  console.log("selected", selectedLanguage.value);
  

  const [userResponse, setuserResponse] = useState("");
  const [gptResponse, setgptResponse] = useState("");
  useEffect(()=>{
    const data = localStorage.getItem('HistoryData');
    if(data){
       JSON.parse(data)
    }
    else{
       localStorage.setItem('HistoryData', JSON.stringify([]));
    }
  },[])

  useEffect(()=>{

console.log("printing GPT response--------->>>",gptResponse)
const lastHistory =JSON.parse( localStorage.getItem('HistoryData'));
if(lastHistory){
  if (userResponse!="") {
const updatedData = [ ...lastHistory,
  {
    type: "text",
    message: gptResponse,
    sender: "ChatGPT",
    direction: "incoming",
    position: "last",
    category:selectedLanguage.value,
    categoryType : selectedCategory
  },]
localStorage.setItem('HistoryData', JSON.stringify(updatedData));}
}
else{
  if(gptResponse!=""){
  const updatedData =[{
    type: "text",
    message: gptResponse,
    sender: "ChatGPT",
    direction: "incoming",
    position: "last",
    category:selectedLanguage.value,
    categoryType : selectedCategory
  },]
  localStorage.setItem('HistoryData', JSON.stringify(updatedData));}
}
  },[gptResponse])







  useEffect(()=>{
    const lastHistory =JSON.parse( localStorage.getItem('HistoryData'));
    console.log("printing History after GPT response--------->>>",lastHistory)
    console.log("printing User response--------->>>",userResponse)
    
    if(lastHistory){
      if (userResponse!="") {
        
      
    const updatedData = [ ...lastHistory,
      {
        type: "text",
        message: userResponse,
        sender: "user",
        direction: "outgoing",
        position: "last",
        category:selectedLanguage.value,
        categoryType : selectedCategory
      },]
    localStorage.setItem('HistoryData', JSON.stringify(updatedData));}
    }
      },[userResponse])


  const [messages, setMessages] = useState([
    {
      type: "text",
      message: "Hi, Tcs Code Generator Welcomes you..",
      sentTime: "just now",
      sender: "ChatGPT",
      direction: "incoming",
      position: "last",
      category:selectedLanguage.value,
      categoryType : selectedCategory
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);


  

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
      position: "last",
    };

    const newMessages = [...messages, newMessage];
   
    setuserResponse(message);
    setMessages(newMessages);
    
 
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
        var msg = messageObject.message;
      } else {
        role = "user";
        var msg =
          messageObject.message + ` in ${selectedLanguage.value} Language`;
      }
      return { role: role, content: msg };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " + "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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    }).then((data) => {
      console.log(data.status, "headers", typeof data.status);

      return data;
    });
    console.log("resonse --------", res, res.status);
    if (res.status === 200) {
      var response = await res.json();
      console.log("success>>>>>>>>>>>>>", response.choices[0].message.content);
      setgptResponse(response.choices[0].message.content);
      
      setMessages([
        ...chatMessages,
        {
          type: "text",
          message: response.choices[0].message.content,
          sender: "ChatGPT",
          direction: "incoming",
          position: "last",
          category:selectedLanguage.value,
          categoryType : selectedCategory
        },
      ]);
      
      
       
  
      
  
      

      setIsTyping(false);
    } else {
      console.log("erro");
      alert("error");

      setIsTyping(false);
    }
  }

  return (
    <div>
      <div style={{ height: "85vh" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? <TypingIndicator content="Typing..." /> : null
              }
            >
              {messages.map((message, i) => {
                console.log(message);
                return (
                  <Message
                    model={{
                      sender: message.sender,
                      type: "text",
                      position: "last",
                      direction: message.direction,
                      payload:
                        message.sender == "user" ? (
                          <Message key={i} model={message} />
                        ) : (
                          <Message.CustomContent>
                            <TypeWriterEffect
                              cursorColor="transparent"
                              text={message.message}
                              typeSpeed={50}
                              textStyle={{
                                color: "#3F3D56",
                                fontSize: "1rem",
                              }}
                            />
                            <br />
                          </Message.CustomContent>
                        ),
                    }}
                  >  </Message>
                );
              })}
            </MessageList>

            {!isTyping && (
              <MessageInput
                placeholder="Type message here"
                onSend={handleSend}
                attachButton={false}
              />
            )}
            {isTyping && (
              <MessageInput
                placeholder="Type message here"
                onSend={handleSend}
                attachButton={false}
                disabled
              />
            )}
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default ChatbotPackage;
