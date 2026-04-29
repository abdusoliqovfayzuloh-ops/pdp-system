import React, { useState } from 'react'
import axios from 'axios'
import './Modal.css'

function Modal({ setOpen }) {

  const [oldPassword, setOldPassword] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const token = localStorage.getItem("token")

  async function handleSubmit(e) {
    e.preventDefault()

    if (!oldPassword) {
      alert("Eski parolni kiriting!")
      return
    }

    if (password !== confirmPassword) {
      alert("Parollar mos emas!")
      return
    }

    try {
      await axios.post(
        "https://pdp-system-backend-1.onrender.com/api/v1/auth/update-password",
        {
          oldPassword: oldPassword,
          newPassword: password
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert("Parol o‘zgartirildi!")
      setOpen(false)

    } catch (err) {
      console.log(err.response?.data || err.message)
      alert("Xatolik yuz berdi yoki eski parol noto‘g‘ri!")
    }
  }

  return (
    <div className="modal__overlay">
      <div className="modal__box">

        <h2 className="modal__title">Parolni o‘zgartirish</h2>

        <form onSubmit={handleSubmit}>

          {/* ESKI PAROL */}
          <label className="modal__label">Eski parol</label>
          <input
            type="password"
            className="modal__input"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          {/* YANGI PAROL */}
          <label className="modal__label">Yangi parol</label>
          <input
            type="password"
            className="modal__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* TASDIQLASH */}
          <label className="modal__label">Tasdiqlash</label>
          <input
            type="password"
            className="modal__input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="modal__actions">

            <button type="submit" className="modal__btn">
              Saqlash
            </button>

            <button
              type="button"
              className="modal__btn modal__close"
              onClick={() => setOpen(false)}
            >
              Yopish
            </button>

          </div>

        </form>

      </div>
    </div>
  )
}

export default Modal