import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Weather from './pages/Weather'
import { useAuth } from './components/AuthContext.jsx'

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/weather" element={
          isAuthenticated ? <Weather /> : <Navigate to="/login" />
        } />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/weather" : "/login"} />} />
      </Routes>
    </Router>
  )
}

export default App