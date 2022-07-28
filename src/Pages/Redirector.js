import React from 'react'
import { Link } from 'react-router-dom'

function Redirector() {
    return (
        <div className='d-flex justify-content-center my-5 '
            style={{
                width: "80%", height: "30%", margin: "10%", backgroundColor: "rgb(163, 184, 223)", marginTop: "5rem",
                paddingTop: "5rem", borderRadius: "10px"
            }}>
            <span className='mb-5' > <span>You are not signed in, Go To Login Page</span>
                <Link
                    className='primary my-5 '
                    to={"/"} > here </Link></span>
        </div>
    )
}

export default Redirector