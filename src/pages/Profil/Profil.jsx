import axios from 'axios'
import './Profil.css'
import React, { useEffect, useState } from 'react'

function Profil() {


    const [user, setUser] = useState([])
    const [clas, setClas] = useState([])
    const [number, setNumber] = useState([])
    const token = localStorage.getItem("token")


    // profil  ismlari bu

    async function getProfile() {
        try {
            const res = await axios.get("https://pdp-system-backend-1.onrender.com/api/v1/auth/me ", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUser(res.data.data);
            console.log(res.data.data);
        } catch (error) {
            console.log(error.message);
        }
    }



    // sinfini oliyapman

    async function getProfileClass() {
        try {
            const res = await axios.get(`https://pdp-system-backend-1.onrender.com/api/v1/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data.data)


            setClas(res.data.data.classId);
        } catch (error) {
            console.log(error.message);
        }
    }

    // telefon nomerini olish
    async function getProfileNumber() {
        try {
            const res = await axios.get(`https://pdp-system-backend-1.onrender.com/api/v1/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data.data)


            setNumber(res.data.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getProfile(),
            getProfileClass(),
            getProfileNumber()
    }, [])


    return (
        <main className="sitemain">
            <div>

                <h1>Profile</h1>



                <div className="aboutchild">
                    <span className='nameimg'>AB</span>
                    <h2 className='name'>{user?.fullName}</h2>
                    <p className='email'>{user?.email}</p>
                    <p className='sinf'>sinf:{clas?.name}</p>

                </div>
            </div>



            <div className="malumot">
                <h2 className='shaxsiy'>shaxsiy malumotlarim</h2>

                <p className='toliq ism'>toliq ism</p>
                <h2>{user?.fullName}</h2>
                <p>Elektron pochta</p>
                <h2>{user?.email}</h2>
                <p>Sinf</p>
                <h2>{clas?.name}</h2>
                <p>Telefon rqami</p>
                <h2>{number?.parentPhone}</h2>
            </div>


              <div className="parols">
                <h2 className='email'>email</h2>
                <p className='emailsi'>{user?.email}</p>


                 <h2 className='parol'>parol</h2>
              <p className="paroli">****</p>
             
            </div>
        </main>

    )
}

export default Profil
