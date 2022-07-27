import React from 'react'
import "./Login.css"
import vector from "../../Data/vector.png"
import right from "../../Data/right.png"
import google from "../../Data/google2.png"
import { auth } from "../../firebase-config"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
    .then((result) => {
      navigate('/home')
    }).catch((err) => {
      console.log(err);
      alert(err.message)
    })

  }
  return (
    <div className='login row ' >
      <div className='col-12 col-md-6 login-right ' >
        <div className="login-nav p-5" 
       >
          <img src={vector} alt="logo" />
        </div>
        <div className="login-content d-flex justify-content-center mt-5 ">
          <h4 className='mt-5' >LOGIN</h4>
        </div> 
        <div className="login-content d-flex justify-content-center px-5  ">
          <p style={{textAlign:"center",width:"25rem",fontSize:"16px"}} >Lorem ipsum dolor sit amet consectetur 
            adipisicing elit. Voluptate vitae inventore
            quia odit veritatis facere velit, asperiores
            doloremque a sapiente. Hic recusandae doloremquequia odit 
            veritatis facere velit, asperiores
            doloremque a sapiente. Hic recusandae doloremque
            nulla deleniti? Illum, doloremque! Sequi, ut facilis.</p>
        </div>
        <div className="login-content d-flex justify-content-center p-5  ">
          <button 
          onClick={signInWithGoogle}
          className='login-button mt-3' > 
            <img src={google}
             alt="icon"
             style={{width:"2.5rem", borderRadius:"1px",marginRight:"10px"}}
              /> 
              Sign in using Google</button>
        </div>
      </div>


      <img 
      src={right}
      className='col-12 col-md-6 login-right'>
      </img>
    </div>
  )
}

export default Login