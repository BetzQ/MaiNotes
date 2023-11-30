import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import NotesPage from './pages/NotesPage'
import NoteDetailPage from './pages/NoteDetailPage'
import AddNotePage from './pages/AddNotePage'
import { FaPlus } from 'react-icons/fa'
import './App.css'
import Archives from './pages/Archives'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import { getUserLogged,getActiveNotes } from './utils/api'
import LoginOrRegister from './pages/LoginOrRegister'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  )
}

function MainApp() {
  const location = useLocation()
  const [authedUser, setAuthedUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function GetUserLogged() {
      const { data } = await getUserLogged()
      setAuthedUser(data)
      setLoading(false)
      const {gan} = getActiveNotes()
    }
    GetUserLogged()
  }, []) 

  // Loading data view
  if (loading) {
    return (
      <div id="loading-container">
        <div className="loader"></div>
      </div>
    )
  }

  return (
    <div className="app-container">
      {authedUser === null ? (
        <LoginOrRegister authedUser={authedUser} setAuthedUser={setAuthedUser} />
      ) : (
        <>
          <Navbar authedUser={authedUser} setAuthedUser={setAuthedUser} />
          {location.pathname !== '/notes/new' &&
            !location.pathname.includes('/notes/') && (
              <Link to="/notes/new" style={{ color: 'inherit' }}>
                <div className="add-note-button">
                  <FaPlus className="add-note-icon" />
                </div>
              </Link>
            )}
          <Routes>
            <Route path="/" element={<NotesPage />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/notes/new" element={<AddNotePage />} />
            <Route path="/notes/:id" element={<NoteDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </>
      )}
    </div>
  )
}

export default App
