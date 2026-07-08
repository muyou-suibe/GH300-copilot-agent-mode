import { useEffect, useState } from 'react'

import { fetchCollection } from '../api'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    fetchCollection('leaderboard')
      .then((items) => {
        if (!ignore) {
          setEntries(items)
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
        <span className="eyebrow">Competition</span>
        <h2>Leaderboard</h2>
      </div>
      {error ? <div className="alert alert-warning">Unable to load leaderboard: {error}</div> : null}
      <div className="leader-list">
        {entries.map((entry) => (
          <article className="leader-row" key={entry._id ?? entry.rank}>
            <span className="rank">#{entry.rank}</span>
            <div>
              <h3>{entry.user?.profile?.displayName ?? entry.user?.username ?? 'Athlete'}</h3>
              <p>{entry.team?.name ?? 'Independent'}</p>
            </div>
            <strong>{entry.points ?? 0} pts</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard
