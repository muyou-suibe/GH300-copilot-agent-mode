import { useEffect, useState } from 'react'

import { fetchEndpoint } from '../api'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    fetchEndpoint(usersEndpoint)
      .then((items) => {
        if (!ignore) {
          setUsers(items)
        }
      })
      .catch((requestError) => {
        if (!ignore) {
          setError(requestError.message)
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section className="content-panel">
      <div className="section-heading">
        <span className="eyebrow">Profiles</span>
        <h2>Users</h2>
      </div>
      {error ? <div className="alert alert-warning">Unable to load users: {error}</div> : null}
      <div className="row g-3">
        {users.map((user) => (
          <div className="col-md-4" key={user._id ?? user.email ?? user.username}>
            <article className="data-card h-100">
              <h3>{user.profile?.displayName ?? user.username ?? 'Octofit user'}</h3>
              <p className="muted">{user.email}</p>
              <p>{user.profile?.goal ?? 'No goal recorded yet.'}</p>
              <span className="badge text-bg-success">{user.profile?.fitnessLevel ?? 'active'}</span>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Users
