import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
export function TestCases({output,expResult}){
    console.log("Output match",output.output1);
    console.log("Testcase match",expResult.testcase1.match(/\d+$/));
    // expResult = output; 
    // expResult = {
    //     "testcase1": "Input:2,4\nOutput:8",
    //     "testcase2": "newly",
    //     "testcase3": "newly",
    //     "testcase4": "newly",
    //     "testcase7": "newly",
    //     "testcase8": "newly",
    //     "testcase9": "newly",
    //     "testcase10": "newly"
    // }


    return(
        <div>{output.output1?
            <div className="grid grid-cols-10">
                {/* <div className="col-span-5">
                    <label>output = {output.output1}, expResult={expResult.testcase1?.match(/\d+$/)}</label><br/>
                    <label>Test Case 1: {output.output1==(expResult.testcase1?.match(/\d+$/))?"pass":"fail"}</label>   
                    {output.output1==(expResult.testcase1?.match(/\d+$/))?<FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />:<FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />}                
                </div> */}
                {expResult.testcase1.startsWith("Input:")?
                         <div className="col-span-5">
                         <label>output = {output.output1}, expResult={expResult.testcase1.split('Output:')[1].trim()}</label><br/>
                         <label>Test Case 1: {String(output.output1).trim()==(expResult.testcase1.split('Output:')[1].trim())?"pass":"fail"}</label>   
                         {String(output.output1).trim()==(expResult.testcase1.split('Output:')[1].trim())?<FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />:<FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />}                
                        </div> 
                    :
                        <div className="col-span-5">
                        <label>output = {output.output1}, expResult={expResult.testcase1}</label><br/>
                        <label>Test Case 1: {output.output1==(expResult.testcase1)?"pass":"fail"}</label>   
                        {output.output1==(expResult.testcase1)?<FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />:<FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />}                
                        </div>
                }
                
                {/* <div className="col-span-5">
                    <label>output = {output.output2}, expResult={expResult.testcase2?.match(/\d+$/)}</label><br/>
                    <label>Test Case 2: {output.output2==(expResult.testcase2?.match(/\d+$/))?"pass":"fail"}</label>   
                    {output.output1==(expResult.testcase1?.match(/\d+$/))?<FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />:<FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />}
                </div> */}
            </div>:<div></div>}
            {/* <div className="grid grid-cols-10">
                <div className="col-span-5">
                    <label>output = {output.output3}, expResult={expResult.testcase3?.match(/\d+$/)}</label><br/>
                    <label>Test Case 3: {output==(expResult.testcase3?.match(/\d+$/))?"pass":"fail"}</label>   
                </div>
                <div className="col-span-5">
                    <label>output = {output}, expResult={expResult.testcase4?.match(/\d+$/)}</label><br/>
                    <label>Test Case 4: {output==(expResult.testcase4?.match(/\d+$/))?"pass":"fail"}</label>  
                </div>
            </div>
            <div className="grid grid-cols-10">
                <div className="col-span-5">
                    <label>output = {output}, expResult={expResult.testcase5?.match(/\d+$/)}</label><br/>
                    <label>Test Case 5: {output==(expResult.testcase5?.match(/\d+$/))?"pass":"fail"}</label>    
                </div>
                <div className="col-span-5">
                    <label>output = {output}, expResult={expResult.testcase6?.match(/\d+$/)}</label><br/>
                    <label>Test Case 6: {output==(expResult.testcase6?.match(/\d+$/))?"pass":"fail"}</label>   
                </div>
            </div> */}

        </div>
        
    )
}