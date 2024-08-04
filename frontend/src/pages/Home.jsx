import {useState} from 'react'
import Sidebar from '../components/Sidebar'

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = ()=>{
    setIsOpen(!isOpen);
  }

  return (
    <div className='flex h-screen bg-gray-900 text-white'>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
      <div className="flex flex-1 flex-col"></div>
    </div>
  )
}

export default Home