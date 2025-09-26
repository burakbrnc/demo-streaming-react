import React from 'react'
const facebookWhite = new URL('../../assets/social/facebook-white.svg', import.meta.url).href
const twitterWhite = new URL('../../assets/social/twitter-white.svg', import.meta.url).href
const instagramWhite = new URL('../../assets/social/instagram-white.svg', import.meta.url).href
const appStore = new URL('../../assets/store/app-store.svg', import.meta.url).href
const playStore = new URL('../../assets/store/play-store.svg', import.meta.url).href
const windowsStore = new URL('../../assets/store/windows-store.svg', import.meta.url).href

export default function Home({ title = 'Popular Titles' }) {
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
        <div className="hero-grid">
          <a className="hero series" href="#/series">
            <span className="hero__label">Popular</span>
            <span className="hero__title">SERIES</span>
          </a>
          <a className="hero movies" href="#/movies">
            <span className="hero__label">Popular</span>
            <span className="hero__title">MOVIES</span>
          </a>
        </div>
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
