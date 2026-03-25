import React, { useContext , useState} from 'react'
import { authStyles as styles} from '../assets/dummystyle'
import {UserContext} from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import {validateEmail} from '../utils/helper'
import axiosInstance from '../utils/axiosInstance'

const SignUp = (setCurrentPage) => {
  const {fullname,setFullName}=useState('');
  const {email,setEmail}=useState(' ');
  const {password,setPassword}=useState(' ');
  const {error,setError}=useState(' ');
  const {updateUser}=useContext(UserContext);
  const navigate=useNavigate();

  const handleSignUp=async(e)=>{
    e.preventDefault();
    if(!fullname){
      setError("Full name is required");
      return;
    }
    if(!validateEmail(email)){
      setError("Invalid email address");
      return
    }
    if(!password){
      setError("Password is required");
      return;
    }
    setError('');
    try{
      const response=await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        name:fullname,
        email,
        password,
      });
      const {token}=response.data;
      if(token){
        localStorage.setItem('token',token);
        updateUser(response.data);
        navigate('/dashboard');
      }
    }
    catch(error){
      setError(error.response?.data?.message || "Something went wrong. Please try again later.");
    }


  return (
    <div className={styles.signupContainer}>
        <div className={styles.headerWrapper}>
            <h3 className={styles.signupTitle}>Create Account</h3>
            <p className={styles.signupSubtitle}>Join thousands of professional today</p>
        </div>

        <form onSubmit={handleSignUp} className={styles.signupForm}>
          <input value={fullname} onChange={({target})=> setFullName(target.value)} label="Full name" placeholder='abc' type='text'/>
          <input value={email} onChange={({target})=> setEmail(target.value)} label="Email" placeholder='a@gmail.com' type='email'/>
          <input value={password} onChange={({target})=> setPassword(target.value)} label="Password" placeholder='Min 8 characters' type='password'/> 

          {error && <div className={styles.errorMessage}>{error}</div>}
          <button type="submit" className={styles.signupButton}>Create Account</button>

          {/* footer */}
          <p className={styles.switchText}>Already have an account ?{' '}
            <button type='button' className={styles.switchButton} onClick={()=>setCurrentPage('login')}>Sign In</button>
          </p>
        </form>  
    </div>
  )
}
}

export default SignUp
