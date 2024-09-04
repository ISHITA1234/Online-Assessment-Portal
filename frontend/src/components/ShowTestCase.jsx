import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export function ShowTestCase({expResult, yourResult, testCaseNumber}){
    // const [a,b] = useState({});
    console.log("expResult:",expResult)   
    let status = 'Pending - Evaluate your answer in the previous page';
    console.log("yourResult:",yourResult) 
    console.log("testcasenumber:", testCaseNumber)
    if (yourResult && expResult){
        if(expResult.startsWith("Input:")){
            if(expResult.split('Output:')[1].trim()==yourResult){
                status = 'Pass'
            }
            else{ status='Fail'; console.log("a", expResult.split('Output:')[1].trim()); console.log("b",yourResult)}
        }
        else{
            if(expResult==yourResult){
                status = 'Pass'
            }
            else{ status='Fail'; console.log("a", expResult.match(/\d+$/)); console.log("b",yourResult)}
        }
        
    }
    

    
    return (<div className="col-span-5 border m-2">
                   
                    {expResult==""?<></>: 
                    <div>
                     <label className="text-center">Test Case {testCaseNumber} || {status=='Pass'?<FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />:status=='Fail'?<FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />:status}                
                    </label> 
                    <div className="grid grid-cols-2 gap-2">                        
                        <div className="bg-white p-5 shadow-md">
                            <label>Expected Output:</label>
                            <br/>
                            <textarea placeholder="Your test" disabled defaultValue={expResult}></textarea>
                        </div>
                        {
                            status=='Pass'?
                            <div className="bg-green-500 p-5 shadow-md">
                            <label>Your Output:</label>
                            <br/>
                            <textarea placeholder="Your test" disabled defaultValue={yourResult}></textarea>
                            </div>:
                            status=='Fail'?
                            <div className="bg-red-500 p-5 shadow-md">
                            <label>Your Output:</label>
                            <br/>
                            <textarea placeholder="Your test" disabled defaultValue={yourResult}></textarea>
                            </div>:
                            <div className="bg-white-500 p-5 shadow-md">
                            <label>Your Output:</label>
                            <br/>
                            <textarea placeholder="Your test" disabled defaultValue={yourResult}></textarea>
                            </div>

                        }
                        
                    </div>      
                    </div>}
                   
            </div>)
}