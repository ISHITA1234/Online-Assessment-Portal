import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";
import { AppBar } from "../components/AppBar";
import { Header } from "../components/Header";
import { Questions } from "../components/Questions";

export function StudentsUpload(){
    const [questionstate, setQuestion] = useState([]);
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
        }
        fetchData();
    }, []);


    return (<div>
        {/* <Header label={"Students Page"}></Header> */}
        <AppBar role="student"></AppBar>   
        <Header className="pt-5 pb-5" label={"Question for Day"}></Header>  
        <Questions questions={questionstate} role={"student"}></Questions> 
    </div>)
}