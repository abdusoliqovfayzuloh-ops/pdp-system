import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Negatives.css'
import roul from '../../assets/roul icon.png'
import Loading from '../Loading/Loading'

function Negatives() {
  const [negatives, setNegatives] = useState([])
  const token = localStorage.getItem("token")
  const [loading, setLoading] = useState(false)

  async function getNegatives(){
    try{
        setLoading(true)
        const res = await axios.get("https://pdp-system-backend-1.onrender.com/api/v1/rules?sign=negative",{
            headers: {
                Authorization: `Bearer ${token}`
            }
            
        })
        setNegatives(res.data.data)
    }catch(err){
        console.log(err)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    getNegatives()
  },[])

  if(loading){
    return(<>
      <Loading className={"big"}/>
    </>)
  }

  return (<ul className='negatives__list'>
    {
      negatives?.map((negativ) => <li key={negativ._id} className='negatives__item'>
              <div className="negatives__content">
                <div className="negatives__inner">
                  <img src={roul} alt="" className="negatives_icon" width={35} />
                  <h3 className="negatives_subtitle">{negativ.description}</h3>
                </div>
                <span className="negatives_ball">{negativ.pointValue} ball</span>
              </div>
              <p className="negatives_text">{negativ.title}</p>
            </li>)
    }
  </ul>
  )
}

export default Negatives