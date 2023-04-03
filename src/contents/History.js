
import React, { Component,useState,useEffect} from "react";
import ChatbotPackage from "../CodeEditor/CodeEditor";
import {ProgrammingLanguagesList} from "../CodeEditor/DropdownValues"
import Select from "react-select";
import historyIcon from "../img/history1.png"
import ChatbotPackageExplain from "../CodeEditor/CodeEditorExplain";
import { useHistory } from "react-router-dom";
import HistoryData from "../CodeEditor/HistoryEditor";
export default function History({category}) {
  
    const category1 = "True"
  
  console.log(ProgrammingLanguagesList , "programming")
  const options =ProgrammingLanguagesList.filter((item) => item.category === category);
      const [selectedOption, setSelectedOption] = useState( options[0]);
      console.log("selectedOption history",selectedOption)
  



  const navigate = useHistory();
 
  
  return (
    <div>
          <div>
        
        <div className="condiv">
          {category1 === "True" && <>
          <div className="chat-header">
            {" "}
           <div style={{marginLeft:'3%',fontWeight:'500'}}>Hey! Check your chat History...</div>
          <div style={{marginLeft:'3%'}}>
          <Select
                
                defaultValue={options[0]}
                options={options}
                onChange={(values) => setSelectedOption(values)}
              />
         
          </div>
          
        
    
          </div>
          </>}
          
        
         
          
        {category1 === "True" &&  
           <div style={{ zIndex: 0, position: "relative", marginTop: "7%" }}>
           <hr></hr>
        <HistoryData historyCategory = {selectedOption.value}   />
        </div>}
            
            

       
        </div>
      </div>
    </div>
  )
}
