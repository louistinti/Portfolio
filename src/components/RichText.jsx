// Mini rich-text partagé : **gras** → <strong>, *accent* → surlignage couleur,
// `touche` → <kbd>, [libellé](https://…) → lien externe. Suffit pour le
// contenu éditorial (études de cas, home).
// Extrait de CaseStudy.jsx pour être réutilisé par les sections de la home.
export default function RichText({ text }) {
  if (text == null) return null
  if (typeof text !== 'string') return text
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g)
  return parts.map((p, i) => {
    const link = p.startsWith('[') && p.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
    if (link)
      return (
        <a className="rt-link" href={link[2]} target="_blank" rel="noopener noreferrer" key={i}>
          {link[1]}
        </a>
      )
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>
    if (p.startsWith('*') && p.endsWith('*'))
      return (
        <span className="serif-it" key={i}>
          {p.slice(1, -1)}
        </span>
      )
    if (p.startsWith('`') && p.endsWith('`')) return <kbd key={i}>{p.slice(1, -1)}</kbd>
    return p
  })
}
