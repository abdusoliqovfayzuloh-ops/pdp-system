import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'
import studentIcon from '../../assets/avatar icon.png'
import logo from '../../assets/logo.png'

function Header({student}) {
  const navigate = useNavigate("")
  return (<header className='site__header'>
    <div className="header__inner">
      <div className="flex items-center gap-2">
        <button className='header_navigate' onClick={() => {
          navigate("/login")
        }}>&times;</button>
        <img width={50} src={logo} alt="" className='header_logo'/>
        <h2 className='header_title'>PDP Sistem</h2>
      </div>
      <div className="header__content">
        <h4 className='header_name'>{student.data.user.fullName}</h4>
        <span className="header__user">AB</span>
      </div>
    </div>
  </header>)
}

export default Header
