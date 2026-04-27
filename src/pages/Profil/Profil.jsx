 import axios from "axios";
import React, { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

const Profil = () => {
    const [user, setUser] = useState([])
    const token = localStorage.getItem("token")

    async function getProfil(){
        try{
            const res = await axios.get("",{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUser(res.data)
            console.log(res.data)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        getProfil()
    },[])

    return (<>
    
    </>)
}

export default Profil;