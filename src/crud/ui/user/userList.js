import React from "react"
import { Label } from "reactstrap";
import UserService from '../../common/service/userService'

export default class UserList extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            userList : []
        }

        this.addUser = this.addUser.bind(this);
        this.updateUser = this.updateUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this);
        this.viewUser = this.viewUser.bind(this);
    }

    componentDidMount(){
        UserService.getUsers().then((res) => {
            this.setState({ userList: res.data });
           console.log(this.state.userList);
        });
    }

//   componentDidMount(){
//     this.getEmployee();
//   }
  
//    getEmployee() {
//     axios.get('http://localhost:8088/userDetails/getAllUsers')
//         .then(res => {
//           console.log(res.data);
//           this.setState({userList : res.data})
//     })
//   }


    addUser = () => {
        this.props.history.push("/addUser/add")
    }

    updateUser = (id) => {
        this.props.history.push(`/addUser/${id}`)
    }

    deleteUser = (id) => {
        console.log(id)
        UserService.deleteUser(id).then(res => {
            this.setState({userList : this.state.userList.filter(user => user.id !== id)});
        }).catch(error => {
            console.log(error)
        })
    }

    viewUser = (id) => {
        this.props.history.push(`viewUser/${id}`)
    }

    render() {
        return(
            <div>
                <h1 className="text-center" >Users List</h1>
                <div>
                    <button className="btn btn-primary" style = {{marginLeft : "10px"}} onClick = { () => this.addUser() }> Add User</button>
                </div>
                <br></br>
                <div>
                    <table className = "table table-striped table-bordered" style = {{marginLeft : "10px",marginRight : "10px"}}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Confirm password</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.userList.length > 0 ?
                                ((this.state.userList || [] ).map(
                                    user => 
                                    <tr key = "id">
                                        <td> { user.id } </td>
                                        <td> { user.firstName } </td>
                                        <td> { user.lastName } </td>
                                        <td> { user.email } </td>
                                        <td> { user.password } </td>
                                        <td> { user.confirmPassword } </td>
                                        <td>
                                            <button onClick = { () => this.updateUser(user.id)} className="btn btn-info">Update</button>
                                            <button style={{marginLeft: "10px"}} onClick = { () => this.deleteUser(user.id)} className="btn btn-danger">Delete</button>
                                            <button style={{marginLeft: "10px"}} onClick = { () => this.viewUser(user.id)} className="btn btn-info">View</button>
                                        </td>
                                    </tr>
                                )) :
                                <Label style = {{minWidth : "100%", marginTop: '20%', textAlign : 'center'}}>No Data Found</Label>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}