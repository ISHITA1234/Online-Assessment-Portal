import { useEffect } from "react"
import axios from "axios";

export function ShowSubmission({ submission, keys }) {
  
  const downloadFile = (filepath) => {
    let filename = filepath.split("\\").pop();
    // console.log("file output download:", filename)
    axios({
      url: 'http://localhost:3000/api/v1/student/download/'+filename,
      method: 'GET',
      responseType: 'blob', // important
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }).then((response) => {
      // console.log(response)
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };

    return (
      <tr>
        {keys.map(key => (
          key=="fileUploadPath"?
          <td className="border underline text-blue-500 border-gray-300 px-4 py-2" key={key}><a href="#" onClick={() => downloadFile(submission[key])}>{submission[key]}</a></td>
          :
          key=="marks"?
          <td className="border border-gray-300 px-4 py-2" key={key}>{submission[key]}/100</td>
          :
          <td className="border border-gray-300 px-4 py-2" key={key}>{submission[key]}</td>          
        ))}
      </tr>
    );
  }
  
  export default ShowSubmission;