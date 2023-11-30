import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RegisterInput from '../components/RegisterInput'
import { register } from '../utils/api'
import { useTheme } from '../context/ThemeContext'

function RegisterPage() {
  const navigate = useNavigate()
  const { locale } = useTheme()

  async function onRegisterHandler(user) {
    const { error } = await register(user)
    if (!error) {
      navigate('/')
    }
  }

  return (
    <section className="register-page">
      <h2>
        {locale === 'id'
          ? 'Gak perlu serius-serius ya isinya ...'
          : 'No need to be too serious here ...'}
      </h2>
      <RegisterInput register={onRegisterHandler} />
      <p>
        {locale === 'id' ? 'Kembali ke' : 'Back to'}{' '}
        <Link to="/">{locale === 'id' ? 'Masuk' : 'Log In'}</Link>
      </p>
    </section>
  )
}

export default RegisterPage
