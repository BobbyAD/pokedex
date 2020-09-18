import axios from "axios";
import { auth } from "./firebase";

export const loginUser = (email, password) => {
    console.log("login user");
    console.log(email);
    console.log(password);
    return auth().signInWithEmailAndPassword(email, password);
};

export const getTest = () => {
    console.log("get test");
    auth()
        .currentUser.getIdToken()
        .then((token) => {
            axios
                .get("http://localhost:5000/api/user", {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
};

export const createUser = (data) => {
    console.log("creating user");
    console.log(data);
    return axios.post("http://localhost:5000/api/user/signup", data);
};
