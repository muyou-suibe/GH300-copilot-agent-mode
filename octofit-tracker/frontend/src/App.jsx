import { NavLink, Navigate, Route, Routes } from 'react-router-dom'

import { apiBaseUrl } from './api'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import logoUrl from '../../../docs/octofitapp-small.png'
import './App.css'

const navigation = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <img src={logoUrl} alt="Octofit Tracker" />
          <div>
            <span>Octofit</span>
            <strong>Tracker</strong>
          </div>
        </div>
        <nav className="nav flex-column gap-2">
          {navigation.map((item) => (
            <NavLink className="nav-link" key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="main-stage">
        <header className="topbar">
          <div>
            <span className="eyebrow">Multi-tier fitness operations</span>
            <h1>Octofit Tracker</h1>
          </div>
          <span className="api-pill">API: {apiBaseUrl}</span>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
