import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Sidebar.css'
import homeIcon from '../../assets/home icon.png'
import leadersIcon from '../../assets/leaders icon.png'
import roulsIcon from '../../assets/rouls icon.png'
import profilIcon from '../../assets/profil icon.png'
import shikoyatIcon from '../../assets/shikoyat icon.png'

function Sidebar() {
  return (<aside className='site__sidebar'>
    <ul className="sidebar__list">
        <li>
          <NavLink className={"sidebar_link"} to={"/loyaut/home"} style={({ isActive }) => ({background: isActive ? "rgb(62, 0, 128)" : "rgba(9, 0, 128, 0.41) "}) }><img width={30} src={homeIcon} alt="" /> Home</NavLink>
        </li>
        <li>
          <NavLink className={"sidebar_link"} to={"/loyaut/leaders"} style={({ isActive }) => ({background: isActive ? "rgb(62, 0, 128)" : "rgba(9, 0, 128, 0.41)"}) }><img width={30} src={leadersIcon} alt="" /> Leaders</NavLink>
        </li>
        <li>
          <NavLink className={"sidebar_link"} to={"/loyaut/rouls"} style={({ isActive }) => ({background: isActive ? "rgb(62, 0, 128)" : "rgba(9, 0, 128, 0.41)"}) }><img width={30} src={roulsIcon} alt="" />  Ruls</NavLink>
        </li>
        <li>
          <NavLink className={"sidebar_link"} to={"/loyaut/complain"} style={({ isActive }) => ({background: isActive ? "rgb(62, 0, 128)" : "rgba(9, 0, 128, 0.41)"}) }><img className='gap' width={40} src={shikoyatIcon} alt="" />Complain</NavLink>
        </li>
        <li>
          <NavLink className={"sidebar_link"} to={"/loyaut/profil"} style={({ isActive }) => ({background: isActive ? "rgb(62, 0, 128)" : "rgba(9, 0, 128, 0.41)"}) }><img width={30} src={profilIcon} alt="" />  Profil</NavLink>
        </li>
    </ul>
  </aside>)
}

export default Sidebar
