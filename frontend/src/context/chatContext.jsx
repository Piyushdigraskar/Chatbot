import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { server } from "../main";
import toast from "react-hot-toast";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [newReqLoading, setNewReqLoading] = useState(false);
    const [chats, setChats] = useState([]);
    const [createLoad, setCreateLoad] = useState(false);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchResponse() {
        if (prompt === "") return alert('Write a prompt');
        setNewReqLoading(true);
        setPrompt("");
        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAFeMsZCjCGp1DlokhRCSes7fCmcMD86dg`,
                method: "post",
                data: {
                    contents: [{ parts: [{ text: prompt }] }]
                }
            });

            const message = {
                question: prompt,
                answer: response["data"]["candidates"][0]["content"]["parts"][0]["text"],
            }

            setMessages((prev) => [...prev, message]);
            setNewReqLoading(false);

            const {data} = await axios.post(`${server}/api/chat/${selected}`, {
                question: prompt,
                answer: response["data"]["candidates"][0]["content"]["parts"][0]["text"],
            },{
                headers: {
                    token: localStorage.getItem("token"),
                }
            })
        } catch (error) {
            alert("Something went wrong")
            console.log(error);
            setNewReqLoading(false);
        }
    }

    async function fetchChats() {
        try {
            const { data } = await axios.get(`${server}/api/chat/all`, {
                headers: {
                    token: localStorage.getItem('token'),
                }
            })

            setChats(data);
            setSelected(data[0]._id)
        } catch (error) {
            console.log(error);
        }
    }

    async function createChat() {
        setCreateLoad(true);
        try {
            const { data } = await axios.post(`${server}/api/chat/new`, {}, {
                headers: {
                    token: localStorage.getItem("token"),
                }
            })
            fetchChats();
            setCreateLoad(false);
        } catch (error) {
            toast.error("Something went wrong");
            setCreateLoad(false);
        }
    }

    async function fetchMessages(){
        setLoading(true);
        try {
            const {data} = await axios.get(`${server}/api/chat/${selected}`,{
                headers:{
                    token: localStorage.getItem("token"),
                }
            });
            setMessages(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    async function deleteChat(id){
        try {
            const {data} = await axios.delete(`${server}/api/chat/${id}`, {
                headers: {
                    token: localStorage.getItem('token'),
                }
            });
            toast.success(data.message);
            fetchChats();
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }

    async function downloadChat(id) {
        try {
          const { data } = await axios.get(`${server}/api/chat/download/${id}`, {
            headers: {
              token: localStorage.getItem('token'),
            },
            responseType: 'blob'
          });
          const url = window.URL.createObjectURL(new Blob([data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `chat_${id}.txt`);
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      }

    useEffect(() => {
        fetchChats();
    }, [])

    useEffect(()=>{
        fetchMessages();
    }, [selected])
    return <ChatContext.Provider value={{ fetchResponse, messages, prompt, setPrompt, newReqLoading, chats, createChat, createLoad, selected, setSelected, loading, setLoading, deleteChat, fetchChats, downloadChat }}>
        {children}
    </ChatContext.Provider>
}

export const ChatData = () => useContext(ChatContext);