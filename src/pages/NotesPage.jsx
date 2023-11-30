import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getActiveNotes } from '../utils/api'
import '../styles/NotesPage.css'
import NoteList from '../components/NoteList'
import Search from '../components/Search'
import { useTheme } from '../context/ThemeContext'

function NotesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [allNotes, setAllNotes] = useState([])
  const { locale } = useTheme()

  const query = searchParams.get('q') || ''

  const setQueryInURL = (text) => {
    searchParams.set('q', text)
    setSearchParams(searchParams)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getActiveNotes()

        if (!result.error) {
          setAllNotes(result.data.filter((note) => !note.archived))
        } else {
          console.error('Error fetching notes:', result.data)
        }
      } catch (error) {
        console.error('Error fetching notes:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="notes-container">
      <h1 className="notes-title">
        {locale === 'id' ? 'Semua Catatan' : 'All Notes'}
      </h1>
      <Search
        allNotes={allNotes}
        setAllNotes={setAllNotes}
        setQueryInURL={setQueryInURL}
        initialQuery={query}
      />
      <ul className="notes-list">
        <NoteList allNotes={allNotes} />
      </ul>
    </div>
  )
}

export default NotesPage
