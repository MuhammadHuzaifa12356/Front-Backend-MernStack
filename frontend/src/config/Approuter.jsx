
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Student from "../screens/Student";
import AddForm from "../screens/addform";
import Signup from "../screens/signup";

export default function AppRouter(){

return(<>
 <BrowserRouter>
  <Routes>

    <Route element={<Student/>} path={"student"} />
    <Route element={<AddForm/>} path={"addform"}/>
    <Route element ={<Signup/>} path={'signup'}/>
  </Routes>
  
 </BrowserRouter>

</>)

}