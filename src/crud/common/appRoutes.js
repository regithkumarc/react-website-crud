import { BrowserRouter as Router,NavLink,Route } from "react-router-dom"
import Home from "../ui/home"
import Login from "../ui/login"
import '../css/appRoute.css'
import UserList from "../ui/user/userList"
import AddUser from "../ui/user/addUser"
import ViewUser from "../ui/user/viewUser"

export default function AppRoutes(){
    return(
        <div className="App">
            <Router>
                <div className = "header">
                    <NavLink exact activeClassName = "active" to = "/">Home</NavLink>
                    <NavLink exact activeClassName = "active" to = "/login">Login</NavLink>
                    {/* <NavLink exact activeClassName = "active" to = "/register">Register</NavLink> */}
                    <NavLink exact activeClassName = "active" to = "/usersList">Users</NavLink>
                    {/* <NavLink exact activeClassName = "active" to = "/addUser">Add User</NavLink>
                    <NavLink exact activeClassName = "active" to = "/viewUser">View User</NavLink> */}
                </div>
                <div>
                    <Route exact path = "/" component = {Home}></Route>
                    <Route exact path = "/home" component = {Home}></Route>
                    <Route exact path = "/login" component = {Login}></Route>
                    {/* <Route exact path = "/register" component = {Register}></Route> */}
                    <Route exact path = "/usersList" component = {UserList}></Route>
                    <Route exact path = "/addUser/:id" component = {AddUser}></Route>
                    <Route exact path = "/viewUser/:id" component = {ViewUser}></Route>
                </div>
            </Router>
        </div>
    )
}