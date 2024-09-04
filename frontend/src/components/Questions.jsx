import {ProductRowDay} from './ProductRowDay';
import { Header } from "../components/Header";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross, faHome, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export function Questions({questions, day, role}){
  const [submitted, setSubmission] = useState(false);
  
  // console.log("Inside Questions")
  //   console.log(questions)
    
    let firstObject ={}
    let rows=[];
    const navigate = useNavigate();

    // console.log(Object.keys(questions).length)
    let length = Object.keys(questions).length;
    
    if(Object.keys(questions).length){
      firstObject = questions;
      // console.log(firstObject)
      rows = Object.entries(firstObject).map(([key, value]) => (
        <ProductRowDay day={day} keyName={key} value={value} role={role}/>
      ));
    }

    const handleAlert = () => {
      const userConfirmed = window.confirm('Do you want to proceed?');
  
      if (userConfirmed) {
        // User clicked Yes (OK)
        // console.log('User clicked Yes');
        // TODO: Axios del for question by day to be done here
        
        
      } else {
        // User clicked No (Cancel)
        // console.log('User clicked No');
        // Perform actions for No response here
      }
    };

    const handleAlertSubmission = () => {
      const studentConfirmed = window.confirm('Are you sure you want to submit? Once Submitted cannot be undone.');
  
      if (studentConfirmed) {
        // User clicked Yes (OK)
        // console.log('User clicked Yes');
        // TODO: Axios del for question by day to be done here
        window.alert("Submitted Successfully!!");
        window.location.href='/home'

        //doe not work, TODO:Instead mark this question as submitted from backend
        setSubmission(true);
        
        
      } else {
        // User clicked No (Cancel)
        // console.log('User clicked No');
        // Perform actions for No response here
        window.location.href='/day/'+day
      }
    };

    return (
      <div>
        <Header className="pt-5 pb-5" label={"Question for Day " +day}></Header>    
          <div className="flex justify-center">
                          
              {role=="admin"?
              <div className="flex justify-center">
                  {/* <div className="pt-6 ml-2"><button onClick={()=>{navigate("/adminhome")}}><FontAwesomeIcon icon={faHome} title='Go Back to Home Page' className="h-5 w-10"/></button></div> */}
                  <div className="pt-6 ml-2"><button className="rounded-full bg-orange-300 px-8 mr-2" onClick={()=>{navigate("/addallquestionstestcases/" + day)}}>Update All questions for this Day</button></div>
                  <div className="pt-6 ml-2"><button className="rounded-full bg-red-300 px-8 mr-2" onClick={handleAlert}><FontAwesomeIcon icon={faXmark} className="h-5 w-10"/>Delete this day's Assignment</button></div>
              </div>:
                  <div>
                    <div className='text-red-500 font-bold'>*Note: Submit only if all your questions for the day is uploaded.Once Submitted cannot be undone.</div>
                    <div className="flex justify-center">                    
                    <div className="pt-6 ml-2"><button className="rounded-full bg-gray-600 text-white px-6 ml-2" onClick={()=>{window.location.href ="/Submission_students"}}>Show All My Submissions</button></div>
                    {/* <div className="pt-6 ml-2"><button onClick={()=>{navigate("/home")}}><FontAwesomeIcon icon={faHome} title='Go Back to Home Page' className="h-5 w-10"/></button></div>  */}
                  </div>
                  </div>
                  
              }
               
        </div>  
          <div>
            <table className="ml-5 border-separate border-spacing-2">
              <thead>
                <tr>
                  {/* <th>Key</th>
                  <th>Value</th> */}
                </tr>
              </thead>
              <tbody >{rows}</tbody>
            </table>
        </div>
        <div>
        {role=="admin"? 
           <button className="rounded-full bg-green-500 px-8 mb-10" onClick={event => 
            {
            if(length==13)
            {
              window.alert("Number of questions is restricted to 10 as of now.");
            }else window.location.href='/addquestionstestcases/'+(length-3+1)
            }}>
            Add More Questions for Day
            </button>
            :<div> {submitted ==true?
              <div className='text-red-500 mb-10'>You have submitted this Day's Questions</div>:
              <div>
              <button className="rounded-full font-bold text-white bg-green-500 px-8 mr-2 mb-10 ml-5" onClick={handleAlertSubmission}>Final Submission</button>
              <button className="rounded-full bg-gray-500 px-8 mb-10 text-white" onClick={event =>  window.location.href='/day/'+day}>Refresh All Selections</button>
              <div className='text-red-500 mb-10 font-bold ml-40'>*Note: Submit only if all your questions for the day is uploaded.Once Submitted cannot be undone.</div>
              </div>
              }
              </div>            
            
        } 
              
        </div>
      </div>
      
    )
}