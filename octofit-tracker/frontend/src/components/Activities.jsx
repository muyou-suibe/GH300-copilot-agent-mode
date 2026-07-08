import { useEffect, useState } from 'react'

import { fetchCollection } from '../api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    fetchCollection('activities')
      .then((items) => {
        if (!ignore) {
          setActivities(items)
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
        <span className="eyebrow">Training log</span>
        <h2>Activities</h2>
      </div>
      {error ? <div className="alert alert-warning">Unable to load activities: {error}</div> : null}
      <div className="table-responsive">
        <table className="table align-middle activity-table">
          <thead>
            <tr>
              <th>Activity</th>
              <th>User</th>
              <th>Minutes</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? `${activity.type}-${activity.completedAt}`}>
                <td>{activity.type}</td>
                <td>{activity.user?.profile?.displayName ?? activity.user?.username ?? 'Unassigned'}</td>
                <td>{activity.durationMinutes ?? 0}</td>
                <td>{activity.points ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities
