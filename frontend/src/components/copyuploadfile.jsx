// import { useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowDown, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import { TestCases } from "./TestCases";
// import { Navigate } from "react-router-dom";
// import React, { useContext } from 'react';
// import { OutputContext } from '../OutputContext';
// import {Spinner} from "./Spinner";
// // import queryString from 'query-string';


// export function UploadFile({ day, question}){
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [selectedFilePath, setSelectedFilePath] = useState("");
//     const [rollNumber,setRollNumber] = useState(0);
//     const [userId, setUserId] = useState("");
//     const [loading, setLoading] = useState(false); // State to manage loading
    
//     const { output,setOutput } = useContext(OutputContext);
//     // console.log("upload files output:", output)
//     // const [uploading, setUploading] = useState(false);
//     const [showTick, setShowTick] = useState(false);
//     const [testcase, SetTestCases] = useState({
//       "testcase1": "",
//       "testcase2": "",
//       "testcase3": "",
//       "testcase4": "",
//       "testcase5": "",
//       "testcase6": "",
//       "testcase7": "",
//       "testcase8": "",
//       "testcase9": "",
//       "testcase10": ""
//   });    
//     const [testcasesPassed,settestcasesPassed] = useState({
//       "question1": 0,
//       "question2": 0,
//       "question3": 0,
//       "question4": 0,
//       "question5": 0,
//       "question6": 0,
//       "question7": 0,
//       "question8": 0,
//       "question9": 0,
//       "question10": 0
//   });
//   const [marks,setmarks] = useState({
//     "question1": 0,
//     "question2": 0,
//     "question3": 0,
//     "question4": 0,
//     "question5": 0,
//     "question6": 0,
//     "question7": 0,
//     "question8": 0,
//     "question9": 0,
//     "question10": 0
//   });
//     let questionNumber = question.match(/\d+$/);
//     let dayId = '';
//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//         setShowTick();
//     };


//     //------------------------------------------------------------------------------------------------------------------------
//     //############################################### Function on Upload & Run ###############################################
//     //------------------------------------------------------------------------------------------------------------------------
//     const handleUpload = () => {
//         if (!selectedFile) {
//         alert("No file selected!");
//         return;
//         }
//         // setShowTick(true);

//         //compile file to 1o testcases
//         async function compilation(testcase1,question){ 
//           setLoading(true);
//           let formattedNumbers = "";         
//           let outputlist = {
//             output1:"", output2:"", output3:"", output4:"", output5:"", 
//             output6:"", output7:"", output8:"", output9:"", output10:""
//             }
          
//           /*################ For Each test case, Inputs of each teast case is fed into the post call along with the c file, 
//           then an output is fetched as a response of this call.This output is now compared and graded with the Output for this test case.*/
//           for (let i = 1; i < 11; i++) 
//           {
//             if(testcase1["testcase"+i]!="")
//             {
//             // console.log("///////////Compile-------",i);
//             let inputText = testcase1["testcase"+i]
//             // console.log("inputtext:",inputText)

//             //##############  Formatting the input params for Post call "http://localhost:3000/api/v1/student/upload"
//             // 1. Simple Code
//             if(!inputText.startsWith("Input:"))
//             {
//               console.log("Simple output", inputText);
//             }
//             //2. Calculation code
//             else if(inputText.startsWith("Input:")){
//               // Extract the part of the string after "Input:"
//               let inputPart = inputText.split('Input:')[1];
//               // Split the input part to isolate the numbers and remove any newlines or spaces
//               let numbersPart = inputPart.split('\n')[0].trim();
//               // Replace the comma with a space
//               formattedNumbers = numbersPart.replace(',', ' ');
//             }

//             // Populating file and testInput params for Post call "http://localhost:3000/api/v1/student/upload"
//             const formData = new FormData();
//             formData.append('file', selectedFile);
//             formData.append('testInput', formattedNumbers);
//             // console.log("formdata--"+i+":"+formData);
    
//             // Compile the uploaded file with backend function call
//             try {
//                 await axios.post('http://localhost:3000/api/v1/student/upload', formData, {
//                           headers: {
//                               'Content-Type': 'multipart/form-data',
//                               'Authorization': "Bearer " + localStorage.getItem("token") // Replace YOUR_TOKEN_HERE with your actual token
//                           }
//                       }).then(async response => {
//                         // console.log("output---"+i+":"+response.data.output);

//                         //populating each output of outputlist from response
//                         outputlist["output"+i]=response.data.output;
//                         //1. setting the state variable for filepath uploaded, from response
//                         setSelectedFilePath(response.data.filePath?response.data.filePath:"filepath not updating");                        
//                         //2. setting the userid of the student from response
//                         // let userId= response.data.userId;
//                         setUserId(response.data.userId);
//                         // console.log(outputlist);
//                         //3. setting output list
//                         setOutput(await outputlist);
//                         // console.log("state var output:", output);
//                         //4. Show tick when upload and compilation are successful
//                         setShowTick(true); 
//                       });
//             }
//             catch (error) {
//                 console.error(`Error in iteration ${i + 1}: ${error.response ? error.response.data.error : error.message}`);   
//             }
//           }
//           }
        
//         //##################### Calcualting Marks
//         await calculateMarks(output, outputlist);

//         //disabling Spinner
//         console.log("Before spinner set")
//         setLoading(false);
//         }


//         //------------------------------------------------------------------------------------------------------------------------
//         //############################################## Marks Calculation #########################################
//         //------------------------------------------------------------------------------------------------------------------------
//         //function for marks calculation:// 
//         async function calculateMarks(output1, output) {             //testcase,output,userId,selectedFilePath
            
//             let marksgot = 0;
//             let testcases_passed = 0;
//             let validtestcases = 0;

//             axios.get("http://localhost:3000/api/v1/admin/gettestcases?dayId="+ dayId+"&question="+question).then(async res=>{
//               await SetTestCases(res.data);

//               //1. Number of Valid testcases
//               for (let i = 1; i < 11; i++) {            
//                 if(res.data["testcase"+i]!="") {
//                     validtestcases = validtestcases + 1;
//                 }
//               }

//               //2. testcase passed
//               for (let i = 1; i < 11; i++) {              
//                 if(res.data["testcase"+i]!="")
//                 {
//                   // console.log("###",testcase["testcase"+i].match(/\d+$/));
//                   // console.log("@@@@",testcase["testcase"+i].match(/\d+$/));

//                   if(output["output"+i]==res.data["testcase"+i])
//                     {
//                       testcases_passed = testcases_passed + 1;
//                     }  
//                   else if(output["output"+i]==res.data["testcase"+i].split("Output:")[1])
//                     {
//                       testcases_passed = testcases_passed + 1;
//                     }        
//                 }
//               }
//               // 3. marksgot
//               marksgot = (testcases_passed/validtestcases)*100;
//               marks[question]=marksgot;
//               testcasesPassed[question] = testcases_passed;
//               setmarks(marks);
//               settestcasesPassed(testcasesPassed);

//               //4. get rollnumber  & group of student                     
//               const response_roll = await axios.get('http://localhost:3000/api/v1/user/bulk?userId='+ userId, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': "Bearer " + localStorage.getItem("token") // Replace YOUR_TOKEN_HERE with your actual token
//                 }
//               });

//               //5. get current date and time
//               var currentdate = new Date();                     
//               var datetime = currentdate.getFullYear() + "-"
//                               + String(currentdate.getMonth()+1).padStart(2,'0') + "-" 
//                               + String(currentdate.getDate()).padStart(2,'0') + "T"  
//                               + String(currentdate.getHours()).padStart(2,'0') + ":"  
//                               + String(currentdate.getMinutes()).padStart(2,'0') + ":"   
//                               + String(currentdate.getSeconds()).padStart(2,'0') + "Z";
//               // console.log("new", datetime)

//               // populating payload
//               let studentdetailspayload = {                         
//                 "rollNumber": response_roll.data.rollNumber,
//                 "group": response_roll.data.group,
//                 "day":Number(day),
//                 "question": Number(questionNumber),
//                 "fileUploadPath":selectedFilePath,
//                 "marks": Number(marksgot),
//                 "numberOfTestCasesPassed":Number(testcases_passed),
//                 // "uploadDateTime": "2020-01-01T00:00:00Z",
//                 "uploadDateTime":datetime
//               }
              
//               //if entry for this question + day is in studentdetails table then update 
//               await axios.post('http://localhost:3000/api/v1/student/createSingleEntryInStudentsDetails', studentdetailspayload, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': "Bearer " + localStorage.getItem("token") // Replace YOUR_TOKEN_HERE with your actual token
//                 }
//               }).then(async function(response){   
//                 // console.log("Create pass response:", response.data.message);
                
        
//               }).catch(async error=>{
//                 // console.log("Create fail response:", error.response.data.message)
//                 if(error.response.data.message== "Entry for this day+question already taken, please update now")
//                   {
//                     //Post marks
//                     await axios.post('http://localhost:3000/api/v1/student/updateMarks', studentdetailspayload, {
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'Authorization': "Bearer " + localStorage.getItem("token") // Replace YOUR_TOKEN_HERE with your actual token
//                         }
//                     }).then(response => {
//                     }).catch(error=>{
//                       // console.log("Marks Updated")
//                     });
//                   }
//                   else{
//                     // console.log("other errors")
//                     // console.log(selectedFilePath)
//                   }
//               });
                          
//             });                  
//         }


//         //------------------------------------------------------------------------------------------------------------------------
//         //############################## TestCases fetch for this question #########################
//         //------------------------------------------------------------------------------------------------------------------------
//         //TestCases fetch for this question
//         async function fetchData() {
//           // You can await here
//           const questionday = await axios.get("http://localhost:3000/api/v1/admin/getquestions?day="+Number(day));
//           dayId = await questionday.data._id
//           // console.log("Question found",dayId);  
//           await axios.get("http://localhost:3000/api/v1/admin/gettestcases?dayId="+ dayId+"&question="+question).then(res=>{
//             SetTestCases(res.data);
//             // console.log("testcases found",testcase);         
//             compilation(res.data,question);            
//           });              
//         }



//         fetchData();
//         console.log("hi there:!!!!!",testcase) 
//         console.log("end of uploadfiles ourput")      

//     }

//     return(
//       <div className={loading?'opacity-50 pointer-events-none':""}>
//         {loading && <Spinner />}
//         {showTick && <button className="rounded-full bg-teal-300 px-2"><FontAwesomeIcon icon={faArrowDown} className="" /></button>}
//         <input type="file" onChange={handleFileChange} />
//         <button className="rounded-full bg-teal-300 px-8" onClick={handleUpload}>
//           Upload & Run
//         </button>
//         {/* {selectedFile && (
//           <div>
//             <p>Selected file: {selectedFile.name}</p>
//           </div>
//         )} */}
//         {showTick && (
//         <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500" />
//         ) && (<TestCases output={output} expResult={testcase}/>)
//         }       
//         {/* <label>{output.output1}</label> */}
        
//         <button className="rounded-full bg-blue-300 px-8 ml-2" onClick={()=>{
//           console.log(output);
//           const queryParams = JSON.stringify(output);
//           console.log("/showTestCases/"+day+"/"+questionNumber+"/"+ queryParams)
//           window.location.href = "/showTestCases/"+day+"/"+questionNumber+"/"+ queryParams}}>Show Hidden Test Cases
//         </button>        
//         {/* <TestCases output={output} expResult={testcase}/>         */}
//       </div>)
// }