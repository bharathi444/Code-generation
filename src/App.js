import React, {useState,useEffect} from 'react';
import {ThemeProvider, createGlobalStyle} from 'styled-components';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './contents/Frontend';
import Portfolio from './contents/AppDevelopment';
import Contact from './contents/DataBase';
import ChatbotPackage from './CodeEditor/CodeEditor';
import Backend from './contents/Backend';
import AppDevelopment from './contents/AppDevelopment';
import Frontend from './contents/Frontend';
import DataBase from './contents/DataBase';
import Regex from './contents/Regex';
import ExplainCode from './contents/ExplainCode';
import Local from './Local';
import History from './contents/History';
import HistoryNav from './contents/HistoryNav';

const GlobalStyle = createGlobalStyle`
  body{
  background: linear-gradient(${props => props.theme.mode === 'dark' ? '#868f96, #596164' : '(#ff758c,#764ba2'});
  }

`

function App() {
  const getDataFromLS = () => {
    const data = localStorage.getItem("UserData");
    // setCurrentUserName(userName1);
    if (data) {
      console.log("rendering");
      return JSON.parse(data);
    } else {
      return [];
    }
  };
  const [theme, setTheme] = useState({ mode: 'light'});
  const [history, setHistory] = useState("hi");
 
  return (
    <ThemeProvider theme={theme}>
      <>
    <GlobalStyle />
    <Router>
    <div className="App">
    <Navbar />
    <Route exact path="/">
    <Frontend />
    </Route>
    <Route path="/backend">
    <Backend />
    </Route>
    <Route path="/app-development">
    <AppDevelopment />
    </Route>
    <Route path="/database">
    <DataBase />
    </Route>
    <Route path="/regex">
    <Regex />
    </Route>
    <Route path="/Explain-code">
    <ExplainCode />
    </Route>
    <Route path="/chat">
    <ChatbotPackage />
    </Route>
    <Route path="/history">
    <HistoryNav />
    </Route>
    <div class="back1 glass" onClick={e => setTheme(
      theme.mode === 'dark' ? {mode: 'light'} : {mode: 'dark'}
    )}><i class={theme.mode === 'dark' ? "fa fa-sun i1" : "fa fa-moon i1"}></i></div>
    </div>
    </Router>
    </>
    </ThemeProvider>
    );
  }
  
  export default App;
  