import React, { Component } from 'react';
import Navitem from './Navitem';
import profilepic from '../img/profile_photo.jpg';

class Navbar extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            'NavItemActive':''
        }
    }
    activeitem=(x)=>
    {
        if(this.state.NavItemActive.length>0){
            document.getElementById(this.state.NavItemActive).classList.remove('active');
        }
        this.setState({'NavItemActive':x},()=>{
            document.getElementById(this.state.NavItemActive).classList.add('active');
        });
    };
    componentDidMount (){
        if (window.location.pathname === '/'){
            this.activeitem("Frontend")

        }
        else if(window.location.pathname === '/backend'){
            this.activeitem("Backend")

        }
       
        else if(window.location.pathname == '/app-development'){
            this.activeitem("App Development")
        }
        else if(window.location.pathname == '/database'){
            this.activeitem("Database")
        }
        else if(window.location.pathname == '/regex'){
            this.activeitem("Regular Expression")
        }
        else if(window.location.pathname == '/Explain-code'){
            this.activeitem("Explain Code")
        }
        else if(window.location.pathname == '/history'){
            this.activeitem("History")
        }
       
       
        console.log(window.location.href,"--------",window.location.pathname,"-----")
    }
    render() {
        return (
            <nav className="glass">
            <div style={{display:'flex',alignItems:'center',background:'black',borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}}>
            <img  style={{marginLeft:'3%'}} src={profilepic} className="profilepic"></img>
           <div style={{marginLeft:'-7%',color:'aquamarine'}}> <h2> Digital Garage AI</h2>
           <br />
           
           <h4>Code Assistant</h4>
           </div>
          
            </div>
            
            <br />
        
            <ul>
            <Navitem item="Frontend" tolink="/"  activec={this.activeitem}></Navitem>
            <Navitem item="Backend" tolink="/backend"  activec={this.activeitem}></Navitem>
            <Navitem item="App Development" tolink="/app-development"  activec={this.activeitem}></Navitem>
            <Navitem item="Database" tolink="/database"  activec={this.activeitem}></Navitem>
            <Navitem item="Regular Expression" tolink="/regex"  activec={this.activeitem}></Navitem>
            <Navitem item="Explain Code" tolink="/Explain-code"  activec={this.activeitem}></Navitem>
            <Navitem item="History" tolink="/history"  activec={this.activeitem}></Navitem>
            </ul>
            </nav>
            )
        }
    }
    
    export default Navbar
    