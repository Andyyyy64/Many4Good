import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'

function App() {

    const [backapi, setbackapi] = useState<any>([{}])

    useEffect(() => {
        fetch("http://localhost:4000/api").then(
            response => response.json()
        ).then(
            data => {
                setbackapi(data)
            }
        )
    }, [])

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </Router>
    )
}

export default App
