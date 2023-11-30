import React from 'react'
import { useTheme } from '../context/ThemeContext'

function NotFoundPage() {
  const { locale } = useTheme()

  return (
    <div
      style={{
        width: '100%',
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div>
        <h1>{locale === 'id' ? '404 Tidak Ditemukan' : '404 Not Found'}</h1>
        <p>
          {locale === 'id'
            ? 'Halaman yang Anda cari tidak ditemukan.'
            : 'The page you are looking for was not found.'}
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage
