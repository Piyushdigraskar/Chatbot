import { createContext, useContext, useState } from "react";
import axios from 'axios';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [newReqLoading, setNewReqLoading] = useState(false);

    async function fetchResponse() {
        if (prompt === "") return alert('Write a prompt');
        setNewReqLoading(true);
        setPrompt("");
        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_KEY}`,
                method: "post",
                data: {
                    contents: [{ parts: [{ text: prompt }] }]
                }
            });

            const message = {
                question: prompt,
                answer: response["data"]["candidates"][0]["content"]["parts"][0]["text"],
            }

            setMessages((prev)=>[...prev, message]);
            setNewReqLoading(false);
        } catch (error) {
            alert("Something went wrong")
            console.log(error);
            setNewReqLoading(false);
        }
    }

    return <ChatContext.Provider value={{fetchResponse, messages, prompt, setPrompt, newReqLoading}}>
        {children}
    </ChatContext.Provider>
}

export const ChatData = () => useContext(ChatContext);