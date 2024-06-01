import axios from "axios";
// import { toast } from "react-toastify";
import { API_URL } from "./apiURL";
// import { storage } from "./storage";

export const PostRequest = async (url, data) => {
    try {
        const res = await axios({
            url: API_URL + url,
            method: "POST",
            data,
            // body:JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        return res ? res : res.data;
    } catch (err) { console.log(err); }
};

export const Api = {
    PostRequest,
};
