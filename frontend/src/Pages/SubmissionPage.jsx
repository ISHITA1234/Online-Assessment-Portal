import { useEffect, useState } from "react"
import axios from "axios";
import { ShowSubmission } from "../components/ShowSubmission";
import Footer from "../components/Footer";
import{ FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown, faHome, faPlusCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { AppBar } from "../components/AppBar";
export function SubmissionPage(){
    const [rows, setRows] = useState([]);
    const [headers, setHeaders] = useState([]);

   const [submissions, setSubmissions] = useState({});
   
   let firstObject={};

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const response = await axios.get("http://localhost:3000/api/v1/student/getStudentmarks", 
            {
                headers:{
                        Authorization:"Bearer "+localStorage.getItem("token")
                }
            }
            );
            // console.log("submissions found",response.data);  
            setSubmissions(response.data);
            

            try{
              //sort response
              response.data.sort((a, b) => {
                // Compare userId
                if (a.userId < b.userId) return -1;
                if (a.userId > b.userId) return 1;
            
                // Compare day
                if (a.day < b.day) return -1;
                if (a.day > b.day) return 1;
            
                // Compare question
                if (a.question < b.question) return -1;
                if (a.question > b.question) return 1;
            
                return 0;
              });
            }catch(e){}   

            if(response.data.marksGot.length!=0){
              const keys = Object.keys(response.data.marksGot[0]).filter(key => key !== "__v" && key !== "_id");            
            

              // Create rows
              const rowsData = response.data.marksGot.map((submission, index) => (
                <ShowSubmission key={index} submission={submission} keys={keys} />
              ));

              setHeaders(keys);
              setRows(rowsData);    
            }
             
        }
        fetchData();
    }, []);

    // console.log("submissions['marksGot']=",submissions['marksGot'])  
    // console.log("rows=",rows)    

    const handleDownload = () => {
      const worksheet = XLSX.utils.json_to_sheet(submissions);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const xlsxData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
      const blob = new Blob([xlsxData], { type: 'application/octet-stream' });
      saveAs(blob, 'Marks.xlsx');
  };

       
    return (
      <>
        <AppBar role="student"></AppBar>
      <div className="flex justify-end mt-5"> 
        {/* <button data-tooltip-target="tooltip-top" data-tooltip-placement="top" type="button" className="rounded-full  mr-2 right-align" onClick={()=>{window.location.href='/home'}}><FontAwesomeIcon icon={faHome} title='Go Back to Home Page' className="h-5 w-10"/></button> */}
        <button data-tooltip-target="tooltip-top" data-tooltip-placement="top" type="button" className="rounded-full  mr-2 right-align" onClick={handleDownload}><FontAwesomeIcon icon={faFileArrowDown} title='Downlaod Data into Excel' className="h-5 w-10"/></button>
        {/* <button className="rounded-full bg-gray-400 px-8 mr-2 right-align" onClick={handleDownload}><FontAwesomeIcon icon={faFileArrowDown} className="h-5 w-10"/>Download Excel</button> */}
      </div>
      {rows.length==0?<div className="text-4xl text-gray-400 text-center mb-20">No Submissions Found!</div>:
      <div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-20">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {headers.map(header => (
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
        </table>
      </div>
      }
      
      <Footer></Footer>
    </>
    )
}