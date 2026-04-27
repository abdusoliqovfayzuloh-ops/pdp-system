import React, { useEffect, useRef, useState } from 'react'
import './Complain.css'
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

function Complain() {
  const token = localStorage.getItem("token")
  const [apples, setApples] = useState([])
  const applesInput = useRef(null)

  async function getAppels(){
    try{
        const res = await axios.get("https://pdp-system-backend-1.onrender.com/api/v1/appeals/me",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data)
        setApples(res.data.data)
    }catch(err){
        console.log(err)
    }
  }

  async function postApples(){
    try{
        const res = await axios.post("https://pdp-system-backend-1.onrender.com/api/v1/appeals",
            {
                transactionId: "sadfasdfasdfas",
                message: applesInput.current.value
            },
            {
              headers:{
                Authorization: `Bearer ${token}`
              }
            } 
        )
        console.log(res.data)
    }catch(err){
        console.log(err)
    }
  }

  useEffect(() => {
    getAppels()
  },[])

  return (<main className='site__main'>
        <h1 className='shikoyat_title'>Shikoyatlarim</h1>  
        <section className="shikoyat">
            <form onSubmit={(evt) => {
                evt.preventDefault()
                postApples()
            }} className="shikoyat__form">
                <label htmlFor="apples" className="shikoyat_label">Shikoyatingizni kiriting</label>
                <div className="shikoyat__content">
                    <input placeholder='shikoyatim' id='apples' type="text" className="shikoyat_input" ref={applesInput}/>
                    <button className="shikoyat_btn">Submit</button>
                </div>
            </form>
            <div className="shikoyat__wraper">
                {
                    apples.map((shikoyat) => <div className="shikoyat__content">
                     <div className="student__content">
                        <img src="" alt="" className="shikoyat_avatar" />
                        <h3 className="shikoyat_subtitle"></h3>
                        <p className="shikoyat_text"></p>
                     </div>
                     <p className="shikoyat_text"></p>
                    </div>)
                }
            </div>
        </section>
  </main>)
}

export default Complain