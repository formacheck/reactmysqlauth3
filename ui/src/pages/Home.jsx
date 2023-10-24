import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

const Home = () => {

    const [name, setName] = useState('')
  

    const navigate = useNavigate()

    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('http://localhost:8080')
            .then(res => {
                if (res.data.valid) {
                    setName(res.data.username)
                } else {
                    navigate('/signin')
                }
            })
    }, [])


  


    return (
        <div className='card'>

            <div>
                welcome {name}
             
            </div>


        </div>
    )
}

export default Home