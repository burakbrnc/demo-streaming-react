import { useEffect, useState } from 'react'


const placeholderImg = new URL('../../assets/placeholder.png', import.meta.url).href
const facebookWhite = new URL('../../assets/social/facebook-white.svg', import.meta.url).href
const twitterWhite = new URL('../../assets/social/twitter-white.svg', import.meta.url).href
const instagramWhite = new URL('../../assets/social/instagram-white.svg', import.meta.url).href
const appStore = new URL('../../assets/store/app-store.svg', import.meta.url).href
const playStore = new URL('../../assets/store/play-store.svg', import.meta.url).href
const windowsStore = new URL('../../assets/store/windows-store.svg', import.meta.url).href

export default function Series({ title = 'Popular Series' }) {
  return (
    <>
      <header className="topbar">
        <div className="container topbar__inner">
          <a href="#/" className="brand">HedgeHogFlix</a>
          <nav className="top-actions">
            <a href="#" className="login">Log in</a>
          </nav>
        </div>
      </header>
      <div className="subbar">
        <div className="container">{title}</div>
      </div>
      <main className="container">
        <List type="series" />
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <ul className="footer-links">
              <li><a href="#">Terms and Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Help</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
            <div className="socials">
              <a aria-label="Facebook" href="#"><img alt="Facebook" src={facebookWhite} /></a>
              <a aria-label="Twitter" href="#"><img alt="Twitter" src={twitterWhite} /></a>
              <a aria-label="Instagram" href="#"><img alt="Instagram" src={instagramWhite} /></a>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="copyright">Copyright © DEMO Streaming 2025</div>
            <div className="stores">
              <img alt="App Store" src={appStore} />
              <img alt="Play Store" src={playStore} />
              <img alt="Windows Store" src={windowsStore} />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

function List({ type }) {
  const [state, setState] = useState({ status: 'loading', items: [], error: null })

  useEffect(() => {
    let cancelled = false
    setState({ status: 'loading', items: [], error: null })

    const remoteUrl = 'https://raw.githubusercontent.com/StreamCo/react-coding-challenge/master/feed/sample.json'
    const localUrl = new URL('../../feed/sample.json', import.meta.url).href

    const apply = (json) => {
      const items = (json.entries || [])
        .filter(e => e.programType === type)
        .filter(e => Number(e.releaseYear) >= 2010)
        .sort((a, b) => a.title.localeCompare(b.title))
        .slice(0, 21)
      setState({ status: 'done', items, error: null })
    }

    const load = async () => {
      try {
        const r = await fetch(remoteUrl, { cache: 'no-store' })
        if (!r.ok) throw new Error('Remote feed not ok')
        const json = await r.json()
        if (cancelled) return
        apply(json)
      } catch (err1) {
        try {
          const r2 = await fetch(localUrl, { cache: 'no-store' })
          if (!r2.ok) throw new Error('Local feed not ok')
          const json2 = await r2.json()
          if (cancelled) return
          apply(json2)
        } catch (err2) {
          if (cancelled) return
          setState({ status: 'error', items: [], error: err2 })
        }
      }
    }

    load()
    return () => { cancelled = true }
  }, [type])

  if (state.status === 'loading') {
    return (
      <div className="state">
        <div className="spinner"></div>
        <div>Loading...</div>
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="state">
        <div>Oops, something went wrong...</div>
      </div>
    )
  }

  if (!state.items.length) {
    return <div className="state">No results</div>
  }

  return (
    <div className="card-grid">
      {state.items.map(e => (
        <Card key={e.title + e.releaseYear} entry={e} />
      ))}
    </div>
  )
}

function Card({ entry }) {
  const poster = entry?.images?.['Poster Art']?.url || placeholderImg
  return (
    <article className="card" title={`${entry.title || 'Untitled'} (${entry.releaseYear || '—'})`}>
      <img
        className="card__thumb"
        src={poster}
        alt={entry.title || 'Untitled'}
        loading="lazy"
        onError={(e) => { e.currentTarget.src = placeholderImg }}
      />
      <div className="card__title">{entry.title || 'Untitled'}</div>
    </article>
  )
}
