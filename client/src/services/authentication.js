import { Api } from "../config/request";

let requestUserSignUp = async (data) => {
    return Api.PostRequest("/user/signUp", data);
};

const AuthenticationApi = {
    requestUserSignUp,
};

export default AuthenticationApi;
