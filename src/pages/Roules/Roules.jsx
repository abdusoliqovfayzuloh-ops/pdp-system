import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import './Roules.css'

function Roules() {
  return (<main className='site__main'>
    <section className='rouls'>
      <h2 className='rouls_title'>PDP qoidalari</h2>
      <ul className='rouls__list'>
        <li className='rouls_item'><NavLink to={"negatives"} className={"rouls_link"}>Negatives</NavLink></li>
        <li className='rouls_item'><NavLink to={"pozetives"} className={"rouls_link"}>Pozetives</NavLink></li>
      </ul>
      <Outlet/>
    </section>
  </main>)
}

export default Roules