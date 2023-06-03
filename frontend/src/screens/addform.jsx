
import { useEffect, useState } from "react";
import SMInput from "../components/SMinput";
import { Post, Put } from "../config/apimethods";

export default function AddForm(){
    const [inputData, setInputData] = useState([]);
    const addstudent = () => {
        console.log(inputData);
        Post("/student",inputData).then((response)=>{
                   console.log(response );
                   alert("successfully added")
        }).catch((error)=>{
            console.log(error);
        })
      };
    
    
    return(<>
    
    <div className="container p-5 text-center">
    <div className="row">
        <div className="md-6">
            <div className="p-2">
            <SMInput onChange={(e)=>setInputData({...inputData,firstName:e.target.value})} label="First name"/>

            </div>
            <div className="p-2">
            <SMInput  onChange={(e)=>setInputData({...inputData,lastName:e.target.value})}label="LAST NAME"/>

            </div>
            <div className="p-2">
            <SMInput  onChange={(e)=>setInputData({...inputData,contact:e.target.value})} label="Contact"/>
            </div>
            <div>
            <SMInput   onChange={(e)=>setInputData({...inputData,course:e.target.value})} label="Course"/>

            </div>
            <div className="p-4">
            <button  className="btn btn-primary"   onClick={addstudent} >Submit</button>

            </div>
        </div>
    </div>
   </div>
    
    
    </>)
  
} 