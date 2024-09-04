import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { InputBox } from "../components/InputBox";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft, faBackward, faCross, faHome, faStepBackward, faXmark } from '@fortawesome/free-solid-svg-icons';

import { AppBar } from "../components/AppBar";
export function UpdateQuestionsTestCases(){
    const [updatedquestion,Setupdatedquestion] = useState("");
    const [updatedtestcase,Setupdatedtestcase] = useState("");
    const [whichtestcase,Setwhichtestcase] = useState("");    
    const [testcase, SetTestCases] = useState({});
    const navigate = useNavigate();
    let { day, question } = useParams();
    const [dayrequested, SetDayRequested] = useState({});
    let questionnumber = "question" +question;
    // console.log("question:",question)
    const questionNumber = Number(question.match(/\d{1,2}$/)[0]);
    // console.log("numvver:",day)
    
    let payload ={
        "day":0,
        "question1": "",
        "question2": "",
        "question3": "",
        "question4": "",
        "question5": "",
        "question6": "",
        "question7": "",
        "question8": "",
        "question9": "",
        "question10": ""
        
    }
    for (let key in payload) {
        if(key=="day")
            {
                payload[key]=Number(day);
            }
        if (key === question) {
          payload[key] = updatedquestion;
          
          break; // Exit the loop once the question is found and updated
        }
    }
    let questionday={};

    useEffect(() => {        
        async function fetchData() {
            // You can await here
            questionday = await axios.get("http://localhost:3000/api/v1/admin/getquestions?day="+Number(day));
            let dayId = await questionday.data._id
            // console.log("questionnumber",question)
            console.log("wwqqqqwww-1",questionday.data.day)
            // let question = "question1"
            // console.log("question",question)
            console.log("wwqqqqwww-2",questionday.data.question1)
            SetDayRequested(await questionday.data);
            console.log("State question:",dayrequested);  
            const response = await axios.get("http://localhost:3000/api/v1/admin/gettestcases?dayId="+ dayId+"&question="+question);
            SetTestCases(await response.data);
            // console.log("testcase display%%%%%%",response.data);       
            console.log("State testcase:", testcase)
            //call the test case results of students 
        }
        fetchData();
    }, []);  

    //Test Case Payload
    let testpayload ={
        "day":Number(day),
        "question":question,
        "testcase": "testcase"+ whichtestcase,
        "updatewithvalue":updatedtestcase
    }
    
    
    let testcases = [];
    const testcaseCount = 10;
    const testcaseArray = Array.from({ length: testcaseCount }, (_, index) => index + 1);
    return(
        <div>
            <AppBar role="admin"></AppBar>
            <Header label={"Update Questions and Test Cases"}></Header>
            
            <div className="grid grid-cols-2">  
                    {/***********************Start: Update Question *************************************************/}   
                    <div className="ml-6">    
                        <label className="font-bold underline">Update Question -- {question}</label><br></br>    
                        <textarea className="border-2 border-black shadow-xl bg-slate-200 rounded w-96 h-80 mt-6 mb-6" onChange={e=>{Setupdatedquestion(e.target.value)}}  placeholder={"...?"} defaultValue={dayrequested[question]}></textarea><br></br>
                        <button className="rounded-full bg-teal-500 px-8" onClick={async()=>{
                                    // window.confirm("Are you sure you want to update this question?");
                                    window.alert("Are you sure you want to update this question?");
                                    const studentsmarks = axios.post("http://localhost:3000/api/v1/admin/updatequestions", payload
                                //     {
                                //         // headers:{
                                //         //         Authorization:"Bearer "+localStorage.getItem("token")
                                //         // }
                                //     }
                                ).then(()=>{window.alert("Questions Updated Successfully");navigate('/day/'+day);});
                                // console.log(payload);                             
                                
                                }}>Update</button>
                    </div>
                    {/***********************End: Update Question *************************************************/}  

                    {/***********************Start: Update Test Case *************************************************/}
                    <div>                    
                        <label className="font-bold underline">UPDATE TEST CASES</label><br></br>
                        <label>[ Write testcases like eg,</label><br/><label>Input:2,3</label><br/><label>Output:6 ]</label>       
                        
                        {Object.entries(testcase).map(([key,value])=>(
                            value==""?<div></div>:
                            <div> 
                                <label className="font-bold" key={`label-${key}`}>Write Test cases {Number(key.match(/\d{1,2}$/)[0])} for this question</label><br></br> 
                                <textarea key={`input-${key}`} className="mb-2 w-60 h-10 border-2 border-black" onChange={e=>{Setupdatedtestcase(e.target.value);Setwhichtestcase(Number(key.match(/\d{1,2}$/)[0]))}} placeholder={"...?"}>{value}</textarea><br></br>
                                <button key={`button-${key}`}className="mb-6 rounded-full bg-teal-400 px-8" onClick={async()=>{
                                    // window.confirm("Are you sure You want to submit test case?");
                                    window.alert("Are you sure You want to submit test case?");
                                    axios.post("http://localhost:3000/api/v1/admin/updatetestcases", testpayload).then(()=>{
                                        window.alert("Test cases updated successfully");
                                    });                            
                                }}>Update test case {key}</button>
                            </div>
                        ))}
                    </div>
                    {/***********************End: Update Test Case *************************************************/}
            </div>




            {/***********************Start: Add Test Case *************************************************/}
            <label className="font-bold underline text-center">ADD TEST CASES</label><br></br>
            <div className="flex justify-between">
                {Object.entries(testcase).map(([key,value])=>(                        
                    value!=""?<div></div>:
                    <div>                     
                        <label key={`label-${key}`}>Write Test cases {Number(key.match(/\d{1,2}$/)[0])}</label><br></br> 
                        <textarea key={`input-${key}`} className="mb-2 w-60 h-10 border-2 border-black" onChange={e=>{Setupdatedtestcase(e.target.value);Setwhichtestcase(Number(key.match(/\d{1,2}$/)[0]))}} placeholder={"...?"}>{value}</textarea><br></br>
                        <button key={`button-${key}`}className="mb-6 rounded-full bg-teal-400 px-8" onClick={async()=>{
                            // window.confirm("Are you sure You want to submit test case?");
                            window.alert("Are you sure You want to submit test case?");
                            axios.post("http://localhost:3000/api/v1/admin/updatetestcases", testpayload).then(()=>{
                                window.alert("Test cases updated successfully");
                            });              
                        }}>Add test case {key}</button>
                    </div>
                ))}
            </div>                    
            {/***********************End: Add Test Case *************************************************/}                
            
        </div>
        
        
    )
}