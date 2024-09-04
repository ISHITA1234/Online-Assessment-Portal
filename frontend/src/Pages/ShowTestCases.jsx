import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { ShowTestCase } from "../components/ShowTestCase";
import { OutputContext } from '../OutputContext';
import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft, faBackward, faCross, faHome, faStepBackward, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import { AppBar } from "../components/AppBar";

export function ShowTestCases(){
    //context used
    // const { output} = useContext(OutputContext);
    const [testcase, SetTestCases] = useState({});
    let { day, question, queryParams } = useParams();    
    let dayId = '';
    let questionnumber = "question" +question;
    const navigate = useNavigate();
    
    // const [output, setOutput] =useState({});
    // console.log("pushed queryParams",queryParams);
    // console.log("queryParams type",typeof queryParams);
    let output = JSON.parse(queryParams);
    
    useEffect(() => {        
        async function fetchData() {
            // You can await here
            const questionday = await axios.get("http://localhost:3000/api/v1/admin/getquestions?day="+Number(day));
            dayId = await questionday.data._id
            // console.log(dayId);  
            const response = await axios.get("http://localhost:3000/api/v1/admin/gettestcases?dayId="+ dayId+"&question="+questionnumber);
            SetTestCases(await response.data);
            // console.log(response.data);       
            
            //call the test case results of students 
        }
        fetchData();
    }, []);    
    

    return(<>
    <div>
    <AppBar role="student"></AppBar>
    <div className="flex justify-center">
                    <div className="pt-6 ml-2"><button className="rounded-full bg-white px-8 mr-2" onClick={()=>{navigate(-1)}}><FontAwesomeIcon icon={faBackward} title='Go Back to Questions' className="h-5 w-10"/></button></div> 
                    <div className="pt-6 ml-2"><button className="rounded-full bg-gray-600 text-white px-8 ml-2" onClick={()=>{window.location.href ="/Submission_students"}}>Show All My Submissions</button></div>
                    {/* <div className="pt-6 ml-2"><button className="rounded-full bg-white px-8 mr-2" onClick={()=>{navigate("/home")}}><FontAwesomeIcon icon={faHome} title='Go Back to Home Page' className="h-5 w-10"/></button></div>  */}
                  </div>
            <div className="grid grid-cols-10">
                <ShowTestCase expResult={testcase.testcase1} yourResult={output.output1} testCaseNumber={"1"}/>                               
                <ShowTestCase expResult={testcase.testcase2} yourResult={output.output2} testCaseNumber={"2"}/>
            </div>
            <div className="grid grid-cols-10">
                <ShowTestCase expResult={testcase.testcase3} yourResult={output.output3} testCaseNumber={"3"}/>                               
                <ShowTestCase expResult={testcase.testcase4} yourResult={output.output4} testCaseNumber={"4"}/>
            </div>
            <div className="grid grid-cols-10">
                <ShowTestCase expResult={testcase.testcase5} yourResult={output.output5} testCaseNumber={"5"}/>                               
                <ShowTestCase expResult={testcase.testcase6} yourResult={output.output6} testCaseNumber={"6"}/>
            </div>
            <div className="grid grid-cols-10">
                <ShowTestCase expResult={testcase.testcase7} yourResult={output.output7} testCaseNumber={"7"}/>                               
                <ShowTestCase expResult={testcase.testcase8} yourResult={output.output8} testCaseNumber={"8"}/>
            </div>
            <div className="grid grid-cols-10">
                <ShowTestCase expResult={testcase.testcase9} yourResult={output.output9} testCaseNumber={"9"}/>                               
                <ShowTestCase expResult={testcase.testcase10} yourResult={output.output10} testCaseNumber={"10"}/>
            </div>

        </div>
        <Footer></Footer></>)
}