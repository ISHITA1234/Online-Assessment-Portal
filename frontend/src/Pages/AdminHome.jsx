import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { ProductTable } from "../components/ProductTable";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { parseString } from 'xml2js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown, faPlusCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import Footer from "../components/Footer";


export function AdminHome(){
    const [marks, setMarks] = useState([]);
    const [questions, setQuestion] = useState([]);
    // console.log(marks)
    const navigate = useNavigate();
    
    //On load of component    
    useEffect(() => {
    async function fetchData() {
        // You can await here
        const studentsmarks = await axios.get("http://localhost:3000/api/v1/student/getmarks", 
        {
            headers:{
                    Authorization:"Bearer "+localStorage.getItem("token")
            }
        }
        );
        // ...
        setMarks(studentsmarks.data);
    }
    fetchData();
    }, []);

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
            // ...
            setQuestion(response.data);
    }
    fetchData();
    }, []);
    
    //preparing payload for next day Questions and test cases
    let questionpayload = {
        "day":Number(questions.length)+ Number(1),
        "question1": "null",
        "question2": "null",
        "question3": "null",
        "question4": "null",
        "question5": "null",
        "question6": "null",
        "question7": "null",
        "question8": "null",
        "question9": "null",
        "question10": "null"
        
    }


    const handleDownload = () => {
        const worksheet = XLSX.utils.json_to_sheet(marks);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const xlsxData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
        const blob = new Blob([xlsxData], { type: 'application/octet-stream' });
        saveAs(blob, 'products.xlsx');
    };

    const handleAlert = () => {
        const userConfirmed = window.confirm("Are you sure you want to Add questions for new Day?");
    
        if (userConfirmed) {
          // User clicked Yes (OK)
        //   console.log('User clicked Yes');
          // Action on yes
          navigate("/addallquestionstestcases/" + String(Number(questions.length)+ Number(1))); 
          axios.post("http://localhost:3000/api/v1/admin/addquestions", questionpayload);
        //   console.log("payload for next question:", questionpayload);
          
        } else {
          // User clicked No (Cancel)
        //   console.log('User clicked No');
          // Perform actions for No response here
        }
      };

    return(
        <>
        <AppBar role='admin'></AppBar>        
         {/* <ProductTable products={marks} />         */}
        <div className="ml-10 text-center md:text-center mt-20">
            <label className="text-4xl font-bold">Computer Methods and Numerical Programming Lab</label>
            <label className="text-4xl font-bold"> (ETCE UG1)</label>           
            <div className="text-xl"><label className="font-bold underline">Instructor:</label> Ananda S. Chowdhury</div>
            <div className="text-xl"><label className="font-bold underline">TA: </label>Arijit De, Sevakram Kumbhare</div>
            <div className="text-xl"><label className="font-bold underline">Lab timings:</label> 2:30PM to 5:30PM</div>
        </div>
        <div className='flex justify-end mt-5'>           
            <div><button className="rounded-full bg-gray-600 text-white px-8 mr-2" onClick={()=>{window.location.href ="/Submission_students_Admin"}}>Students Submissions</button></div>     
            <div><button className="rounded-full bg-gray-600 text-white px-8 mr-2" onClick={handleAlert}><FontAwesomeIcon icon={faPlusCircle} className="h-4 w-10"/>Add New Assignment</button></div>
            {/* <div>                    
                    <button className="rounded-full bg-green-400 px-8 mr-2" onClick={handleDownload}><FontAwesomeIcon icon={faFileArrowDown} className="h-5 w-10"/>Download Excel</button>
            </div> */}
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
                        <td className={(questions.some(obj => obj.day==1))?"text-blue-500 underline":""}><a href={(questions.some(obj => obj.day==1))?"/day/1":""}>Basics</a></td>
                        <td>-</td>
                    </tr>
                    <tr  className="border border-gray-300">
                        <td>2</td>
                        <td className={(questions.some(obj => obj.day==2))?"text-blue-500 underline":""}><a href={(questions.some(obj => obj.day==2))?"/day/2":""}>Conditional Statement</a></td>
                        <td>-</td>
                    </tr>
                    <tr  className="border border-gray-300">
                        <td>3</td>
                        <td className={(questions.some(obj => obj.day==3))?"text-blue-500 underline":""}><a href={(questions.some(obj => obj.day==3))?"/day/3":""}>Loops</a></td>
                        <td>-</td>
                    </tr>
                    <tr  className="border border-gray-300">
                        <td>4</td>
                        <td className={(questions.some(obj => obj.day==4))?"text-blue-500 underline":""}><a href={(questions.some(obj => obj.day==4))?"/day/4":""}>Functions</a></td>
                        <td>-</td>
                    </tr>
                    <tr  className="border border-gray-300">
                        <td>5</td>
                        <td className={(questions.some(obj => obj.day==5))?"text-blue-500 underline":""}><a href={(questions.some(obj => obj.day==5))?"/day/5":""}>Arrays and Strings</a></td>
                        <td>-</td>
                    </tr>
                    <tr  className="border border-gray-300">
                        <td>6</td>
                        <td className={(questions.some(obj => obj.day==6))?"text-blue-500 underline":""}><a href={(questions.some(obj => obj.day==6))?"/day/6":""}>Structures and Unions</a></td>
                        <td>-</td>
                    </tr>
                    <tr  className="border border-gray-300">
                        <td>7</td>
                        <td className={(questions.some(obj => obj.day==7))?"text-blue-500 underline":""}><a href={(questions.some(obj => obj.day==7))?"/day/7":""}>Numerical Methods - Root finding methods</a></td>
                        <td>-</td>
                    </tr>
                    <tr  className="border border-gray-300">
                        <td>8</td>
                        <td className={(questions.some(obj => obj.day==8))?"text-blue-500 underline":""}><a href={(questions.some(obj => obj.day==8))?"/day/8":""}>Numerical Methods - Solving simultaneous equations</a></td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>   
        <Footer></Footer>
            
        </>
    )
}