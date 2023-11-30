import React, { useEffect, useState } from 'react'
import { getNote,archiveNote,unarchiveNote,deleteNote } from '../utils/api'
import { showFormattedDate } from '../utils/index'
import { useNavigate, useParams } from 'react-router-dom'
import { FaTrash, FaArchive, FaUndo } from 'react-icons/fa'
import '../styles/NoteDetailPage.css'
import { useTheme } from '../context/ThemeContext'

function NoteDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [note, setNote] = useState(null)
  const { locale } = useTheme()

  useEffect(() => {
    const fetchNote = async () => {
      const result = await getNote(id)

      if (!result.error) {
        setNote(result.data)
      } else {
        console.error('Error fetching note:', result.data)
      }
    }

    fetchNote()
  }, [id])

  const handleDeleteNote = async () => {
    const result = await deleteNote(id);

    if (!result.error) {
      navigate('/');
    } else {
      console.error('Error deleting note:', result.data);
    }
  };

  const handleArchiveNote = async () => {
    const result = await archiveNote(id);

    if (!result.error) {
      navigate('/');
    } else {
      console.error('Error archiving note:', result.data);
    }
  };
  const handleUnArchiveNote = async () => {
    const result = await unarchiveNote(id);

    if (!result.error) {
      navigate('/archives');
    } else {
      console.error('Error unarchiving note:', result.data);
    }
  };

  if (!note) {
    return <p>Catatan tidak ditemukan.</p>
  }

  return (
    <div className="note-detail-container">
      <h2 className="note-title">{note.title}</h2>
      <p className="note-body">{note.body}</p>
      <p className="note-created-at">
        {locale === 'id' ? 'Dibuat pada:' : 'Created At:'}{' '}
        {showFormattedDate(note.createdAt)}
      </p>
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          display: 'flex',
        }}
      >
        {note.archived ? (
          <button onClick={handleUnArchiveNote} className="archive-button">
            <FaUndo className="archive-icon" />
          </button>
        ) : (
          <button onClick={handleArchiveNote} className="archive-button">
            <FaArchive className="archive-icon" />
          </button>
        )}
        <button onClick={handleDeleteNote} className="delete-button">
          <FaTrash className="delete-icon" />
        </button>
      </div>
    </div>
  )
}

export default NoteDetailPage
