import { createContext, useContext, useEffect, useState } from "react";
import {Toaster, toast} from 'react-hot-toast'
import axios from 'axios';
import { server } from "../main";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [btnLoading, setBtnLoading] = useState(false);
    const [user, setUser] = useState([]);
    const [isAuth, setISAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    
    async function loginUser(email, navigate){
        setBtnLoading(true);
        try {
            const {data} = await axios.post(`${server}/api/user/login`, {email});
            toast.success(data.message); 
            localStorage.setItem("verifyToken", data.verifyToken);
            navigate('/verify');
            setBtnLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setBtnLoading(false);
        }
    }

    

    async function verifyUser(otp, navigate, fetchChats){
        const verifyToken = localStorage.getItem('verifyToken');
        setBtnLoading(true);

        if(!verifyToken){
            return toast.error("Please Give Token")
        }
        try {
            const {data} = await axios.post(`${server}/api/user/verify`, {otp, verifyToken});
            toast.success(data.message); 
            localStorage.clear();
            localStorage.setItem("token", data.token);
            navigate('/');
            setBtnLoading(false);
            setISAuth(true);
            setUser(data.user);
            fetchChats();
            
        } catch (error) {
            toast.error(error.response.data.message);
            setBtnLoading(false);
            
        }
    }

    async function fetchUser(){
        try {
            const {data} = await axios.get(`${server}/api/user/me`, {
                headers:{
                    token: localStorage.getItem('token'),
                }
            })

            setISAuth(true);
            setUser(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setISAuth(false);
            setLoading(false);
        }
    }

    const logoutHandler = (navigate)=>{
        localStorage.clear();
        setISAuth(false);
        setUser([]);
        navigate('/login');
        toast.success("Logged out")
    }

    useEffect(()=>{
        fetchUser();
    }, [])

    return <UserContext.Provider value={{loginUser, btnLoading, isAuth, setISAuth, user, verifyUser, loading, logoutHandler}}>
        {children}
        <Toaster />
    </UserContext.Provider>
}

export const UserData = ()=> useContext(UserContext);
