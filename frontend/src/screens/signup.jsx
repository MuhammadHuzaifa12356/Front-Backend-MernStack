import { useState } from "react";
import SMInput from "../components/SMinput";
import { Post } from "../config/apimethods";



export default function Signup(){
  const [inputdata,setinputdata]=useState([])
   const signup=()=>{
       Post('/user/signup',inputdata).then((response)=>{
        console.log(response.inputdata);
        alert("signup successfully")
       }).catch((error)=>{
        console.log(error);
       })
   }

   return(<>
    
    <div className="container p-5 text-center">
    <div className="row">
        <div className="md-6">
            <div className="p-2">
            <SMInput type="text" onChange={(e)=>setinputdata({...inputdata,userName:e.target.value})} label="UserName"/>

            </div>
            <div className="p-2">
            <SMInput type="email"  onChange={(e)=>setinputdata({...inputdata,email:e.target.value})}label="email"/>

            </div>
            <div className="p-2">
            <SMInput  type="password" onChange={(e)=>setinputdata({...inputdata,password:e.target.value})} label="Pasword"/>
            </div>
           
            <div className="p-4">
            <button  className="btn btn-primary"   onClick={signup} >Submit</button>

            </div>
        </div>
    </div>
   </div>
    
    
    </>)
}