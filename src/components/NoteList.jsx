import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { showFormattedDate } from '../utils/index'
import { useTheme } from '../context/ThemeContext'

function NoteList({ allNotes }) {
  const { locale } = useTheme()

  return allNotes.length > 0 ? (
    allNotes.map((note) => (
      <li key={note.id} className={`note-item`}>
        <Link to={`/notes/${note.id}`} style={{ color: 'inherit' }}>
          <h2 className="note-title">{note.title}</h2>
        </Link>
        <p className="note-body">{note.body}</p>
        <p className="note-created-at">
          {locale === 'id' ? 'Dibuat pada:' : 'Created At:'}{' '}
          {showFormattedDate(note.createdAt)}
        </p>
      </li>
    ))
  ) : (
    <p>{locale === 'id' ? 'Tidak ada catatan' : 'No notes available'}</p>
  )
}

NoteList.propTypes = {
  allNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default NoteList
