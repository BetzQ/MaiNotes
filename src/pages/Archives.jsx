import React, { useEffect, useState } from 'react'
import NoteList from '../components/NoteList'
import { getArchivedNotes } from '../utils/api'
import Search from '../components/Search'
import { useSearchParams } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Archives() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [allNotes, setAllNotes] = useState([])
  const { locale } = useTheme()

  useEffect(() => {
    const fetchArchivedNotes = async () => {
      const result = await getArchivedNotes()

      if (!result.error) {
        setAllNotes(result.data)
      } else {
        console.error('Error fetching archived notes:', result.data)
      }
    }

    fetchArchivedNotes()
  }, [])

  const query = searchParams.get('q') || ''

  const setQueryInURL = (text) => {
    searchParams.set('q', text)
    setSearchParams(searchParams)
  }

  return (
    <div className="notes-container">
      <h1 className="notes-title">
        {locale === 'id' ? 'Arsip Catatan' : 'Notes Archives'}
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

export default Archives
