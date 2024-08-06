import React from 'react'
import { MdDelete } from "react-icons/md";
import { MdFileDownload } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { ChatData } from '../context/chatContext';
import { UserData } from '../context/userContext';
import { LoadingSpinner } from './Loading';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { chats, createChat, createLoad, setSelected, deleteChat,downloadChat} = ChatData();

    const {logoutHandler} = UserData();

    const deleteChatHandler = (id) => {
        if (confirm("Are you sure you want to delete this chat?")) {
            deleteChat(id);
        }
    }

     const clickEvent = (id)=>{
        setSelected(id);
        toggleSidebar();
     }

    return (
        <div className={`fixed inset-0 bg-gray-800 p-4 transition-transform transform md:relative md:translate-x-0 md:w-1/4 md:block ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <button className='md:hidden p-2 mb-4 bg-gray-700 rounded text-2xl' onClick={toggleSidebar}>
                <IoIosCloseCircle />
            </button>
            <div className="text-2xl font-semibold mb-6">Chatbot</div>
            <div className="mb-4">
                <button onClick={createChat} className='w-full py-2 bg-gray-700 hover:bg-gray-600 rounded'>
                    {createLoad ? <LoadingSpinner /> : "New Chat +"}
                </button>
            </div>
            <div>
                <p className='text-sm text-gray-400 mb-2'>Recent </p>
                <div className="max-h-[500px] overflow-y-auto mb-20 md:mb-0 thin-scrollbar">
                    {
                        chats && chats.length > 0 ? chats.map((e) => (
                            <button key={e._id} className='w-full text-left py-2 px-2 bg-gray-700 hover:bg-gray-600 rounded mt-2 flex justify-between items-center' onClick={() => clickEvent(e._id)}>
                                <span className="mr-4">{e.latestMessage.slice(0, 38)}...</span>
                                <div className="flex justify-end">
                                    <button
                                        className="bg-red-600 text-white text-xl px-3 py-2 rounded-md hover:bg-red-700"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            deleteChatHandler(e._id);
                                        }}
                                    >
                                        <MdDelete />
                                    </button>
                                    <button
                                        className="bg-gray-600 text-white text-xl px-3 py-2 rounded-md hover:bg-gray-700 ml-2" onClick={()=>downloadChat(e._id)}

                                    >
                                        <MdFileDownload />
                                    </button>
                                </div>
                            </button>
                        )) : <p>No chats Yet</p>
                    }
                </div>
            </div>
            <div className="absolute bottom-0 mb-6 w-full">
                <button className='bg-red-600 text-white text-xl px-3 py-2 rounded-md hover:bg-red-700' onClick={logoutHandler}>Logout</button>
            </div>
        </div>
    )
}

export default Sidebar