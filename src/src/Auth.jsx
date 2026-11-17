
import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const result = isLogin
      ? await supabase.auth.signInWithPassword({
          email,
          password
        })
      : await supabase.auth.signUp({
          email,
          password
        })

    if (result.error) {
      setMessage(result.error.message)
    } else if (isLogin) {
      setMessage('Login successful!')
    } else {
      setMessage('Check your email to confirm your account.')
    }

    setLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">🏀</div>

        <h1>FANTASY GAMBLING</h1>
        <p>Enter the league. Compete with your friends.</p>

        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password (at least 6 characters)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <button disabled={loading}>
            {loading ? 'Please wait...' : isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        {message && <p>{message}</p>}

        <button
          className="auth-switch"
          onClick={() => {
            setIsLogin(!isLogin)
            setMessage('')
          }}
        >
          {isLogin
            ? 'Need an account? Sign up'
            : 'Already have an account? Log in'}
        </button>
      </div>
    </div>
  )
}
