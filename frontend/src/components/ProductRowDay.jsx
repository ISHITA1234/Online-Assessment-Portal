import { useState,useRef, useEffect } from "react";
import {UploadFile} from "../components/UploadFile";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export function ProductRowDay({ day, keyName, value, role }) {  
  const [text, setText] = useState(value);
  const textareaRef = useRef(null);

  useEffect(() => {
    const adjustTextareaSize = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        // Reset the height and width to auto to calculate the correct new size
        textarea.style.height = 'auto';
        textarea.style.width = 'auto';

        // Adjust the height
        textarea.style.height = `${textarea.scrollHeight/2}px`;

        // Adjust the width if necessary (optional, based on content length)
        // Here, we can set a max width limit, so it doesn't expand too much horizontally
        const maxWidth = 500; // Example max width in pixels
        // textarea.style.width = `${Math.min(textarea.scrollWidth, maxWidth)}px`;
        textarea.style.width = `700px`;
      }
    };

    adjustTextareaSize();
  }, [text]);
  day = Number(day);
  const navigate = useNavigate();
  let deletepayload = {
    "day":0,
    "questiontodel":""
  }
  for (let key in deletepayload) {
    if(key=="day"){deletepayload[key]=day;}  
    deletepayload["questiontodel"] = keyName;
  }

    return (
      <tr>
        {(keyName!="_id" && keyName!="day" && keyName!="__v")?          
            <><td className="align-top font-bold">{keyName}</td>
            
            {/* <td className="px-4 py-2"><textarea className="h-10 w-20" placeholder="Your test" disabled defaultValue={value}></textarea></td> */}
            <td className="px-4 py-2"><textarea
        ref={textareaRef}
        className="p-2 border rounded-lg  h-10 w-20"
        value={text}
        disabled
        onChange={(e) => setText(e.target.value.trim())}
        style={{ overflow: 'hidden', resize: 'both' }}
      /></td>

            {role=="admin"? 
                <div>
                  <td><button className="rounded-full bg-orange-400 px-8" onClick={event =>  navigate('/updatequestionstestcases/'+ day +'/'+keyName)}>Update Questions & Test Cases</button></td> 
                  <td><button className="rounded-full bg-red-500 px-8" onClick={async()=>{
                        axios.delete("http://localhost:3000/api/v1/admin/deletequestions", {
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          data: deletepayload
                        });
                        // console.log(deletepayload)
                        await window.alert(keyName + " is Deleted!");
                    }}
                   >Delete</button></td>
                  {/* <td><button className="rounded-full bg-indigo-500 px-8" onClick={event =>  navigate('/updatequestionstestcases/'+ day +'/'+keyName)}>Update Test Cases</button></td> */}
                </div>
                : <UploadFile day={day} question={keyName}></UploadFile>} </>
            :null}
         
        
      </tr>
    );
  }