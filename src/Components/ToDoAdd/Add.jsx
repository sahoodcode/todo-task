import React, { useContext, useEffect, useState } from 'react'
import vector from "../../Data/vector.png"
import { getAuth } from "firebase/auth";
import { db } from "../../firebase-config"
import "./Add.css"
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { listContext } from "../../Helpers/Context"
import { useNavigate } from 'react-router-dom';

function Add() {
  const [title, setTitle] = useState('')
  const [desc, setdesc] = useState('')
const navigate = useNavigate()
  const { setList, list } = useContext(listContext)
  const auth = getAuth();


  const handleStore = async () => {
    const user = auth.currentUser
    const uid = user.uid
    console.log(uid);
    const docRef = await addDoc(collection(db, uid), {
      title,
      desc,
      status: "none"
    })
    setTitle('')
    setdesc('')
    AllLists()
  }
  const AllLists = async () => {
    const user = auth.currentUser
    const uid = user.uid
    const q = query(collection(db, uid))
    let data = []
    setList([])
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id })
      setList(data)
      console.log(data);
    })
  }

  return (
    <div className="col-12 col-md-6 home-left">
      <div className="login-nav p-5" >
        <img src={vector} alt="logo" style={{ height: "3rem" }} />
      </div>
      <div className="login-content d-flex justify-content-center  ">
        <h4 className='mt-5' >TODO</h4>
      </div>
      <div className="login-content d-flex justify-content-center px-5 mt-3 ">
        <p style={{ textAlign: "center", width: "28rem", fontSize: "16px", color: "gray" }}
        >Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Voluptate vitae inventore
          quia odit veritatis facere velit, asperiores
          nulla deleniti? Illum, doloremque! Sequi, ut facilis.</p>
      </div>
      <div className="home-left-input mt-3">
        <input type="text"
          onChange={(e) => setTitle(e.target.value)}
          className='col-5'
          placeholder='Title'
          value={title} />
        <input type="text"
          onChange={(e) => setdesc(e.target.value)}
          className='col-5'
          placeholder='Description'
          value={desc} />
        <button className='col-4 mt-3'
          onClick={handleStore} >Add</button>
      </div>
    </div>
  )
}

export default Add