import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import LoginInput from '../components/LoginInput'
import { login } from '../utils/api'
import { useTheme } from '../context/ThemeContext'

function LoginPage({ loginSuccess }) {
  const { locale } = useTheme()

  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password })

    if (!error) {
      loginSuccess(data)
    }
  }

  return (
    <section className="login-page">
      <h2>
        {' '}
        {locale === 'id'
          ? 'Silakan masuk untuk melanjutkan ...'
          : 'Please log in to continue ...'}
      </h2>
      <LoginInput login={onLogin} />
      <p>
        {locale === 'id' ? 'Belum punya akun?' : "Don't have an account yet?"}{' '}
        <Link to="/register">
          {locale === 'id' ? 'Daftar di sini.' : 'Sign up here.'}
        </Link>
      </p>
    </section>
  )
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
}

export default LoginPage
