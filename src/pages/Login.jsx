import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../components/AuthContext'
import './login.css'


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'reqres-free-v1'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      if (res.ok) {
        login(data.token)
        navigate('/weather')
      } else {
        setError(data.error || 'Ошибка авторизации')
      }
    } catch (err) {
      setError('Сетевая ошибка')
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Вход</h2>

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email: eve.holt@reqres.in"
          required
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Пароль: cityslicka"
          required
        />

        <button type="submit">Войти</button>

        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  )
}

export default Login