import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";
import {faUser,faBars, faHome, faBackwardStep } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Sidebar } from './Sidebar';


export function AppBar({user, role}){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);  
    const [questionstate, setQuestion] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [enableAssignmnet, setEnabilityAssignmnet] = useState([]);
    const userId = localStorage.getItem("user_id");

    let firstName = localStorage.getItem("firstName");
    // Function to toggle the state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
    const [day, setDay] = useState(0);
    // console.log(questionstate)

    const navigate = useNavigate();
    //On load of component    
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
            const group = localStorage.getItem("group");
            if(group!=undefined)
            {                const enableAssigns = await axios.get("http://localhost:3000/api/v1/admin/enableAssignment", 
                {
                    // headers:{
                    //         Authorization:"Bearer "+localStorage.getItem("token")
                    // }
                }
                );
                // ...
                
                const groupItem = enableAssigns.data.find(item => item.Group === group);
                setEnabilityAssignmnet(groupItem);  
            }
                      
        }
        fetchData();
        }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        };

    let qr= [
        {
            "_id": "6678135096d8ca35eb70cb8c",
            "day": 1,
            "question1": "updated q1",
            "question2": "updated q1",
            "question3": "updated q1",
            "question4": "updated q1",
            "question5": "updated q1",
            "question6": "updated q1",
            "question7": "updated q",
            "question8": "updated q",
            "question9": "updated q1",
            "question10": "updated q",
            "__v": 0
        },
        {
            "_id": "6678135696d8ca35eb70cb91",
            "day": 2,
            "question6": "This is question 1",
            "question7": "This is question 1",
            "question8": "This is question 1",
            "question9": "This is question 1",
            "__v": 0
        },
        {
            "_id": "66782f9979c147fee3014ecd",
            "day": 3,
            "question1": "This is question 1",
            "question2": "This is question 1",
            "question3": "This is question 1",
            "question4": "This is question 1",
            "question5": "This is question 1",
            "question6": "This is question 1",
            "question7": "This is question 1",
            "question8": "This is question 1",
            "question9": "This is question 1",
            "question10": "This is question 1",
            "__v": 0
        }
    ]

    function logoutAction(){
        let token = localStorage.getItem("token");
        localStorage.removeItem(token);
        window.location.href ="/cmnpLab";
    }
    return (
        <>
            <div className='bg-gray-800'>
                <button className="open-btn" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} className="h-5 w-10 text-white"/>
                </button>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} role={"admins"}/> 
            </div>            

            <div className="flex justify-between bg-gray-800 text-white"> 
            <div className="ml-2"><button onClick={()=>{navigate(-1)}}><FontAwesomeIcon icon={faBackwardStep} title='Go Back' className="h-5 w-10"/></button></div>   
            <div className="ml-2"><button onClick={()=>{(role=="admin")?navigate("/adminhome"):navigate("/home")}}><FontAwesomeIcon icon={faHome} title='Go Back to Home Page' className="h-5 w-10"/></button></div>                                       
                <div>                  
                {questionstate.map((item, index) => (
                    userId == "6676a97376f145fabc0289d9"?
                    <button key={index} className="rounded-full bg-gray-800 text-white px-8 mr-2 ml-2" onClick={event =>  {{window.location.href='/day/'+item.day}}}>
                    Day {item.day}
                    </button>
                    :
                    enableAssignmnet[`D${item.day}`]=="1"?
                    <button key={index} className="rounded-full bg-gray-800 text-white px-8 mr-2 ml-2" onClick={event =>  {{window.location.href='/day/'+item.day}}}>
                    Day {item.day}
                    </button>
                    :
                    <button></button>
                ))}
                </div>
                
                {/* <div><button className="rounded-full bg-indigo-500 px-8" onClick={event =>  {window.location.href='/day'}}>Day1</button></div>
                <div><button>Day2</button></div>
                <div><button>Day3</button></div>
                <div><button onClick={event =>  {window.location.href='/home'}}>Home</button></div>             */}
                <div className="flex justify-between space-x-1 mr-20">
                    <div>Hello {firstName}!</div> 
                    <div className="h-7 w-7 rounded-full bg-gray-400 position: relative"><button onClick={toggleExpand}><FontAwesomeIcon icon={faUser} className="h-7 w-7" viewBox="-150 -100 800 800" /></button>{isExpanded && (
                        <div className="mt-1 w-20 border bg-gray-500 font-bold text-white text-xs mr-2 p-2">
                        <div className="mb-2"><a href="/Submission_students">Your Profile</a></div>
                        <div className="mb-2 hover:cursor-pointer"><a onClick={logoutAction}>Logout</a></div>
                        </div>)}
                    </div>
                </div>
            </div>
        </>          
    )
}
