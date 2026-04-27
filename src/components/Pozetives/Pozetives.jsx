import React, { useEffect, useState } from 'react'
import './Pozetives.css'
import axios from 'axios'
import roul from '../../assets/roul icon.png'
import Loading from '../Loading/Loading'

function Pozetives() {
  const [pozetives, setPozetives] = useState([])
  const token = localStorage.getItem("token")
  const [loading,setLoading] = useState(false)

  async function getPozetives(){
    try{
      setLoading(true)
      const res = await axios.get("https://pdp-system-backend-1.onrender.com/api/v1/rules?sign=positive",{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      setPozetives(res.data.data)
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    getPozetives()
  },[])

  if(loading){
    return(<>
      <Loading className={"big"}/>
    </>)
  }

  return (<ul className='pozetives__list'>
    {
      pozetives?.map((pozetiv) => <li key={pozetiv._id} className='pozetives__item'>
        <div className="pozetives__content">
          <div className="pozetives__inner">
            <img src={roul} alt="" className="pozetives_icon" width={35} />
            <h3 className="pozetivs_subtitle">{pozetiv.description}</h3>
          </div>
          <span className="pozetives_ball">+ {pozetiv.pointValue} ball</span>
        </div>
        <p className="pozetives_text">{pozetiv.title}</p>
      </li>)
    }
  </ul>)
}

export default Pozetives