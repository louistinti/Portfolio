import { useContent, useLang } from '../hooks/useLang.jsx'

// Bascule de langue segmentée (FR | EN). Les deux options sont toujours
// affichées : la largeur du contrôle ne dépend donc pas de la langue active,
// et rien ne bouge dans la nav au changement (contrairement à un bouton qui
// afficherait seulement la langue cible).
export default function LangToggle() {
  const { lang, setLang } = useLang()
  const { ui } = useContent()
  return (
    <div className="nav-lang" role="group" aria-label={ui.nav.ariaLang}>
      {['fr', 'en'].map((code) => (
        <button
          key={code}
          type="button"
          className={lang === code ? 'is-on' : undefined}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
