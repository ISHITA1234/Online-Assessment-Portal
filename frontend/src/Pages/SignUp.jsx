import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { SubHeader } from "../components/SubHeader";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import {Warning} from "../components/Warning"
import axios from "axios";
import { useState } from "react";

export function SignUp(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [passoword, setPassword] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [group, setGroup] = useState("");

    const navigate = useNavigate();



    return(
        <>
        <div className="ml-10 text-center md:text-center mt-20 border border-4 ml-80 mr-80 pb-10">
            <Header label={"Sign Up"}></Header>
            <SubHeader label={"Enter your information to create and account"}></SubHeader>
            <InputBox type="text" onChange={e=>{setFirstName(e.target.value);}} label={"First name"} placeholder={"John"}></InputBox>
            <InputBox type="text" onChange={e=>{setLastName(e.target.value);}} label={"Last name"} placeholder={"Samuel"}></InputBox>
            <InputBox type="text" onChange={e=>{setRollNumber(Number(e.target.value));}} label={"Roll Number"} placeholder={"123456789"}></InputBox>
            <InputBox type="text" onChange={e=>{setGroup(e.target.value);}} label={"Group"} placeholder={"A"}></InputBox>
            <InputBox type="text" onChange={e=>{setEmail(e.target.value);}} label={"Email"} placeholder={"john123@gmail.com"}></InputBox>
            <InputBox type="password" onChange={e=>{setPassword(e.target.value);}} label={"Password"} placeholder={"********"}></InputBox>
            <Button onClick={async()=>{
                const response = await axios.post("http://localhost:3000/api/v1/user/signup",{username:email,password:passoword,firstName:firstName,lastName:lastName,rollNumber:Number(rollNumber),group:group});
                localStorage.setItem("token",response.data.token); //Store the token from response of the post call.
                localStorage.setItem("firstName", response.data.firstName)
                localStorage.setItem("lastName", response.data.lastName)
                localStorage.setItem("rollNumber", response.data.rollNumber)
                localStorage.setItem("group", response.data.group)
                if(response.data.user_id=="6676a97376f145fabc0289d9")
                {
                    window.location.href = "/adminhome";
                }
                else
                {
                    window.location.href = "/home";
                }   
                
                }} submitMessage={"Sign Up"} ></Button>
            <Warning warning={"Already have an Account?"} msg={"Sign In"}></Warning>  
        </div>      
        </>
    )
}