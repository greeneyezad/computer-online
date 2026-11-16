import { useState } from 'react'
import './App.css'

const features = [
  {
    title: 'React 18',
    description: 'Component-based UI with the hooks you already know.',
  },
  {
    title: 'Vite',
    description: 'Instant dev server startup and lightning-fast hot reload.',
  },
  {
    title: 'TypeScript',
    description: 'Strict types on every file, checked by the build.',
  },
]

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="page">
      <header className="hero">
        <span className="badge">React + Vite + TypeScript</span>
        <h1>Build something fast.</h1>
        <p className="hero-text">
          A minimal starting point: one page, three dependencies, zero
          configuration beyond the essentials. Edit{' '}
          <code>src/App.tsx</code> and save to see changes instantly.
        </p>
        <button className="cta" onClick={() => setCount((value) => value + 1)}>
          Clicked {count} {count === 1 ? 'time' : 'times'}
        </button>
      </header>

      <main className="features">
        {features.map((feature) => (
          <section className="card" key={feature.title}>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </section>
        ))}
      </main>

      <footer className="footer">
        <span>
          Run <code>npm run dev</code> to start the dev server on port 5173.
        </span>
      </footer>
    </div>
  )
}
