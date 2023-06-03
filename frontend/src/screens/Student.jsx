import { useEffect, useState ,} from "react";
import { Delete, Get, Post, Put } from "../config/apimethods";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router";
import ReactPaginate from "react-paginate";

export default function Student(){
  //get data from api
  const [data,setdata]=useState([])
  let limit=3;
  useEffect(()=>{
      Get(`/student`).then((response)=>{ 
        setdata(response.data.data)

    }).catch((error)=>{
        console.log(error);
    }
    )
    
   
  },[])
  // Delte data from api
  const Deletedata = (id)=>{
      Delete("/student",id ).then(()=>{
        alert("successfully deleted")
      }).catch((error)=>{
        console.log(error);
      })
     }
     //edit data from api
    const editdata=(id)=>{
      const updatedData = prompt("Enter the updated data:");
      if (updatedData) {
        const body = { firstName: updatedData };
      Put("/student",id,body).then((response)=>{

      }).catch((error)=>{
        console.log(error);
      })
    }  }
    //move to addform page
    const navigate =useNavigate()
    const postdata=()=>{
        navigate("/addform")
    }
    //pagination

        const fetchdata=async(currentpage)=>{
          const res = await fetch(`http://localhost:4000/api/student?page=${currentpage}&limit=${limit}`);
          const data1=await res.json();
          return data1;
       
         }
   
 const handlepageclick= async(data)=>{
          console.log(data.selected);
          let currentpage=data.selected+1;
          const databasedata= await fetchdata(currentpage)
          setdata(databasedata.data);

 }
    return(<>
    <div className="text-center p-4">
    <button className="btn btn-primary" onClick={postdata} >ADD
    </button>
     <div className="  p-4 my-2">
  
     <ReactPaginate
            previousLabel={'prev'}
            nextLabel={'NEXT'}
            breakLabel={'...'}
            pageCount={10}
            // marginPagesDisplayed={2}
            // pageRangeDisplayed={2}
            onPageChange={handlepageclick}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}  
            activeClassName={'active'}
              />
     </div>
    </div>
     
        <div className="d-flex ">
      
       {
        
         data.map((x,i)=>{
            return(
                <>
                <div className=" p-5 col-sm-6 col-md-4 v ">
                <div key={i} >
                  <div className=" shadow bs-dark-border-subtle my-2  ">
                     <h4 className="text-danger">{x._id}</h4>
                      <h4 className="">FirstName: {x.firstName}</h4>
                      <h4>LastName: {x.lastName}</h4>
                      <h4>Contact:  {x.contact}</h4>
                      <h4>Course: {x.course}</h4>
                      <div className="p-2 text-center">
                      <button className="m-2 btn btn-danger" onClick={()=>Deletedata(x._id)} >Delete</button>
                      <button className="m-2 btn btn-warning" onClick={()=>editdata(x._id)}>Edit</button>
                      </div>
                   
                  </div>
                </div>
              
                </div>
                
                </>
            );
        })
       }
          
         </div>
    </>);
    
}
