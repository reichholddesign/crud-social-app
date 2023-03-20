import Header from './header'
import Landing from './landing'
import { useState } from 'react'
import '../styles/landing.scss'
// import Footer from './footer'

export default function Layout({ children }) {
  const [diplayedMainContent, setDiplayedMainContent] = useState('landing')

  function handleMainContentChange(content){
    setDiplayedMainContent(content)
  }


  return (
    <>
      <Header/>
      {diplayedMainContent === 'landing' && <Landing handleUpdate={handleMainContentChange}/> }
    </>
  )
}