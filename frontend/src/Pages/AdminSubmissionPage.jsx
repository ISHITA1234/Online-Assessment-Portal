import { useEffect, useState } from "react"
import axios from "axios";
import { ShowSubmission } from "../components/ShowSubmission";
import{ FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown, faHome, faPlusCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Footer from "../components/Footer";
import { AppBar } from "../components/AppBar";


export function AdminSubmissionPage(){
    const [rows, setRows] = useState([]);
    const [headers, setHeaders] = useState([]);

   const [submissions, setSubmissions] = useState({});
   
   let firstObject={};

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const response = await axios.get("http://localhost:3000/api/v1/admin/getStudentmarksAdmin", 
            {
                // headers:{
                //         Authorization:"Bearer "+localStorage.getItem("token")
                // }
            }
            );
            // console.log("submissions found",response.data);  
            setSubmissions(response.data);
            // console.log("submissions=",response.data)
            
             // Extract headers
            const keys = Object.keys(response.data[0]).filter(key => key !== "__v" && key !== "_id");

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

            // Create rows
            const rowsData = response.data.map((submission, index) => (
              <ShowSubmission key={index} submission={submission} keys={keys} />
            ));

            setHeaders(keys);
            setRows(rowsData);
        }
        fetchData();
    }, []);

    const handleDownload = () => {
        const worksheet = XLSX.utils.json_to_sheet(submissions);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const xlsxData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
        const blob = new Blob([xlsxData], { type: 'application/octet-stream' });
        saveAs(blob, 'Students_Marks.xlsx');
    };

       
    return (
      <div>
        <AppBar role="admin"></AppBar>
        <div className="flex justify-end mt-5"> 
        {/* <button data-tooltip-target="tooltip-top" data-tooltip-placement="top" type="button" className="rounded-full  mr-2 right-align" onClick={()=>{window.location.href='/adminhome'}}><FontAwesomeIcon icon={faHome} title='Go Back to Home Page' className="h-5 w-10"/></button> */}
        <button data-tooltip-target="tooltip-top" data-tooltip-placement="top" type="button" className="rounded-full  mr-2 right-align" onClick={handleDownload}><FontAwesomeIcon icon={faFileArrowDown} className="h-5 w-10"/></button>
        {/* <button className="rounded-full bg-gray-400 px-8 mr-2 right-align" onClick={handleDownload}><FontAwesomeIcon icon={faFileArrowDown} className="h-5 w-10"/>Download Excel</button> */}
        </div>
        <div id="tooltip-top" role="tooltip" className="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Tooltip on top
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-20">
        <thead className="text-xs text-gray-700 uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {headers.map(header => (
              <th className="px-6 py-4 border font-medium text-white whitespace-nowrap dark:text-white bg-gray-600" key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <Footer></Footer>
    </div>
    )
}