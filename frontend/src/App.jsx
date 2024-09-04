import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import {SignUp} from "./Pages/SignUp"
import {SignIn} from "./Pages/SignIn"
import {AdminHome} from "./Pages/AdminHome"
import {Day} from "./Pages/Day"
import {AddQuestionsTestCases} from "./Pages/AddQuestionsTestCases"
import {UpdateQuestionsTestCases} from "./Pages/UpdateQuestionsTestCases"
import {StudentsUpload} from "./Pages/StudentsUpload"
import { Home } from './Pages/Home';
import { AddAllQuesTestCases } from './Pages/AddAllQuesTestCases';
import { useState } from "react";
import {ShowTestCases} from "./Pages/ShowTestCases";
import { SubmissionPage } from './Pages/SubmissionPage';
import {AdminSubmissionPage} from './Pages/AdminSubmissionPage'
import { About } from './Pages/About';
import { Contact } from './Pages/Contact';

function App() {  
  
  return ( 
          <BrowserRouter>
                        
                        {/* Main page Comp = ('/') */}
                        <Routes>       
                          <Route path="/signup" element={<SignUp/>}/>
                          <Route path="/signin" element={<SignIn/>}/>
                          <Route path="/adminhome" element={<AdminHome/>}/>
                          <Route path="/day/:id" element={<Day/>}/>
                          {/* <Route path="/day" element={<Day/>}/> */}
                          <Route path="/addallquestionstestcases/:day" element={<AddAllQuesTestCases/>}/>
                          <Route path="/addquestionstestcases/:question" element={<AddQuestionsTestCases/>}/>
                          <Route path="/updatequestionstestcases/:day/:question" element={<UpdateQuestionsTestCases/>}/>
                          <Route path="/studentsupload" element={<StudentsUpload/>}/>
                          <Route path="/home" element={<Home/>}/>
                          <Route path="/showTestCases/:day/:question/:queryParams" element={<ShowTestCases/>}/>
                          <Route path='/Submission_students' element={<SubmissionPage/>}/>
                          <Route path='/Submission_students_Admin' element={<AdminSubmissionPage/>}/>
                          <Route path='/cmnpLab' element={<About/>}/>
                          <Route path='/contact' element={<Contact/>}/>
                        </Routes>
    </BrowserRouter>     
  )
}

export default App
