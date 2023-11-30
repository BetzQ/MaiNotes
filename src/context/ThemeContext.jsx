import React, { createContext, useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types';

const ThemeContext = createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || false,
  )

  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'id')

  const [authedUser, setAuthedUser] = useState(null)

  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = 'black'
      document.body.style.color = 'white'
    } else {
      document.body.style.backgroundColor = 'white'
      document.body.style.color = 'black'
    }
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('locale', locale)
  }, [locale])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode)
  }

  const toggleLocale = () => {
    const newLocale = locale === 'id' ? 'en' : 'id'
    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  const value = {
    darkMode,
    toggleDarkMode,
    locale,
    toggleLocale,
    authedUser,
    setAuthedUser,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
