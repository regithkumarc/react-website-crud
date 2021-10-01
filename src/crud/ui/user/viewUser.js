import React from 'react'
import { Label } from 'reactstrap'
import userService from '../../common/service/userService'

export default class ViewUser extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            id : this.props.match.params.id,
            userData : {}
        }
    }

    componentDidMount(){
        userService.getUserById(this.state.id).then(res => {
            this.setState({userData : res.data});

            console.log(this.state.userData)
        }).catch(error => {
            console.log(error)
        })
    }

    render () {
        return(
            <div>
                <div className = "card col-md-6 offset-md-3">
                    <h1 className = "text-center">View User Details</h1>
                    <div className = "card-body">
                        <div className = "row">
                            <Label>Id : </Label>
                            <Label>{ this.state.userData.id}</Label>
                        </div>
                        <div className = "row">
                            <Label>First Name : </Label>
                            <Label>{ this.state.userData.firstName}</Label>
                        </div>
                        <div className = "row">
                            <Label>Last Name : </Label>
                            <Label>{ this.state.userData.lastName}</Label>
                        </div>
                        <div className = "row">
                            <Label>Email : </Label>
                            <Label>{ this.state.userData.email}</Label>
                        </div>
                        <div className = "row">
                            <Label>Password : </Label>
                            <Label>{ this.state.userData.password}</Label>
                        </div>
                        <div className = "row">
                            <Label>Confirm Password : </Label>
                            <Label>{ this.state.userData.password}</Label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}