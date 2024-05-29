const LS_KEY = {
    auth_token: "jwt_access_token_Todo_App",
};

const set = {
    authToken: (data) => {
        localStorage.setItem(LS_KEY.auth_token, `Bearer ${data}`/* "Bearer" + " " + data */);
    },
}

const fetch = {
    authToken: () => {
        return localStorage.getItem(LS_KEY.auth_token);
        /* const data = localStorage.getItem(LS_KEY.auth_token);
        if (data) {
            try {
                const decoded = data;
                return decoded;
            } catch (err) { }
        } */
    },
}

const destroy = {
    authToken: () => {
        localStorage.removeItem(LS_KEY.auth_token);
    },
}

export const storage = {
    set,
    fetch,
    destroy,
};