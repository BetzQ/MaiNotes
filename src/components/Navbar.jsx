import React from 'react'
import PropTypes from 'prop-types';
import { useTheme } from '../context/ThemeContext'
import { Link } from 'react-router-dom'
import { FaMoon, FaSun } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { putAccessToken } from '../utils/api'

function Navbar({ authedUser, setAuthedUser }) {
  const { darkMode, toggleDarkMode, locale, toggleLocale } = useTheme()

  function onLogout() {
    setAuthedUser(null)
    putAccessToken('')
  }

  return (
    <nav className="navbar">
      <h1>Mai{locale === 'id' ? 'Catatan' : 'Notes'}</h1>
      <ul className="nav-links">
        <li>
          <button className="dark-mode" onClick={toggleDarkMode}>
            {darkMode ? <FaMoon /> : <FaSun />}
          </button>
        </li>
        <li>
          <button onClick={toggleLocale} className="dark-mode">
            {locale === 'id' ? 'En' : 'Id'}
          </button>
        </li>
        {authedUser === null ? (
          ''
        ) : (
          <>
            <li>
              <Link to="/">{locale === 'id' ? 'Catatan' : 'Notes'}</Link>
            </li>
            <li>
              <Link to="/archives">
                {locale === 'id' ? 'Arsip' : 'Archives'}
              </Link>
            </li>
            <li>
              <button onClick={onLogout} className="logout">
                {authedUser.name} <FiLogOut />
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

Navbar.propTypes = {
  authedUser: PropTypes.object,
  setAuthedUser: PropTypes.func,
};

export default Navbar
