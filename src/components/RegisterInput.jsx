import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '../context/ThemeContext'

function RegisterInput({ register }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [passwordError, setPasswordError] = useState('')

  const { name, email, password } = formData

  const { locale } = useTheme()

  const onNameChange = (event) => {
    setFormData({ ...formData, name: event.target.value })
  }

  const onEmailChange = (event) => {
    setFormData({ ...formData, email: event.target.value })
  }

  const onPasswordChange = (event) => {
    setFormData({ ...formData, password: event.target.value })
  }

  const onConfirmPasswordChange = (event) => {
    setFormData({ ...formData, confirmPassword: event.target.value })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    if (password !== formData.confirmPassword) {
      if (locale === 'id') {
        setPasswordError('Password dan konfirmasi password tidak cocok')
      } else if (locale === 'en') {
        setPasswordError('Password and confirm password do not match')
      }
      return
    }
    register({
      name,
      email,
      password,
    })
  }

  return (
    <form onSubmit={onSubmitHandler} className="register-input">
      <input
        type="text"
        placeholder={locale === 'id' ? 'Nama' : 'Name'}
        value={name}
        onChange={onNameChange}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={onEmailChange}
      />
      <input
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        value={password}
        onChange={onPasswordChange}
      />
      <input
        type="password"
        placeholder="Konfirmasi Password"
        autoComplete="current-password"
        value={formData.confirmPassword}
        onChange={onConfirmPasswordChange}
      />
      {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
      <button>Register</button>
    </form>
  )
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
}

export default RegisterInput
