import axios from "axios";

const USERS_BASE_URL = "http://localhost:8088/userDetails";

class UserService {

    getUsers(){
        return axios.get(USERS_BASE_URL + '/getAllUsers');
    }

    getUserById(userId){
        return axios.get(USERS_BASE_URL + '/getUserById/' + userId);
    }

    getUserByEmail(email){
        return axios.get(USERS_BASE_URL + '/getUserByEmail/' + email);
    }

    createUser(users){
        return axios.post(USERS_BASE_URL + '/addUser',users);
    }

    updateUser(users){
        return axios.put(USERS_BASE_URL + '/updateUser' , users);
    }

    deleteUser(userId){
        return axios.delete(USERS_BASE_URL + '/deleteUserById/' + userId)
    }
}

export default new UserService()