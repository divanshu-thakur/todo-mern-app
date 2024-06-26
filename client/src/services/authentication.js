import { Api } from "../config/request";

let requestUserSignUp = async (data) => {
    let response = await Api.PostRequest("user/signUp", data);
    return response.data;
};

let requestUserSignIn = async (data) => {
    let response = await Api.PostRequest("user/signIn", data);
    return response.data;
};

const AuthenticationApi = {
    requestUserSignUp,
    requestUserSignIn,
};

export default AuthenticationApi;
