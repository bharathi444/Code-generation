
import React, { Component,useState} from "react";
import ChatbotPackage from "../CodeEditor/CodeEditor";
import {ProgrammingLanguagesList} from "../CodeEditor/DropdownValues"
import Select from "react-select";
import historyIcon from "../img/history1.png"
import ChatbotPackageExplain from "../CodeEditor/CodeEditorExplain";
import { useHistory } from 'react-router-dom';
export default function CommonEditor({category}) {
  
  console.log(ProgrammingLanguagesList , "programming")
    const options =ProgrammingLanguagesList.filter((item) => item.category === category);
      const [selectedOption, setSelectedOption] = useState( options[0]);
      console.log("nkfjkg",selectedOption)
      const history = useHistory();
  return (
    <div>
          <div>
        
        <div className="condiv">
          {category !== "True" && <>
          <div className="chat-header">
            {" "}
           <div style={{marginLeft:'3%',fontWeight:'500'}}>Select Your Programming Language</div>
          <div style={{marginLeft:'3%'}}>
          <Select
                
                  defaultValue={options[0]}
                  options={options}
                  onChange={(values) => setSelectedOption(values)}
                />
          </div>
         
         
    
          </div>
          </>}
          
        
         
          {category !== "True" &&  
           <div style={{ zIndex: 0, position: "relative", marginTop: "7%" }}>
           <hr></hr>
        <ChatbotPackage selectedLanguage={selectedOption}  selectedCategory = {category}  />
        </div>}
          {category === "True" &&  <ChatbotPackageExplain />}
            
            

       
        </div>
      </div>
    </div>
  )
}
