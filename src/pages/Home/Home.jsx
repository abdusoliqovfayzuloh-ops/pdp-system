import axios from 'axios'
import React, { useEffect, useState } from 'react'
import userIcon from '../../assets/avatar icon.png'
import commentIcon from '../../assets/comment icon.png'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import { CircularProgressbar } from 'react-circular-progressbar'

function Home({setTransactionsId, setTeacher}) {
  const [transactions, setTransactions] = useState([])
  const [loadin, setLoading] = useState(false)
  const [ball, setBall] = useState(0)
  const [status, setStatus] = useState("")
  const token = localStorage.getItem("token")
  const navigate = useNavigate("")
  let index = indexTransaction()
  let bonusBall = overBonusBall()

  async function getBall() {
    try {
      const res = await axios.get("https://pdp-system-backend-1.onrender.com/api/v1/scores/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setBall(res.data.data.rewardScore)
      setStatus(res.data.data.status)
    } catch (err) {
      console.log(err)
    }
  }
  async function getStudent() {
    try {
      setLoading(true)
      const transactionsRes = await axios.get(`https://pdp-system-backend-1.onrender.com/api/v1/transactions/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(transactionsRes.data.data)
      setTransactions(transactionsRes.data.data.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  function overBonusBall() {
    let bonusBall = 0
    transactions.forEach((teacher) => {
      bonusBall = bonusBall + teacher.pointChange
    })
    return bonusBall
  }
  function indexTransaction() {
    let index = 0
    return transactions.length - 1 > index ? index = transactions.length - 1 : index
  }

  useEffect(() => {
    getStudent()
    getBall()
    indexTransaction()
    overBonusBall()
  }, [])


  return (loadin ? <Loading className={"big"} /> : <main className='site__main'>
    <h1 className="student_top-title">Student</h1>
    <section className='student'>
      <div className="student__inner">
        <div className='student__ball'>
          <CircularProgressbar value={3 * 10} text={`${3}/10`} />
        </div>
        <div className="student__content">
          <span className={ball >= 5 ? "span_green" : "span_red"}>{status}</span>
          <h2 className="student_title">{transactions[index]?.studentId?.fullName}</h2>
          <p className="student_text">{transactions[index]?.studentId?.email}</p>
        </div>
      </div>
    </section>
    <section className="reating">
      <div className="reating__wraper">
        <div className="reating__plus-ball reating__box">+ {bonusBall}</div>
        <div className="reating__minus-ball reating__box">- 8</div>
        <div className="reating__end-ball reating__box">+ {transactions[index]?.pointChange}</div>
        <div className="reating__end-roul reating__box">{transactions[index]?.ruleId?.title}</div>
      </div>
    </section>
    <section className="teacher">
      <h2 className='teacher_title'>Teacher give you ball</h2>
      <ul className="teacher__list">
        {
          transactions?.map((transaction) => <li key={transaction._id} className="teacher__item">
            <div className="teacher__content">
              <img width={50} src={userIcon} alt="" className="teacher_icon" />
              <h3 className="teacher_subtitle">{transaction.teacherId.fullName}</h3>
            </div>
            <div className="teacher__ball">
              <span className={transaction.pointChange > 0 ? "teacher_ball-plus" : "teacher_ball-minus"}>{transaction.pointChange} ball</span>
              <button onClick={() => {
                navigate(`/loyaut/complain`) 
                setTransactionsId(transaction._id)
                setTeacher(transaction.teacherId)
              }} className="teacher_btn"><img width={50} src={commentIcon} alt="" /></button>
            </div>
          </li>)
        }
      </ul>
    </section>
  </main>)
}

export default Home
