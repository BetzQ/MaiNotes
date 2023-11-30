import React from 'react'
import PropTypes from 'prop-types';
import { putAccessToken, getUserLogged } from '../utils/api'
import Navbar from '../components/Navbar'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'

function LoginOrRegister({ authedUser, setAuthedUser }) {
  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken)
    const { data } = await getUserLogged()
    setAuthedUser(data)
  }
  return (
    <>
      <Navbar authedUser={authedUser} />
      <div className="note-app">
        <main>
          <Routes>
            <Route
              path="/*"
              element={<LoginPage loginSuccess={onLoginSuccess} />}
            />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </>
  )
}


LoginOrRegister.propTypes = {
  authedUser: PropTypes.object,
  setAuthedUser: PropTypes.func,
};

export default LoginOrRegister
