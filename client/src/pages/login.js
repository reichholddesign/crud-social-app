import { Link, Route, Routes, useNavigate } from 'react-router-dom'

import { useState } from 'react'



export default function Login({setUser, user}){
   const [message, setMessage] = useState({show: false, text: ""})
   const navigate = useNavigate();


  async  function handleLoginClick(e){
e.preventDefault()
let inputs = document.querySelectorAll('input')
    try{
    const dataPost = await fetch('/login', {
        method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: inputs[0].value,
                          password: inputs[1].value,                      
                        })
    }) 
    const response = await dataPost
    const resJson = await response.json()

    if(resJson.login === true){
        setUser({...resJson.user})
        navigate("/profile");
    }else{
    setMessage({show: true, text: resJson.info.msg})
    setTimeout(()=> {
        setMessage({show: false, text: ''})
    }, 3000)
    }
    }catch(err){
        console.log(err)
    }


    }

        return (
            <>
            <main className="container">
            <div className="row justify-content-center">
            <section className="col-6 mt-5"> 
              <form>
              <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label"
                    >Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="email"
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                  />
                </div>
                { message.show &&  
        <div>

               <span className='message'>{message.text}</span>
               </div>
   }
  
                <button type="submit" onClick={(e) => handleLoginClick(e)} className="btn btn-primary">Submit</button>
              </form>
            </section>
          </div>
        </main>
        </>
        
        )
        
}