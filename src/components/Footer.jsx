import { profile } from '../data/content.js'

export default function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 {profile.name}, {profile.role}</p>
      <p>{profile.location}</p>
      <a className="to-top" href="#top">
        Back to top <span aria-hidden="true">↑</span>
      </a>
    </footer>
  )
}
