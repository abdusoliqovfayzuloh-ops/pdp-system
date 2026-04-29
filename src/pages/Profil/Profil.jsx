import axios from 'axios'
import './Profil.css'
import React, { useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal'

function Profil() {

  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const token = localStorage.getItem("token")

  // 🔄 GET PROFILE
  async function getProfile() {
    try {
      setLoading(true)

      const res = await axios.get("https://pdp-system-backend-1.onrender.com/api/v1/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setUser(res.data.data)

    } catch (err) {
      console.log(err)
      setError("Ma'lumotlarni olishda xatolik!")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  // ⏳ LOADING
  if (loading) return <h2>Loading...</h2>

  // ❌ ERROR
  if (error) return <h2>{error}</h2>

  return (
    <main className="sitemain">

      <h1>Profile</h1>

      {/* PROFILE CARD */}
      <div className="aboutchild">
        <span className='nameimg'>
          {user?.fullName?.slice(0, 2).toUpperCase()}
        </span>

        <h2 className='name'>{user?.fullName}</h2>
        <p className='email'>{user?.email}</p>
        <p className='sinf'>Sinf: {user?.classId?.name}</p>
      </div>

      {/* INFO */}
      <div className="malumot">
        <h2>Shaxsiy ma'lumotlar</h2>

        <p>To‘liq ism</p>
        <h3>{user?.fullName}</h3>

        <p>Email</p>
        <h3>{user?.email}</h3>

        <p>Sinf</p>
        <h3>{user?.classId?.name}</h3>

        <p>Telefon</p>
        <h3>{user?.parentPhone}</h3>
      </div>

      {/* PASSWORD */}
      <div className="parols">
        <p>Email</p>
        <h3>{user?.email}</h3>

        <p>Parol</p>
        <h3>****</h3>

        <button
          className='btn__edit'
          onClick={() => setOpen(true)}
        >
          Edit password
        </button>
      </div>

      {/* 🔐 MODAL */}
      {open && <Modal setOpen={setOpen} />}

    </main>
  )
}

export default Profil