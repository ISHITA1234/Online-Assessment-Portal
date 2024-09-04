import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";
import { AppBar } from "../components/AppBar";
import { Header } from "../components/Header";
import { Questions } from "../components/Questions";
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Footer from "../components/Footer";

export function Day({route, navigate}){    
    let role="";
    if(localStorage.getItem("user_id")=="6676a97376f145fabc0289d9")//||localStorage.getItem("firstName")=="Admin"
    {
        role="admin"
    }
    const [questionstate, setQuestion] = useState([]);
    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    let { id } = useParams();
    console.log("Id:",id)
    // console.log("queryParams:",queryParams)
    // console.log(questionstate)
    // const { itemId, otherParam } = route.params;
    // console.log("route.params:",route.params)

    // const navigate = useNavigate();
    //On load of component  

    useEffect(() => {        
            async function fetchData() {
                // You can await here
                const response = await axios.get("http://localhost:3000/api/v1/admin/getquestions?day="+id, 
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

    return(
        <>
        <AppBar role={role}></AppBar>         
        <Questions questions={questionstate} day={id} role={role}></Questions>   
        <Footer></Footer>
        </>
    )
}