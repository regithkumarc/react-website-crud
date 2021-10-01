import { Button, Form, FormGroup, Label } from "reactstrap"
import { Input } from "@material-ui/core"
import '../css/login.css'
import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import userService from "../common/service/userService";

export default function Login(){
    const history = useHistory();
    const[values,setValues] = React.useState({
        email : "",
        password : "",
        emailErrorMsg : "Email is Mandatory",
        passwordErrorMsg : "Password is Mandatory"
    });

    const [emailEnabled,setEmailEnabled] = useState(false)
    const [passwordEnabled,setPasswordEnabled] = useState(false)

    // useEffect(() => {
    //     console.log(emailEnabled);
    //   }, [emailEnabled]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(values.email === "" && values.password === ""){
            console.log("Email is Empty")
            console.log(emailEnabled)
            console.log("Password is Empty")
            console.log(passwordEnabled)
            setEmailEnabled(true)
            setPasswordEnabled(true)
            console.log(emailEnabled)
            console.log(passwordEnabled)
        }else if(values.email === ""){
            console.log("Email is Empty")
            console.log(emailEnabled)
            setEmailEnabled(true)
            console.log(emailEnabled)
        } else if(values.password === ""){
            console.log("Password is Empty")
            console.log(passwordEnabled)
            setPasswordEnabled(true)
            console.log(passwordEnabled)
        } else {
            userService.getUserByEmail(values.email).then(res => {
                console.log(values.email)
                console.log(values.password)
                history.push({
                    pathname : "/usersList"
                })
            }).catch(err => {
                console.log(err)
            })
        }
         
    }

    const onChange = (prop) => (event) => {
        console.log("Event : " + event);
        console.log("Prop : " + prop)
        if(prop === "email"){
            if(values.email !== "")
             setEmailEnabled(false)
        } else if(prop === "password"){
            if(values.password !== "")
             setPasswordEnabled(false)
        }
        setValues({ ...values, [prop]: event.target.value });
    };

    var emailError = {
        color : 'red'
    }

    var passwordError = {
        color : 'red'
    }

    var headerStyle = {
        textAlign: "center",
        width: '100%'
    }

    return(
        <div className = "appStyle">
            <Form className = "formStyleLogin" onSubmit = {handleSubmit}>
                <h1 style = {headerStyle}>Login</h1>
                <FormGroup>
                    <Label className = "labelStyle">Email</Label>
                    <Input id = "email" 
                           className = "inputStyle"
                           type = "text"
                           value = {values.email}
                           onChange = {onChange("email")}
                           placeholder = "Enter the Email"
                           autoFocus
                           ></Input>
                </FormGroup>
                <div>
                    {(emailEnabled) ? <Label style={emailError}> {values.emailErrorMsg} </Label> : ""}
                </div>
                <Label className = "emailError" disabled = {true}></Label>
                <FormGroup>
                    <Label className = "labelStyle">Password</Label>
                    <Input className = "inputStyle"
                           id = "password"
                           type = "password"
                           onChange = {onChange("password")}
                           placeholder = "Enter the Password"></Input>
                </FormGroup>
                <div>
                    {(passwordEnabled) ? <Label style={passwordError}> {values.passwordErrorMsg} </Label> : ""}
                </div>
                <Button className = "submitStyle" type = "submit" value = "login">Login</Button>
            </Form>
        </div>
    )
}