import { useEffect, useState } from 'react'

import { fetchCollection } from '../api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    fetchCollection('workouts')
      .then((items) => {
        if (!ignore) {
          setWorkouts(items)
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
        <span className="eyebrow">Suggestions</span>
        <h2>Workouts</h2>
      </div>
      {error ? <div className="alert alert-warning">Unable to load workouts: {error}</div> : null}
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-lg-4" key={workout._id ?? workout.name}>
            <article className="data-card h-100">
              <div className="d-flex justify-content-between gap-3 align-items-start">
                <h3>{workout.name}</h3>
                <span className="badge text-bg-info">{workout.difficulty}</span>
              </div>
              <p>{workout.description}</p>
              <ul className="mini-list">
                {(workout.activities ?? []).map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Workouts
