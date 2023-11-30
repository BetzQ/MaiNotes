import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '../context/ThemeContext'

function LoginInput({ login }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { locale } = useTheme()

  const onEmailChangeHandler = useCallback((event) => {
    setEmail(event.target.value)
  }, [])

  const onPasswordChangeHandler = useCallback((event) => {
    setPassword(event.target.value)
  }, [])

  const onSubmitHandler = useCallback(
    (event) => {
      event.preventDefault()

      login({
        email,
        password,
      })
    },
    [email, password, login],
  )

  return (
    <form onSubmit={onSubmitHandler} className="login-input">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={onEmailChangeHandler}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChangeHandler}
      />
      <button>{locale === 'id' ? 'Masuk' : 'Log In'}</button>
    </form>
  )
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
}

export default LoginInput
