import { IconButton, InputAdornment,Input } from "@material-ui/core"
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";
import { Button, Form, FormGroup, Label } from "reactstrap"
import '../css/register.css'

export default function Register(){

    const [values,setValues] = React.useState({
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        confirmPassword : "",
        showPassword : false,
        showConfirmPassword : false,
        firstNameErrorMsg : "First Name is Mandatory",
        lastNameErrorMsg : "Last Name is Mandatory",
        emailErrorMsg : "Email is Mandatory",
        passwordErrorMsg : "Password is Mandatory",
        confirmPasswordErrorMsg : "Confirm Password is Mandatory"
    });

    const [firstNameEnabled,setFirstNameEnabled] = useState(false)
    const [lastNameEnabled,setlastNameEnabled] = useState(false)
    const [emailEnabled,setEmailEnabled] = useState(false)
    const [passwordEnabled,setPasswordEnabled] = useState(false)
    const [confirmPassswordEnabled,setConfirmPasswordEnabled] = useState(false)
    const [dimensions, setDimensions] = useState({ height: '450px', minHeight: '450px',top: '50%',padding : '20px 20px 20px 20px' });

    const handleClickShowPassword = () => {
        setPasswordEnabled(!values.showPassword)
    }

    const handleClickShowConfirmPassword = () => {
        setConfirmPasswordEnabled(!values.showConfirmPassword)
    }
    

    const handlePasswordChange = (prop) => (event) => {
        if(prop === "password") {
            if(values.password !== "") {
                setPasswordEnabled(false)
                console.log(values.firstName)
                console.log(passwordEnabled)
            }
        } else if(prop === "confirmPassword") {
            if(values.confirmPassword !== "") {
                setConfirmPasswordEnabled(false)
                console.log(values.firstName)
                console.log(confirmPassswordEnabled)
            }
        }
        setValues({ ...values, [prop]: event.target.value });
      };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onChange = (prop) => (event) => {
        console.log("Event : " + event);
        console.log("Prop : " + prop)
        //const { name, value } = event.target;
        console.log("event.target : " + event.target)
        if(prop === "firstName") {
            if(values.firstName !== "") {
                setFirstNameEnabled(false)
                console.log(values.firstName)
                console.log(firstNameEnabled)
            }
        } else if(prop === "lastName"){
            if(values.lastName !== "")
                setlastNameEnabled(false)
            console.log(values.lastName)
            console.log(lastNameEnabled)
        } else if(prop === "email"){
            if(values.lastName !== "")
                setEmailEnabled(false)
            console.log(values.email)
            console.log(emailEnabled)
        }

        setValues({ ...values, [prop]: event.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(values.firstName === "" && values.lastName === "" 
            && values.email === "" && values.password === ""
            && values.confirmPassword === "") {
            setFirstNameEnabled(true)
            setlastNameEnabled(true)
            setEmailEnabled(true)
            setPasswordEnabled(true)
            setConfirmPasswordEnabled(true)
            //setDimensions({height: "530px", minHeight: "530px",top: "70%",padding : "5px 20px 20px 20px" })
            
            setDimensions({...dimensions, height: "530px"})
            
            // setDimensions(prevState => ({
            //     ...prevState,
            //     [dimensions.height]: "530px",
            //     // [dimensions.minHeight]: "530px",
            //     // [dimensions.top]: "70%",
            //     // [dimensions.padding]: "5px 20px 20px 20px"
            // }));

            console.log(dimensions)
        } else if(values.firstName === "") {
            setFirstNameEnabled(true)
        } else if(values.lastName === "") {
            setlastNameEnabled(true)
        } else if(values.email === "") {
            setEmailEnabled(true)
        }else if(values.password === "") {
            setPasswordEnabled(true)
        } else if(values.confirmPassword === "") {
            setConfirmPasswordEnabled(true)
        }
    }

    var emailError = {
        color : 'red'
    }

    var firstNameError = {
        color : 'red'
    }

    var lastNameError = {
        color : 'red'
    }

    var headerStyle = {
        textAlign: "center",
        width: '100%'
    }

    return(
        <div className = "appStyle">
            <Form className = "formStyle" style = {dimensions} onSubmit = {onSubmit}>
                <h1 style = {headerStyle}>Register</h1>
                <FormGroup>
                    <Label className = "labelStyle">First Name</Label>
                    <Input className = "inputStyle" 
                           type = "text" 
                           placeholder = "Enter the First Name"
                           onChange = {onChange("firstName")}
                           value = {values.firstName}
                           autoFocus></Input>
                </FormGroup>
                <div>
                    {(firstNameEnabled) ? <Label style = {firstNameError}>{values.firstNameErrorMsg}</Label> : ""}
                </div>
                <FormGroup>
                    <Label className = "labelStyle">Last Name</Label>
                    <Input className = "inputStyle" 
                           type = "text"
                           onChange = {onChange("lastName")}
                           value = {values.lastName}
                           placeholder = "Enter the Last Name"></Input>
                </FormGroup>
                <div>
                    {(lastNameEnabled) ? <Label style = {lastNameError}>{values.lastNameErrorMsg}</Label> : ""}
                </div>
                <FormGroup>
                    <Label className = "labelStyle">Email</Label>
                    <Input className = "inputStyle" 
                           type = "email"
                           onChange = {onChange("email")}
                           value = {values.email}
                           placeholder = "Enter the Email"></Input>
                </FormGroup>
                <div>
                    {(emailEnabled) ? <Label style = {emailError}>{values.emailErrorMsg}</Label> : ""}
                </div>
                <FormGroup>
                    <Label className = "labelStyle">Password</Label>
                    <Input className = "inputStyle"
                           placeholder = "Enter the Password"
                           type={values.showPassword ? "text" : "password"}
                           onChange={handlePasswordChange("password")}
                           value={values.password}
                           endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
                </FormGroup>
                <div>
                    {(passwordEnabled) ? <Label style = {emailError}>{values.passwordErrorMsg}</Label> : ""}
                </div>
                <FormGroup>
                    <Label className = "lableStyle">Confirm Password</Label>
                    <Input className = "inputStyle"
                           placeholder = "Enter the Confirm Password"
                           type={values.showConfirmPassword ? "text" : "password"}
                           onChange={handlePasswordChange("confirmPassword")}
                           value={values.confirmPassword}
                           endAdornment={
                           <InputAdornment position="end">
                             <IconButton
                               onClick={handleClickShowConfirmPassword}
                               onMouseDown={handleMouseDownPassword}
                             >
                            {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                             </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormGroup>
                <div>
                    {(confirmPassswordEnabled) ? <Label style = {emailError}>{values.confirmPasswordErrorMsg}</Label> : ""}
                </div>
                <Button className = "submitStyle" value = "register" >Register</Button>
            </Form>
        </div>
    )
}