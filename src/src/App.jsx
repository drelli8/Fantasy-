
import { useState } from 'react'
import {
  Trophy, Users, Target, Home, Plus, ShieldCheck
} from 'lucide-react'


const initialPredictions = [
  {
    id: 1,
    category: 'NBA MATCHUP',
    question: 'Lakers vs Celtics',
    optionA: 'Los Angeles Lakers',
    optionB: 'Boston Celtics',
    oddsA: '+120',
    oddsB: '-140'
  },
  {
    id: 2,
    category: 'NBA MATCHUP',
    question: 'Knicks vs Bulls',
    optionA: 'New York Knicks',
    optionB: 'Chicago Bulls',
    oddsA: '-110',
    oddsB: '+100'
  },
  {
    id: 3,
    category: 'NBA MATCHUP',
    question: 'Warriors vs Mavericks',
    optionA: 'Golden State Warriors',
    optionB: 'Dallas Mavericks',
    oddsA: '+105',
    oddsB: '-115'
  }
]

const players = [
  { name: '625', points: 1250 },
  { name: 'Dante', points: 1100 },
  { name: 'Mike', points: 950 },
  { name: 'Chris', points: 875 }
]

function calculateReturn(points, odds) {
  if (!points || !odds) return 0
  return Math.round(
    odds > 0
      ? points * (1 + odds / 100)
      : points * (1 + 100 / Math.abs(odds))
  )
}

export default function App() {
  const [page, setPage] = useState('Home')
  const [predictions, setPredictions] = useState(initialPredictions)
  const [selections, setSelections] = useState({})
  const [amounts, setAmounts] = useState({})
  const [isCommissioner] = useState(true)
  const [question, setQuestion] = useState('')
  const [optionA, setOptionA] = useState('')
  const [optionB, setOptionB] = useState('')
  const [oddsA, setOddsA] = useState('-110')
  const [oddsB, setOddsB] = useState('-110')

  function createPrediction(event) {
    event.preventDefault()

    if (!question.trim() || !optionA.trim() || !optionB.trim()) return

    setPredictions([
      ...predictions,
      {
        id: Date.now(),
        category: 'CUSTOM',
        question,
        optionA,
        optionB,
        oddsA: Number(oddsA),
        oddsB: Number(oddsB)
      }
    ])

    setQuestion('')
    setOptionA('')
    setOptionB('')
    setOddsA('-110')
    setOddsB('-110')
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">🏀</div>
          <div>
            <h2></h2>
            <span>PRIVATE POINTS LEAGUE</span>
          </div>
        </div>

        <nav>
          {[
            { name: 'Home', icon: Home },
            { name: 'Predictions', icon: Target },
            { name: 'Leaderboard', icon: Trophy },
            { name: 'Members', icon: Users },
            { name: 'Create', icon: Plus }
          ].map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.name}
                className={page === item.name ? 'nav-active' : 'nav-item'}
                onClick={() => setPage(item.name)}
              >
                <Icon size={18} />
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
              <span>Commissioner</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <span className="eyebrow"></span>
            <h1>{page}</h1>
          </div>
          <div className="points-box">
            <span>VIRTUAL POINTS</span>
            <strong>1,000</strong>
          </div>
        </header>

        {page === 'Home' && (
          <>
            <section className="">
              <div>
                <span className="eyebrow">PRIVATE LEAGUE</span>
                <h2> Welcome to Fantasy Gambling.</h2>
                <p>Follow the matchups, make your predictions, and compete with your friends for virtual points.</p>
              </div>
              <div className="welcome-mark">🏀</div>
            </section>

<section className="featured-banner">
  <div>
    <span className="eyebrow">🏀 BASKETBALL CENTRAL</span>
    <h2>THE COURT IS YOURS.</h2>
    <p>Make your predictions. Climb the leaderboard. Own the league.</p>
  </div>
  <div className="basketball-art">🏀</div>
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
                <strong>1,000</strong>
              </div>
            </section>

            <PredictionList
              predictions={predictions}
              selections={selections}
              setSelections={setSelections}
              amounts={amounts}
              setAmounts={setAmounts}
            />
          </>
        )}

        {page === 'Predictions' && (
          <PredictionList
            predictions={predictions}
            selections={selections}
            setSelections={setSelections}
            amounts={amounts}
            setAmounts={setAmounts}
          />
        )}

        {page === 'Leaderboard' && (
          <section className="panel">
            <span className="eyebrow">LEAGUE RANKINGS</span>
            <h2>Leaderboard</h2>
            {[...players].sort((a, b) => b.points - a.points).map((player, index) => (
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
            <span className="eyebrow">PRIVATE GROUP</span>
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

        {page === 'Create' && isCommissioner && (
          <section className="panel">
            <span className="eyebrow">COMMISSIONER TOOLS</span>
            <h2>Create a prediction</h2>
            <form onSubmit={createPrediction} className="create-form">
              <label>Prediction question</label>
              <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Who will win?" required />
              <label>First outcome</label>
              <input value={optionA} onChange={e => setOptionA(e.target.value)} placeholder="Team A" required />
              <label>First virtual American odds</label>
              <input type="number" value={oddsA} onChange={e => setOddsA(e.target.value)} required />
              <label>Second outcome</label>
              <input value={optionB} onChange={e => setOptionB(e.target.value)} placeholder="Team B" required />
              <label>Second virtual American odds</label>
              <input type="number" value={oddsB} onChange={e => setOddsB(e.target.value)} required />
              <button className="create-button" type="submit">Create prediction</button>
            </form>
          </section>
        )}

        <footer>
           <span>•</span> VIRTUAL POINTS ONLY
        </footer>
      </main>
    </div>
  )
}

function PredictionList({ predictions, selections, setSelections, amounts, setAmounts }) {
  return (
    <>
      <section className="section-heading">
        <div>
          <span className="eyebrow">YOUR LEAGUE</span>
          <h2>Open Predictions</h2>
        </div>
      </section>

      <div className="prediction-list">
        {predictions.map(prediction => {
          const selection = selections[prediction.id]
          const amount = Number(amounts[prediction.id] || 0)
          const odds = selection === 'A' ? prediction.oddsA : prediction.oddsB
          const potential = selection ? calculateReturn(amount, odds) : 0

          return (
            <article className="prediction-card" key={prediction.id}>
              <div className="prediction-top">
                <span className="category">{prediction.category}</span>
                <span className="open-label">OPEN</span>
              </div>

              <h3>{prediction.question}</h3>

              <div className="options">
                <button
                  className={selection === 'A' ? 'option selected' : 'option'}
                  onClick={() => setSelections({ ...selections, [prediction.id]: 'A' })}
                >
                  <strong>{prediction.optionA}</strong>
                  <span>{prediction.oddsA > 0 ? '+' : ''}{prediction.oddsA}</span>
                </button>

                <button
                  className={selection === 'B' ? 'option selected' : 'option'}
                  onClick={() => setSelections({ ...selections, [prediction.id]: 'B' })}
                >
                  <strong>{prediction.optionB}</strong>
                  <span>{prediction.oddsB > 0 ? '+' : ''}{prediction.oddsB}</span>
                </button>
              </div>

              <label className="amount-label">Virtual points amount</label>
              <input
                type="number"
                min="1"
                placeholder="Enter virtual points"
                value={amounts[prediction.id] || ''}
                onChange={e => setAmounts({ ...amounts, [prediction.id]: e.target.value })}
              />

              {selection && amount > 0 && (
                <div className="return-box">
                  <span>Illustrative total return</span>
                  <strong>{potential.toLocaleString()} virtual points</strong>
                </div>
              )}

              <p className="selection-note">
                {selection ? `Selected: ${selection === 'A' ? prediction.optionA : prediction.optionB}` : 'Choose an outcome to preview its virtual odds.'}
              </p>
            </article>
          )
        })}
      </div>
    </>
  )
}
