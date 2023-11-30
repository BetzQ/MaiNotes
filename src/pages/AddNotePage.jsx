import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addNote } from '../utils/api'
import '../styles/AddNotePage.css'
import NoteInput from '../components/NoteInput'
import { useTheme } from '../context/ThemeContext'

function AddNotePage() {
  const navigate = useNavigate()
  const [newNote, setNewNote] = useState({
    title: '',
    body: '',
  })

  const { locale } = useTheme()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewNote({ ...newNote, [name]: value })
  }

  const handleAddNote = async () => {
    try {
      const result = await addNote(newNote)

      if (!result.error) {
        navigate('/')
      } else {
        console.error('Error adding note:', result.data)
      }
    } catch (error) {
      console.error('Error adding note:', error)
    }
  }

  return (
    <div className="add-note-container">
      <h1 className="add-note-title">
        {locale === 'id' ? 'Tambah Catatan Baru' : 'Add New Note'}
      </h1>
      <NoteInput
        title={newNote.title}
        body={newNote.body}
        handleInputChange={handleInputChange}
        handleAddNote={handleAddNote}
      />
    </div>
  )
}

export default AddNotePage
