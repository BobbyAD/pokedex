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

export const getCollections = () => {
    return auth()
        .currentUser.getIdToken()
        .then((token) => {
            return axios
                .get("http://localhost:5000/api/user/collections", {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    console.log("collections", res.data);
                    return res.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        });
};

// TODO: Login with firebase first, then send data to add to database
// firebase-admin can actually create users with no credentials
// This defeats the purpose of letting Firebase handle my auth
export const createUser = (data) => {
    console.log("creating user");
    console.log(data);
    return axios.post("http://localhost:5000/api/user/signup", data);
};

export const createCollection = (data) => {
    return auth()
        .currentUser.getIdToken()
        .then((token) => {
            return axios.post("http://localhost:5000/api/user/collections", data, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res);
                return res;
            })
            .catch((err) => {
                console.log(err);
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
