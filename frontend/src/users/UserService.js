import ApiService from "../api/ApiService";

class UserService {
    constructor(){
        this.api = new ApiService();
    }

    registerUser(user, raiseException = false){
        return this.api.postUser(user, raiseException);
    }

    authenticateUser(user, raiseException = false){
        return this.api.authenticateUser(user, raiseException);
    }
}

export default UserService;