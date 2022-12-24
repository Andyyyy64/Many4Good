import { Rdirect, BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import { useAuth0 } from '@auth0/auth0-react';


function App() {
  const { isLoading,isAuthenticated } = useAuth0();
  console.log(isAuthenticated)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
