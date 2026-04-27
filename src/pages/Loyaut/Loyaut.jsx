import React from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

function Loyaut({student}) {
  return (<div className='site__loyaut'>
    <Header student={student}/>
    <Sidebar/>
    <Outlet/>
  </div>)
}

export default Loyaut
