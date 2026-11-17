
import { useState } from 'react'
import {
  Trophy, Users, Target, Plus, Home,
  User, Activity, ChevronRight
} from 'lucide-react'

const players = [
  { name: '625', points: 1250 },
  { name: 'Dante', points: 1100 },
  { name: 'Mike', points: 950 },
  { name: 'Chris', points: 875 }
]

const predictions = [
  {
    id: 1,
    category: 'SPORTS',
    question: 'Will the home team win this weekend?',
    options: ['YES', 'NO']
  },
  {
    id: 2,
    category: 'FRIEND GROUP',
    question: 'Will Mike be late to the next meetup?',
    options: ['YES', 'NO']
  },
  {
    id: 3,
    category: 'CHALLENGES',
    question: 'Will Chris complete his weekly challenge?',
    options: ['YES', 'NO']
  }
]

export default function App() {
  const [page, setPage] = useState('Home')
  const [selected, setSelected] = useState({})
  const [points, setPoints] = useState(1000)

  function makePrediction(id, option) {
    setSelected({ ...selected, [id]: option })
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">B</div>
          <div>
            <h2>THE BOYS BOOK</h2>
            <span>PRIVATE LEAGUE</span>
          </div>
        </div>

        <nav>
          {[
            { name: 'Home', icon: Home },
            { name: 'Predictions', icon: Target },
            { name: 'Leaderboard', icon: Trophy },
            { name: 'Members', icon: Users }
          ].map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.name}
                className={page === item.name ? 'nav-active' : 'nav-item'}
                onClick={() => setPage(item.name)}
              >
                <Icon size={19} />
                {item.name}
              </button>
            )
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="profile">
            <div className="avatar">D</div>
            <div>
              <strong>Dante</strong>
              <span>League Member</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <span className="eyebrow">YOUR PRIVATE LEAGUE</span>
            <h1>{page}</h1>
          </div>
          <div className="points-box">
            <span>YOUR POINTS</span>
            <strong>{points.toLocaleString()}</strong>
          </div>
        </header>

        {page === 'Home' && (
          <>
            <section className="welcome">
              <div>
                <span className="eyebrow">WELCOME BACK</span>
                <h2>Welcome to The Boys Book.</h2>
                <p>Make your predictions. Earn virtual points. Climb the leaderboard.</p>
              </div>
              <div className="welcome-mark">B</div>
            </section>

            <section className="stats">
              <div className="stat-card">
                <Target />
                <span>OPEN PREDICTIONS</span>
                <strong>{predictions.length}</strong>
              </div>
              <div className="stat-card">
                <Users />
                <span>LEAGUE MEMBERS</span>
                <strong>{players.length}</strong>
              </div>
              <div className="stat-card">
                <Trophy />
                <span>YOUR POINTS</span>
                <strong>{points.toLocaleString()}</strong>
              </div>
            </section>

            <section className="section-heading">
              <div>
                <span className="eyebrow">MAKE YOUR PICKS</span>
                <h2>Open Predictions</h2>
              </div>
              <button className="text-button" onClick={() => setPage('Predictions')}>
                View all <ChevronRight size={16} />
              </button>
            </section>

            <div className="prediction-list">
              {predictions.map(prediction => (
                <PredictionCard
                  key={prediction.id}
                  prediction={prediction}
                  selected={selected[prediction.id]}
                  onSelect={makePrediction}
                />
              ))}
            </div>
          </>
        )}

        {page === 'Predictions' && (
          <>
            <section className="section-heading">
              <div>
                <span className="eyebrow">YOUR LEAGUE</span>
                <h2>All Predictions</h2>
              </div>
            </section>
            <div className="prediction-list">
              {predictions.map(prediction => (
                <PredictionCard
                  key={prediction.id}
                  prediction={prediction}
                  selected={selected[prediction.id]}
                  onSelect={makePrediction}
                />
              ))}
            </div>
          </>
        )}

        {page === 'Leaderboard' && (
          <section className="panel">
            <span className="eyebrow">LEAGUE RANKINGS</span>
            <h2>Leaderboard</h2>
            {players.map((player, index) => (
              <div className="leader-row" key={player.name}>
                <strong>#{index + 1}</strong>
                <span>{player.name}</span>
                <b>{player.points.toLocaleString()} pts</b>
              </div>
            ))}
          </section>
        )}

        {page === 'Members' && (
          <section className="panel">
            <span className="eyebrow">YOUR PRIVATE GROUP</span>
            <h2>League Members</h2>
            {players.map(player => (
              <div className="leader-row" key={player.name}>
                <div className="avatar">{player.name[0]}</div>
                <span>{player.name}</span>
                <span>Member</span>
              </div>
            ))}
          </section>
        )}

        <footer>
          THE BOYS BOOK <span>•</span> A PRIVATE POINTS-ONLY PREDICTION GAME
        </footer>
      </main>
    </div>
  )
}

function PredictionCard({ prediction, selected, onSelect }) {
  return (
    <article className="prediction-card">
      <div className="prediction-top">
        <span className="category">{prediction.category}</span>
        <span className="open-label">OPEN</span>
      </div>
      <h3>{prediction.question}</h3>
      <div className="options">
        {prediction.options.map(option => (
          <button
            key={option}
            className={selected === option ? 'option selected' : 'option'}
            onClick={() => onSelect(prediction.id, option)}
          >
            {option}
          </button>
        ))}
      </div>
      {selected && (
        <p className="selection-note">
          Your selection: <strong>{selected}</strong>
        </p>
      )}
    </article>
  )
}
