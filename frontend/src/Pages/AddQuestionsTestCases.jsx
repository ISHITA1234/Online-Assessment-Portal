import { Header } from "../components/Header";
import { InputBox } from "../components/InputBox";

export function AddQuestionsTestCases(){
    let addquestion = "";
    let testcases = [];
    const testcaseCount = 10;
    const testcaseArray = Array.from({ length: testcaseCount }, (_, index) => index + 1);
    return(
        <div>
            <Header label={"Add Questions and Test Cases"}></Header>
            <div className="grid grid-cols-2">
           <div className="ml-6">    
            <label>Write Question to Add</label><br></br>    
           <textarea className="border-2 border-black shadow-xl bg-slate-200 rounded w-96 h-80 mt-6 mb-6" onChange={e=>{addquestion = e.target.value;}}  placeholder={"...?"}></textarea><br></br>
           <button className="rounded-full bg-indigo-500 px-8">Add</button>
            </div>
            <div>
            <label>Write testcases like eg, Input:2,3</label><br/><label>Output:6</label>
            {testcaseArray.map((buttonNumber) => (
                <div className="" key={`div-${buttonNumber}`}>
                    <label key={`label-${buttonNumber}`}>Write Test cases {buttonNumber} for this question</label><br></br>                    
                    <textarea key={`input-${buttonNumber}`} className="mb-2 w-60 h-10 border-2 border-black" onChange={e=>{testcases.push(e.target.value);}} placeholder={"...?"}></textarea><br></br>
                    <button key={`button-${buttonNumber}`}className="mb-6 rounded-full bg-indigo-500 px-8" >Add test case {buttonNumber}</button>
                </div>             
                
            ))}
                
            </div>
        </div>
        </div>
        
    )
}