import axios from 'axios'
import React, { useEffect, useState } from 'react'
import avatar from '../../assets/avatar icon.png'
import './Leaders.css'
import Loading from '../../components/Loading/Loading'

function Leaders() {
    const [leaders, setLeaders] = useState([])
    const token = localStorage.getItem("token")
    const [loading, setLoading] = useState(false)
    async function getLeaders() {
        try {
            setLoading(true)
            const res = await axios.get("https://pdp-system-backend-1.onrender.com/api/v1/stats/leaderboard/students", {
                headers: {
                    Authorization: `Bearer ${ token }`
            }
        })
    setLeaders(res.data.data)
}catch (err) {
    console.log(err)
} finally {
    setLoading(false)
}
  }

useEffect(() => {
    getLeaders()
}, [])

if (loading) {
    return (<>
        <Loading className={"big"}/>
    </>)
}

return (<main className='site__main'>
    <section className="leader">
        <div className="leader__wraper">
            <h1 className="leader_title">Sinif bo'yicha leaderlar</h1>
            <ol className="leader__list">
                {
                    leaders?.map((leader) =>
                        <li key={leader.student._id} className="leader__item">
                            <div className="leader__content">
                                <img src={avatar} alt="" className="leader_avatar" />
                                <div className="leader__inner">
                                    <h3 className='leader_name'>{leader.student.fullName}</h3>
                                    <small className="leader_email">{leader.student.email}</small>
                                </div>
                            </div>
                            <span className={leader.rewardScore > 7 ? "leader_ball-green" : leader.rewardScore > 4 ? "leader_ball-yellow" : "leader_ball-red"}>{leader.rewardScore} ball</span>
                        </li>
                    )
                }
            </ol>
        </div>
    </section>
</main>)
}
export default Leaders;