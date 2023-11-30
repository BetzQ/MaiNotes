import React from 'react'
import PropTypes from 'prop-types'
import { FaCheck } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function NoteInput({ title, body, handleInputChange, handleAddNote }) {
  const { locale } = useTheme()

  return (
    <>
      <form className="add-note-form">
        <div className="form-group">
          <label htmlFor="title">{locale === 'id' ? 'Judul' : 'Title'}</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleInputChange}
            className="add-note-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">
            {locale === 'id' ? 'Isi Catatan' : 'Note Content'}
          </label>
          <textarea
            id="body"
            name="body"
            value={body}
            onChange={handleInputChange}
            className="add-note-textarea"
          />
        </div>
      </form>
      <div className="button-group">
        <button onClick={handleAddNote} className="add-note-button">
          <FaCheck className="add-note-icon" />
        </button>
        <Link to="/" className="add-note-link" style={{ color: 'inherit' }}>
          {locale === 'id' ? 'Batal' : 'Cancel'}
        </Link>
      </div>
    </>
  )
}

NoteInput.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleAddNote: PropTypes.func.isRequired,
}

export default NoteInput
