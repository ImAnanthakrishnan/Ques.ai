import React from 'react'
import Logo from '../../assets/images/QuesLogo 2.png';
import { FaRegBell } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

const ProjectHeader = () => {
  return (
    <header className='project-header'>
        <div className='project-header-left'>
            <img src={Logo} alt="logo" />
        </div>
        <div className='project-header-right'>
        <FiSettings size={28}/>
         <FaRegBell size={28}/>
        </div>
    </header>
  )
}

export default ProjectHeader
