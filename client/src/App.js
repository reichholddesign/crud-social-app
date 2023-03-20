// import React from "react";
import {useState, useEffect}  from "react"
import logo from './logo.svg';
import Layout from './components/layout';
import './App.scss';
import Home from './pages/home'
import Login from './pages/login'
import SignUp from './pages/sign-up'
import Profile from "./pages/profile";
import Feed from "./pages/feed"
import { Link, Route, Routes } from 'react-router-dom'
import Post from './pages/post'


function App() {

  const [user, setUser] = useState(null)

  async function logOut(){
    await fetch('/logout')
    setUser(null)
  }

  let navigation;

  if(user === null) {
    navigation = (
      <>
      <li><Link to="/">Home</Link></li>
      <div>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/sign-up">Sign up</Link></li>
      </div>
      </>
    )
  } else {
    navigation = (
      <>
        <li><Link to="/">Home</Link></li>
        <div>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/feed">Feed</Link></li>
        <li><Link to="/" onClick={logOut}>Log out</Link></li>
        </div>
      </>
    )
  }

  
  return (
    <>    
    <nav>
      <ul>
       {navigation}
      </ul>
    </nav>
    
    <Routes> 
      <Route path="/"  element={<Home user={user} />}></Route>
      <Route path="/profile" element={<Profile setUser={setUser} user={user} />}></Route>
      <Route path="/login" element={<Login setUser={setUser} user={user}/>}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route path="/feed" element={<Feed />}></Route>
      <Route path="/post/:id" element={<Post user={user} />}></Route>
    </Routes>
    </>

  );
}


export default App;
