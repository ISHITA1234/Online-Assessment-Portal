import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { SubHeader } from "../components/SubHeader";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import {Warning} from "../components/Warning"
import axios from "axios";
import { useState } from "react";


export function SignIn(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [passoword, setPassword] = useState("");   

    return(
        <>
        <div className="ml-10 text-center md:text-center mt-20 border border-4 ml-80 mr-80 pb-10">
        <Header label={"Sign In"}></Header>
        <SubHeader label={"Enter your Credentials to access your account"}></SubHeader>
        <InputBox type="text" onChange={e=>{setEmail(e.target.value);}} label={"Email"} placeholder={"john@example.com"}></InputBox>
        <InputBox type="password" onChange={e=>{setPassword(e.target.value);}} label={"Password"} placeholder={""}></InputBox>        
        <Button onClick={async()=>{
            await axios.post("http://localhost:3000/api/v1/user/signin",{username:email,password:passoword})
            .then((response)=>{
                localStorage.setItem("token",response.data.token); //Store the token from response of the post call.
                localStorage.setItem("firstName", response.data.firstName)
                localStorage.setItem("lastName", response.data.lastName)
                localStorage.setItem("rollNumber", response.data.rollNumber)
                localStorage.setItem("user_id", response.data.user_id)
                localStorage.setItem("group", response.data.group)
                if(response.data.user_id=="6676a97376f145fabc0289d9")
                {
                    window.location.href = "/adminhome";
                }
                else
                {
                    window.location.href = "/home";
                }   
                             
            }).catch(err=>{window.alert("Invalid Email/Password.")});
            
            }} submitMessage={"Sign In"} ></Button>
        <Warning warning={"Don't have an Account?"} msg={"Sign Up"}></Warning>
        </div>
        </>
    )
}