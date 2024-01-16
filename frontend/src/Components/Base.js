import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import {toast} from 'react-toastify';
import copy from 'copy-to-clipboard';
import './Base.css';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const Base = () => {
  const [site, setSite] = useState('');
  const [wordLength, setWordLength] = useState(6);
  const [includeUpperCase, setIncludeUpperCase] = useState(true);
  const [includeLowerCase, setIncludeLowerCase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChar, setIncludeSpecialChar] = useState(true);
  const [siteError, setSiteError] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const textRef = useRef();
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate()
  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  });

  const handleDecrement = (e) => {
    e.preventDefault()
    if (wordLength > 6) {
      setWordLength(wordLength-1);
    }
  }

  const handleIncrement = (e) => {
    e.preventDefault()
    if (wordLength < 30) {
      setWordLength(wordLength+1);
    }
  }

  const handleCheckboxChange = (type) => {
    const checkboxes = {
      uppercase: includeUpperCase,
      lowercase: includeLowerCase,
      numbers: includeNumbers,
      specialChar: includeSpecialChar,
    };

    const checkedCount = Object.values(checkboxes).filter((checked) => checked).length;

    if (checkedCount === 1 && checkboxes[type]) {
      return
    }

    switch (type) {
      case 'uppercase':
        setIncludeUpperCase(!includeUpperCase);
        break;
      case 'lowercase':
        setIncludeLowerCase(!includeLowerCase);
        break;
      case 'numbers':
        setIncludeNumbers(!includeNumbers);
        break;
      case 'specialChar':
        setIncludeSpecialChar(!includeSpecialChar);
        break;
      default:
        break;
    }
  }

  const copyToClipboard = () => {
    let copyText = textRef.current.value;
    let isCopy = copy(copyText);
    if (isCopy) {
      toast.success("Copied to Clipboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userId')
    navigate('/login')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!site) {
      setSiteError(true);
      return
    }
    if (!site) {
      setSiteError(true);
      return
    }
    setSiteError(false);
    
    try {
      axios.post('https://54.210.227.118:8000/', 
      {
        site: site,
        word_length: wordLength,
        upper_case: includeUpperCase,
        lower_case: includeLowerCase,
        numbers: includeNumbers,
        special_char: includeSpecialChar,
        user_id: userId,
      },
      {
        // headers:{
        //   'Authorization': `Bearer ${accessToken}`,
        //   'Content-Type': 'application/json',
        // }
      })
      .then(response => {
        console.log(response);
        console.log(response.data.data);
        setGeneratedPassword(response.data.data);
        console.log(site, wordLength, includeUpperCase, includeLowerCase, includeNumbers, includeSpecialChar);
      })
      .catch(error => {
        console.log('Error:', error);
        console.log('Error:', error.response.data.message);
      })
    } catch (error) {
      console.log('Error:', error);
      console.log('Error:', error.response.data.message);
    }
  };

  return (
    <div className='password-generator'>
      <h4 className='header d-flex justify-content-center p-4'>Django <span style={{color:'green'}}>password</span>generator</h4>
      <div className="logout-container">
        <button className='logout-button' onClick={handleLogout}>Logout</button>
      </div>
      <p className='view-all' onClick={() => navigate('viewall')}>View all passwords</p>
      <form className="form pt-2">
        <div className='d-flex flex-column justify-content-start'>
          <div className="site d-flex justify-content-space-between align-items-top p-2">
            <h6 style={{marginRight:'15px', marginTop:'18px'}}>Site</h6>
            <div>
              <input type="text" onChange={(e) => [setSite(e.target.value), setSiteError(false)]} value={site} required />
              {siteError && <p className="error" style={{color:'red', fontSize: '12px'}}>*Site field cannot be empty</p>}
            </div>
          </div>
          <div className="length d-flex justify-content-space-between align-items-center p-2">
            <h6 style={{marginRight:'15px'}}>Length</h6>
            <div>
              <button className='increment-decrement-button' style={{marginRight: '10px'}} onClick={handleDecrement}>-</button>
              <input type="number" className='number-section' value={wordLength} readOnly min={0} max={30} />
              <button className='increment-decrement-button' style={{marginLeft: '10px'}} onClick={handleIncrement}>+</button>
            </div>
          </div>
          <div className="uppercase d-flex justify-content-space-between align-items-center p-2">
            <h6 style={{ marginRight: '15px' }}>Uppercase</h6>
            <input type="checkbox" checked={includeUpperCase} onChange={() => handleCheckboxChange('uppercase')} />
          </div>
          <div className="lowercase d-flex justify-content-space-between align-items-center p-2">
            <h6 style={{ marginRight: '15px' }}>Lowercase</h6>
            <input type="checkbox" checked={includeLowerCase} onChange={() => handleCheckboxChange('lowercase')} />
          </div>
          <div className="numbers d-flex justify-content-space-between align-items-center p-2">
            <h6 style={{ marginRight: '15px' }}>Numbers</h6>
            <input type="checkbox" checked={includeNumbers} onChange={() => handleCheckboxChange('numbers')} />
          </div>
          <div className="specialChar d-flex justify-content-space-between align-items-center p-2">
            <h6 style={{ marginRight: '15px' }}>Special Character</h6>
            <input type="checkbox" checked={includeSpecialChar} onChange={() => handleCheckboxChange('specialChar')} />
          </div>
          <div className='button d-flex justify-content-center align-items-center p-2'>
            <button type='submit' onClick={handleSubmit} className='generate-button'>
              Generate Password
            </button>
          </div>
        </div>
      </form>
      { generatedPassword && 
      <div className="generated-password-div">
        <p className='generated-password-header'>Generated Password: </p>
        <input className='generated-password' value={generatedPassword} disabled type='text' ref={textRef} />
        <button className='copy-button' onClick={copyToClipboard}>copy</button>
      </div>
      }
    </div>
  )
}

export default Base