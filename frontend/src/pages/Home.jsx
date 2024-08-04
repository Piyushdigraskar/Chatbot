import {useState} from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from '../components/Sidebar'
import Header from '../components/Header';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = ()=>{
    setIsOpen(!isOpen);
  }

  return (
    <div className='flex h-screen bg-gray-900 text-white'>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
      <div className="flex flex-1 flex-col">
        <button onClick={toggleSidebar} className='md-hidden p-4 bg-gray-800 text-2xl'>
        <GiHamburgerMenu />
        </button>
        <div className="flex-1 p-6 mb-20 md:mb-0">
          <Header />
        </div>
      </div>
    </div>
  )
}

export default Home