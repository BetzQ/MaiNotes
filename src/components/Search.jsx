import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import '../styles/Search.css'
import { useTheme } from '../context/ThemeContext'

function Search({ allNotes, setAllNotes, setQueryInURL, initialQuery }) {
  const [searchText, setSearchText] = useState(initialQuery)
  const { locale } = useTheme()

  useEffect(() => {
    setSearchText(initialQuery)
  }, [initialQuery])

  const handleSearch = (text) => {
    const filteredNotes = allNotes.filter((note) =>
      note.title.toLowerCase().includes(text.toLowerCase()),
    )
    setAllNotes(filteredNotes)
    setQueryInURL(text)
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={
          locale === 'id' ? 'Cari berdasarkan judul ...' : 'Search by title...'
        }
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value)
          handleSearch(e.target.value)
        }}
        className="search-input"
      />
    </div>
  )
}

Search.propTypes = {
  allNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAllNotes: PropTypes.func.isRequired,
  setQueryInURL: PropTypes.func.isRequired,
  initialQuery: PropTypes.string,
}

export default Search
