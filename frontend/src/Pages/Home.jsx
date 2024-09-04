import { AppBar } from "../components/AppBar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
export function Home(){  
    const [questions, setQuestion] = useState([]);
    const [enableAssignmnet, setEnabilityAssignmnet] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const response = await axios.get("http://localhost:3000/api/v1/admin/getquestions", 
            {
                // headers:{
                //         Authorization:"Bearer "+localStorage.getItem("token")
                // }
            }
            );
            setQuestion(response.data);
            console.log("Question students:", questions)
            const userId = localStorage.getItem("user_id");
            if(userId!="6676a97376f145fabc0289d9")
            {
                const enableAssigns = await axios.get("http://localhost:3000/api/v1/admin/enableAssignment", 
            {}
            );
            // ...
            const group = localStorage.getItem("group");
            const groupItem = enableAssigns.data.find(item => item.Group === group);
            setEnabilityAssignmnet(groupItem);
            console.log("Group Item:", groupItem.D1)
            let number = "1"
            let j = "D"+number
            console.log()
            console.log("enableAssignmnet Item:", groupItem[1])
            }
            
    }
    fetchData();
    }, []);

    return(
        <>
        <AppBar role="student"></AppBar>
        <div className="pt-6 ml-2"><button className="rounded-full bg-gray-600 text-white px-6 ml-2" onClick={()=>{window.location.href ="/Submission_students"}}>Show All My Submissions</button></div>
        <div className="ml-10 text-center md:text-center mt-20">
            <label className="text-4xl font-bold">Computer Methods and Numerical Programming Lab</label>
            <label className="text-4xl font-bold"> (ETCE UG1)</label>           
            <div className="text-xl"><label className="font-bold underline">Instructor:</label> Ananda S. Chowdhury</div>
            <div className="text-xl"><label className="font-bold underline">TA: </label>Arijit De, Sevakram Kumbhare</div>
            <div className="text-xl"><label className="font-bold underline">Lab timings:</label> 2:30PM to 5:30PM</div>
        </div>
        

        <div className="ml-20 mr-20 text-center md:text-center">
        <div className="text-3xl font-bold center-align underline mt-10">Tentatative Schedule</div>
        </div>
        

        <div className="ml-20 mr-20 mb-20 mt-5 border border-gray-600">
                <table className="w-full text-lg text-left rtl:text-right text-gray-600 dark:text-gray-400">
                <thead className="text-lg bg-gray-500 text-white">
                <tr className="bg-gray-600">
                    
                    <th>Day</th>
                    <th>Assignment</th>
                    <th>Date</th>
                    
                </tr>
                </thead>
                <tbody>
                    <tr  className="border border-gray-300">
                        <td>1</td>
                        <td className={(questions.some(obj => obj.day==1 &&(enableAssignmnet[`D${obj.day}`]=="1")))?"text-blue-500 underline":""}><a href={(questions.some(obj => obj.day==1 &&(enableAssignmnet[`D${obj.day}`]=="1")))?"/day/1":""}>Basics</a></td>
                        <td>-</td>
                    </tr>
                    <tr  className="border border-gray-300">
                        <td>2</td>
                        <td className={(questions.some(obj => obj.day==2 &&(enableAssignmnet[`D${obj.day}`]=="1")))?"text-blue-500 underline":""}><a href={(questions.some(obj => obj.day==2 &&(enableAssignmnet[`D${obj.day}`]=="1")))?"/day/2":""}>Conditional Statement</a></td>
                        <td>-</td>
                    </tr>
                    <tr  className="border border-gray-300">
                        <td>3</td>
                        <td className={(questions.some(obj => obj.day==3 &&(enableAssignmnet[`D${obj.day}`]=="1")))?"text-blue-500 underline":""}><a href={(questions.some(obj => obj.day==3 &&(enableAssignmnet[`D${obj.day}`]=="1")))?"/day/3":""}>Loops</a></td>
                        <td>-</td>
                    </tr>
                    <tr  className="border border-gray-300">
                        <td>4</td>
                        <td className={(questions.some(obj => obj.day==4 &&(enableAssignmnet[`D${obj.day}`]=="1")))?"text-blue-500 underline":""}><a href={(questions.some(obj => obj.day==4 &&(enableAssignmnet[`D${obj.day}`]=="1")))?"/day/4":""}>Functions</a></td>
                        <td>-</td>
                    </tr>
                    <tr  className="border border-gray-300">
                        <td>5</td>
                        <td className={(questions.some(obj => obj.day==5 &&(enableAssignmnet[`D${obj.day}`]=="1")))?"text-blue-500 underline":""}><a href={(questions.some(obj => obj.day==5 &&(enableAssignmnet[`D${obj.day}`]=="1")))?"/day/5":""}>Arrays and Strings</a></td>
                        <td>-</td>
                    </tr>
                    <tr  className="border border-gray-300">
                        <td>6</td>
                        <td className={(questions.some(obj => obj.day==6 &&(enableAssignmnet[`D${obj.day}`]=="1")))?"text-blue-500 underline":""}><a href={(questions.some(obj => obj.day==6 &&(enableAssignmnet[`D${obj.day}`]=="1")))?"/day/6":""}>Structures and Unions</a></td>
                        <td>-</td>
                    </tr>
                    <tr  className="border border-gray-300">
                        <td>7</td>
                        <td className={(questions.some(obj => obj.day==7 &&(enableAssignmnet[`D${obj.day}`]=="1")))?"text-blue-500 underline":""}><a href={(questions.some(obj => obj.day==7 &&(enableAssignmnet[`D${obj.day}`]=="1")))?"/day/7":""}>Numerical Methods - Root finding methods</a></td>
                        <td>-</td>
                    </tr>
                    <tr  className="border border-gray-300">
                        <td>8</td>
                        <td className={(questions.some(obj => obj.day==8 &&(enableAssignmnet[`D${obj.day}`]=="1")))?"text-blue-500 underline":""}><a href={(questions.some(obj => obj.day==8 &&(enableAssignmnet[`D${obj.day}`]=="1")))?"/day/8":""}>Numerical Methods - Solving simultaneous equations</a></td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>   
        <Footer></Footer>
            
        </>
    )
}