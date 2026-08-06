import { useContent } from '../hooks/useLang.jsx'

export default function Footer() {
  const { profile, ui } = useContent()
  return (
    <footer className="footer">
      <p>
        © 2026 {profile.name}, {profile.role}
      </p>
      <p>{profile.location}</p>
      <a className="to-top" href="#top">
        {ui.footer.top} <span aria-hidden="true">↑</span>
      </a>
    </footer>
  )
}
