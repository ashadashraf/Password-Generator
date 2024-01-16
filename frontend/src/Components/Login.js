import './Base.css';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [authType, setAuthType] = useState('login');
  const navigate = useNavigate()

  const handleAuthType = () => {
    if (authType === 'login') {
      setAuthType("signup")
    } else if (authType === 'signup') {
      setAuthType("login")
    }
  }
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    const response = await fetch('https://54.210.227.118/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password })
        });

        let data = await response.json();

        if(data){
          if (data.message === "login success") {
            localStorage.setItem('userId', JSON.stringify(data.data.userId));
            localStorage.setItem('accessToken', JSON.stringify(data.data.access));
            localStorage.setItem('refreshToken', JSON.stringify(data.data.refresh));
            toast.success("Login success");
            navigate('/')
          } else {
            if (data.message === "invalid password") {
              toast.error("Invalid Password");
            } else if (data.message === "user does not exist") {
              toast.error("User does not exist");
            } else {
              toast.error("something went wrong");
            }
          }
        } else {
          alert('Something went wrong while loggin in the user!')
        }
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    
    const response = await fetch('https://54.210.227.118/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password })
        });

        let data = await response.json();

        if(data){
          console.log(data)
          if (data.message === "registeration success") {
            toast.success("Signup success");
            navigate('/login')
            window.location.reload()
          } else {
            if (data.message === "email already exist") {
              toast.error("Email already exist !");
            } else {
              toast.error("something went wrong");
            }
          }
        } else {
          alert('Something went wrong while signup the user!')
        }
  }

  return (
    <div className='login-container'>
      <div style={{backgroundColor:'white', width:'300px', padding:'30px', borderRadius:'20px', height:'300px'}}>
        <h3 className='login-header d-flex justify-content-center'>{authType === "login" ? 'Login' : 'Signup'}</h3>
        <form className='login'>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
          <button className='login-button' onClick={authType === "login" ? handleLogin : handleSignup} type='submit'>Submit</button>
        </form>
        <p style={{color:'blue', cursor: 'pointer'}} className='d-flex justify-content-center pt-3' onClick={handleAuthType}>{authType === "login" ? 'Go Signup!' : "Go Login!"}</p>
      </div>
    </div>
  )
}

export default Login