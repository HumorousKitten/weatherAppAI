import React, { useEffect, useState } from 'react'
import { useAuth } from '../components/AuthContext'
import { useNavigate } from 'react-router-dom'
import './weather.css'

const API_KEY = 'bfd5cb83d69a9ca1ad6af69012f9adc2'

function Weather() {
  const [weather, setWeather] = useState(null)
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchWeather() {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=55.7558&lon=37.6176&units=metric&appid=${API_KEY}`
      )
      const data = await res.json()
      setWeather(data)
    }

    fetchWeather()
  }, [])

  return (
    <div className="weather-container">
      <div className="weather-header">
        <h2>Погода в Москве</h2>
        <button className="logout-button" onClick={() => {
          logout()
          navigate('/login')
        }}>
          Выйти
        </button>
      </div>

      {weather ? (
        <div className="weather-card">
          <p>Температура: {weather.main.temp}°C</p>
          <p>Погода: {weather.weather[0].description}</p>
          <p>Скорость ветра: {weather.wind.speed} м/с</p>
        </div>
      ) : (
        <p className="weather-loading">Загрузка...</p>
      )}
    </div>
  )
}

export default Weather