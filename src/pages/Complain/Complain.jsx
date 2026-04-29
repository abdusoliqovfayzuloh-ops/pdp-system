import React, { useEffect, useRef, useState } from 'react'
import './Complain.css'
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

function Complain({ teacher, student}) {
  const token = localStorage.getItem("token")
  const [apples, setApples] = useState([])
  const applesInput = useRef(null)
  const transactionId = localStorage.getItem("transactionId")

  async function getAppels(){
    try{
        const res = await axios.get("https://pdp-system-backend-1.onrender.com/api/v1/appeals/me",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        setApples(res.data.data)
    }catch(err){
        console.log(err)
    }
  }

 async function postApples(){
  try{
    if (!transactionId) return alert("transactionId yo‘q")

    const res = await axios.post("https://pdp-system-backend-1.onrender.com/api/v1/appeals",
      {
        transactionId: transactionId,
        message: applesInput.current.value
      },
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    )

    applesInput.current.value = ""
    getAppels()

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
                    apples.map((shikoyat) => <div key={shikoyat._id} className="shikoyat__content">
                     <div className="student__content">
                        <h3 className="shikoyat_subtitle">{student.data.user.fullName}</h3>
                        <p className="shikoyat_text">{student.data.user.email}</p>
                     </div>
                     <span className="shikoyat_ball">{shikoyat.transactionId.pointChange}</span>
                     <p className="shikoyat_text">{shikoyat.message}</p>
                     <p className="shikoyat_text">{shikoyat.transactionId.reason}</p>
                     <div className="teacher__content">
                        <h3 className="shikoyat_subtitle">{teacher.fullName}</h3>
                        <p className="shikoyat_text">{teacher.email}</p>
                     </div>
                    </div>)
                }
            </div>
        </section>
  </main>)
}

export default Complain