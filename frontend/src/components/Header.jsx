import React from 'react'

const Header = () => {
    const chat = [{chat: "chat"}];
  return (
    <div>
        <p className='text-lg mb-6'>Hello, how can i help you?</p>
        {chat && chat.length === 0 && <p className='text-lg mb-6'>Create new chat to continue...</p>}
    </div>
  )
}

export default Header