import React from 'react'
import { IconButton, InputAdornment,Input } from "@material-ui/core"
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Button, Form, FormGroup, Label } from 'reactstrap'
import userService from '../../common/service/userService';
import '../../css/register.css';

export default class AddUser extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            id : this.props.match.params.id,
            firstName : "",
            lastName : "",
            email : "",
            password : "",
            confirmPassword : "",
            showPassword : false,
            showConfirmPassword : false,
            firstNameEnabled : false,
            lastNameEnabled: false,
            emailEnabled : false,
            passwordEnabled : false,
            confirmPasswordEnabled : false,
            firstNameErrorMsg : "First Name is Mandatory",
            lastNameErrorMsg : "Last Name is Mandatory",
            emailErrorMsg : "Email is Mandatory",
            passwordErrorMsg : "Password is Mandatory",
            confirmPasswordErrorMsg : "Confirm Password is Mandatory",
            dimensions : "height: '450px', minHeight: '450px',top: '50%',padding : '20px 20px 20px 20px'"
        }
    }

    getTitle = () => {
        console.log("Title :" +this.state.id)
        if(this.state.id === "add")
            return <h1 style = {this.headerStyle} >Add User</h1>
        else
            return <h1 style = {this.headerStyle} >Update User</h1>
    }

    getButton = () => {
        console.log("Title :" +this.state.id)
        if(this.state.id === "add")
            return <Button style = {{minWidth : "46%"}} onClick = {this.saveOrUpdateUser} className="btn btn-success">Add</Button>
        else
            return <Button style = {{minWidth : "46%"}} onClick = {this.saveOrUpdateUser} className="btn btn-success">Update</Button>
    }

    onChange = (prop) => (event) => {
        console.log("Event : " + event);
        console.log("Prop : " + prop)
        //const { name, value } = event.target;
        console.log("event.target : " + event.target)
        
        if(prop === "firstName") {
            console.log("firstName : " + prop)
            console.log(this.state.firstNameEnabled)
            console.log(this.state.firstName)
            this.setState({firstName : event.target.value})
            if(this.state.firstName !== "") {
                this.setState({firstNameEnabled : false})
                console.log(this.state.firstName)
                console.log(this.state.firstNameEnabled)
            }
        } else if(prop === "lastName"){
            this.setState({lastName : event.target.value})
            if(this.state.lastName !== "")
                this.setState({lastNameEnabled : false})
                console.log(this.state.lastName)
                console.log(this.state.lastNameEnabled)
        } else if(prop === "email"){
            this.setState({email : event.target.value})
            if(this.state.email !== "")
                this.setState({emailEnabled : false})
                console.log(this.state.email)
                console.log(this.state.emailEnabled)
        }

        //this.setState({firstName: event.target.value});
        //setValues({ ...values, [prop]: event.target.value });
    }

    handlePasswordChange = (prop) => (event) => {
        if(prop === "password") {
            this.setState({password : event.target.value})
            if(this.state.password !== "") {
                this.setState({ passwordEnabled : false })
                console.log(this.state.firstName)
                console.log(this.state.passwordEnabled)
            }
        } else if(prop === "confirmPassword") {
            this.setState({confirmPassword : event.target.value})
            if(this.state.confirmPassword !== "") {
                this.setState({confirmPassswordEnabled : false})
                console.log(this.state.firstName)
                console.log(this.state.confirmPassswordEnabled)
            }
        }
        //setValues({ ...values, [prop]: event.target.value });
      };

    handleClickShowPassword = () => {
        this.setState({ showPassword : !this.state.showPassword })
    }

    handleClickShowConfirmPassword = () => {
        this.setState({ showConfirmPassword : !this.state.showConfirmPassword })
    }

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // onChange = (prop) => (event) => {
    //     console.log("Event : " + event);
    //     console.log("Prop : " + prop)
    //     //const { name, value } = event.target;
    //     console.log("event.target : " + event.target)
    //     if(prop === "firstName") {
    //         if(this.state.firstName !== "") {
    //             setFirstNameEnabled(false)
    //             console.log(this.state.firstName)
    //             console.log(firstNameEnabled)
    //         }
    //     } else if(prop === "lastName"){
    //         if(this.state.lastName !== "")
    //             setlastNameEnabled(false)
    //         console.log(this.state.lastName)
    //         console.log(lastNameEnabled)
    //     } else if(prop === "email"){
    //         if(this.state.lastName !== "")
    //             setEmailEnabled(false)
    //         console.log(this.state.email)
    //         console.log(emailEnabled)
    //     }

    //     this.setState({ ...values, [prop]: event.target.value });
    // }

    cancel = () => {
        this.props.history.push("/usersList")
    }

    componentDidMount() {
        console.log(this.state.id)

        if(this.state.id === "add"){
            return
        } else {
            userService.getUserById(this.state.id).then(res => {
                let userDetail = res.data;
                this.setState({firstName : userDetail.firstName,
                               lastName : userDetail.lastName,
                               email : userDetail.email,
                               password : userDetail.password,
                               confirmPassword : userDetail.confirmPassword})
                console.log("User Id : " + this.state.id)
                console.log("User Details : " + this.state.firstName)
            }).catch(error => {
                console.log("Error : " + error)
            })
        }
    }

    saveOrUpdateUser = (e) => {
        e.preventDefault();
        if(this.state.firstName === "" && this.state.lastName === "" 
            && this.state.email === "" && this.state.password === ""
            && this.state.confirmPassword === "") {
            this.setState({firstNameEnabled : true})
            this.setState({lastNameEnabled : true})
            this.setState({emailEnabled : true})
            this.setState({passwordEnabled : true})
            this.setState({confirmPassswordEnabled : true})
            //setDimensions({height: "530px", minHeight: "530px",top: "70%",padding : "5px 20px 20px 20px" })
            
            this.setState({dimensions : "height = '530px'"})
            
            // setDimensions(prevState => ({
            //     ...prevState,
            //     [dimensions.height]: "530px",
            //     // [dimensions.minHeight]: "530px",
            //     // [dimensions.top]: "70%",
            //     // [dimensions.padding]: "5px 20px 20px 20px"
            // }));

            console.log(this.state.dimensions)
        } else if(this.state.firstName === "") {
            this.setState({firstNameEnabled : true})
        } else if(this.state.lastName === "") {
            this.setState({lastNameEnabled : true})
        } else if(this.state.email === "") {
            this.setState({emailEnabled : true})
        }else if(this.state.password === "") {
            this.setState({passwordEnabled : true})
        } else if(this.state.confirmPassword === "") {
            this.setState({confirmPassswordEnabled : true})
        } else {
            let userDetail = "";
            if(this.state.id === "add"){
                userDetail = {
                    firstName : this.state.firstName,
                    lastName : this.state.lastName,
                    email : this.state.email,
                    password : this.state.password,
                    confirmPassword : this.state.confirmPassword
                }
            } else {
                userDetail = {
                    id : this.state.id,
                    firstName : this.state.firstName,
                    lastName : this.state.lastName,
                    email : this.state.email,
                    password : this.state.password,
                    confirmPassword : this.state.confirmPassword
                }
            }

            console.log("User Detail : " + JSON.stringify(userDetail));
    
            if(this.state.id === "add"){
                userService.createUser(userDetail).then(res => {
                    this.props.history.push("/usersList")
                }).catch(error => {
                    console.log(error);
                });
            } else {
                userService.updateUser(userDetail).then(res => {
                    this.props.history.push("/usersList")
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    }

    emailError = {
        color : 'red'
    }

    firstNameError = {
        color : 'red'
    }

    lastNameError = {
        color : 'red'
    }

    headerStyle = {
        textAlign: "center",
        width: '100%'
    }

    render () {
        return(
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "appStyle">
                            <Form className = "formStyle">
                                {/* <h1 style = {this.headerStyle}>Register</h1> */}
                                {this.getTitle()}
                                <FormGroup>
                                    <Label className = "labelStyle">First Name</Label>
                                    <Input className = "inputStyle" 
                                        type = "text" 
                                        placeholder = "Enter the First Name"
                                        onChange = {this.onChange("firstName")}
                                        value = {this.state.firstName}
                                        autoFocus></Input>
                                </FormGroup>
                                <div>
                                    {(this.state.firstNameEnabled) ? <Label style = {this.firstNameError}>{this.state.firstNameErrorMsg}</Label> : ""}
                                </div>
                                <FormGroup>
                                    <Label className = "labelStyle">Last Name</Label>
                                    <Input className = "inputStyle" 
                                        type = "text"
                                        onChange = {this.onChange("lastName")}
                                        value = {this.state.lastName}
                                        placeholder = "Enter the Last Name"></Input>
                                </FormGroup>
                                <div>
                                    {(this.state.lastNameEnabled) ? <Label style = {this.lastNameError}>{this.state.lastNameErrorMsg}</Label> : ""}
                                </div>
                                <FormGroup>
                                    <Label className = "labelStyle">Email</Label>
                                    <Input className = "inputStyle" 
                                        type = "email"
                                        onChange = {this.onChange("email")}
                                        value = {this.state.email}
                                        placeholder = "Enter the Email"></Input>
                                </FormGroup>
                                <div>
                                    {(this.state.emailEnabled) ? <Label style = {this.emailError}>{this.state.emailErrorMsg}</Label> : ""}
                                </div>
                                <FormGroup>
                                    <Label className = "labelStyle">Password</Label>
                                    <Input className = "inputStyle"
                                        placeholder = "Enter the Password"
                                        type={this.state.showPassword ? "text" : "password"}
                                        onChange={this.handlePasswordChange("password")}
                                        value={this.state.password}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                            >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                                </FormGroup>
                                <div>
                                    {(this.state.passwordEnabled) ? <Label style = {this.emailError}>{this.state.passwordErrorMsg}</Label> : ""}
                                </div>
                                <FormGroup>
                                    <Label className = "lableStyle">Confirm Password</Label>
                                    <Input className = "inputStyle"
                                        placeholder = "Enter the Confirm Password"
                                        type={this.state.showConfirmPassword ? "text" : "password"}
                                        onChange={this.handlePasswordChange("confirmPassword")}
                                        value={this.state.confirmPassword}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            onClick={this.handleClickShowConfirmPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                            >
                                            {this.state.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormGroup>
                                <div>
                                    {(this.state.confirmPassswordEnabled) ? <Label style = {this.emailError}>{this.state.confirmPasswordErrorMsg}</Label> : ""}
                                </div>
                                <div style = {{textAlign : "left"}}>
                                    {this.getButton()}
                                    {/* <Button className = "submitStyle" onClick = {this.saveOrUpdateUser} >Add</Button> */}
                                    <Button style = {{margin : "10px",minWidth : "46%"}} onClick = {this.cancel} className="btn btn-danger">Cancel</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}