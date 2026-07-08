import { useEffect, useState } from 'react'

import { fetchCollection } from '../api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    fetchCollection('teams')
      .then((items) => {
        if (!ignore) {
          setTeams(items)
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
        <span className="eyebrow">Groups</span>
        <h2>Teams</h2>
      </div>
      {error ? <div className="alert alert-warning">Unable to load teams: {error}</div> : null}
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-6" key={team._id ?? team.name}>
            <article className="data-card h-100">
              <h3>{team.name}</h3>
              <p className="metric">{team.members?.length ?? 0}</p>
              <p className="muted">members on this team</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Teams
