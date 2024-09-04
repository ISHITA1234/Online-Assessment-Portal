import { Header } from "../components/Header";
import { InputBox } from "../components/InputBox";
import { useParams } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
export function AddAllQuesTestCases(){
    
    const Count = 10;
    const questionsArray = Array.from({ length: Count }, (_, index) => index + 1);
    const testcaseArray = Array.from({ length: Count }, (_, index) => index + 1);
    let addedquestions = [];
    let testcases = [];

    let { day } = useParams();
    
    // console.log("addedquestions",addedquestions);
    // console.log("testcases",testcases);

    const [addedquestion,Setaddedquestion] = useState("");
    const [addedtestcase,Setaddedtestcase] = useState("");
    const [whichtestcase,Setwhichtestcase] = useState("");
    const [whichquestion,Setwhichquestion] = useState("");

    let questionpayload = {
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
    for (let key in questionpayload) {
        if(key=="day")
            {
                questionpayload[key]=Number(day);
            }
        if (key === "question"+ whichquestion) {
            questionpayload[key] = addedquestion;
          
          break; // Exit the loop once the question is found and updated
        }
    }

    //Test Case Payload
    let testpayload ={
        "day":0,
        "question1":{"testcase1": "",
                        "testcase2": "",
                        "testcase3": "",
                        "testcase4": "",
                        "testcase5": "",
                        "testcase6": "",
                        "testcase7": "",
                        "testcase8": "",
                        "testcase9": "",
                        "testcase10": ""
                    },
        "question2":{"testcase1": "",
                        "testcase2": "",
                        "testcase3": "",
                        "testcase4": "",
                        "testcase5": "",
                        "testcase6": "",
                        "testcase7": "",
                        "testcase8": "",
                        "testcase9": "",
                        "testcase10": ""
                    },
        "question3":{"testcase1": "",
                        "testcase2": "",
                        "testcase3": "",
                        "testcase4": "",
                        "testcase5": "",
                        "testcase6": "",
                        "testcase7": "",
                        "testcase8": "",
                        "testcase9": "",
                        "testcase10": ""
                    },
        "question4":{"testcase1": "",
                        "testcase2": "",
                        "testcase3": "",
                        "testcase4": "",
                        "testcase5": "",
                        "testcase6": "",
                        "testcase7": "",
                        "testcase8": "",
                        "testcase9": "",
                        "testcase10": ""
                    },
        "question5":{"testcase1": "",
                        "testcase2": "",
                        "testcase3": "",
                        "testcase4": "",
                        "testcase5": "",
                        "testcase6": "",
                        "testcase7": "",
                        "testcase8": "",
                        "testcase9": "",
                        "testcase10": ""
                    },
        "question6":{"testcase1": "",
                        "testcase2": "",
                        "testcase3": "",
                        "testcase4": "",
                        "testcase5": "",
                        "testcase6": "",
                        "testcase7": "",
                        "testcase8": "",
                        "testcase9": "",
                        "testcase10": ""
                    },
        "question7":{"testcase1": "",
                        "testcase2": "",
                        "testcase3": "",
                        "testcase4": "",
                        "testcase5": "",
                        "testcase6": "",
                        "testcase7": "",
                        "testcase8": "",
                        "testcase9": "",
                        "testcase10": ""
                    },
        "question8":{"testcase1": "",
                        "testcase2": "",
                        "testcase3": "",
                        "testcase4": "",
                        "testcase5": "",
                        "testcase6": "",
                        "testcase7": "",
                        "testcase8": "",
                        "testcase9": "",
                        "testcase10": ""
                    },
        "question9":{"testcase1": "",
                        "testcase2": "",
                        "testcase3": "",
                        "testcase4": "",
                        "testcase5": "",
                        "testcase6": "",
                        "testcase7": "",
                        "testcase8": "",
                        "testcase9": "",
                        "testcase10": ""
                    },
        "question10":{"testcase1": "",
                        "testcase2": "",
                        "testcase3": "",
                        "testcase4": "",
                        "testcase5": "",
                        "testcase6": "",
                        "testcase7": "",
                        "testcase8": "",
                        "testcase9": "",
                        "testcase10": ""
                    }
    }
    for (let obj in testpayload) {
        if(obj=="day")
        {
            testpayload[obj]= Number(day);
        }
        for(let key in testpayload[obj]){
            
            if (key === "testcase"+ whichtestcase) {
                testpayload[key] = addedtestcase;              
                break; // Exit the loop once the question is found and updated
            }
        }
        
    }
    // console.log(testpayload)
    
    return(
        <div>
            <Header label={"Add Questions and Test Cases for Day "+ day}></Header>
            <div className="grid grid-cols-2">
           <div className="ml-6">    
            {/* <label>Write Question to Add</label><br></br>     */}
            {questionsArray.map((buttonNumber) => (
                <div className="" key={`div-${buttonNumber}`}>
                    <label key={`label-${buttonNumber}`}>Write Question {buttonNumber}</label><br></br>                    
                    <textarea key={`input-${buttonNumber}`} className="mb-2 w-60 h-10 border-2 border-black" onChange={e=>{Setaddedquestion(e.target.value);Setwhichquestion(buttonNumber)}} placeholder={"...?"}></textarea><br></br>
                    <button key={`button-${buttonNumber}`}className="mb-6 rounded-full bg-indigo-500 px-8" onClick={async()=>{
                        axios.post("http://localhost:3000/api/v1/admin/updatequestions", questionpayload).then(()=>{window.alert("Questions Updated Successfully");});
                            // { headers: { 'Content-Type': 'application/json' }, data: questionpayload });
                        // console.log(questionpayload);
                        // window.alert("Are you sure You want to submit test case?")
                        // Setupdatedtestcase("");
                        // navigate('/day/'+day);
                    
                    }}>Add Question {buttonNumber}</button>
                </div>             
                
            ))}
            </div>
            {/* <div>
            {testcaseArray.map((buttonNumber) => (
                <div className="" key={`div-${buttonNumber}`}>
                    <label key={`label-${buttonNumber}`}>Write Test cases {buttonNumber}</label><br></br>                    
                    <textarea key={`input-${buttonNumber}`} className="mb-2 w-60 h-10 border-2 border-black" onChange={e=>{Setaddedtestcase(e.target.value);Setwhichtestcase(buttonNumber)}} placeholder={"...?"}></textarea><br></br>
                    <button key={`button-${buttonNumber}`}className="mb-6 rounded-full bg-indigo-500 px-8" onClick={async()=>{
                        axios.post("http://localhost:3000/api/v1/admin/updatetestcases", testpayload);
                        console.log(testpayload);
                        // window.alert("Are you sure You want to submit test case?")
                        // Setupdatedtestcase("");
                        // navigate('/day/'+day);
                    
                    }}>Add test case {buttonNumber}</button>
                </div>             
                
            ))}
                
            </div> */}
        </div>
        </div>
        
    )
}